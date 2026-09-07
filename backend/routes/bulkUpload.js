import express from 'express';
import multer from 'multer';
import * as xlsx from 'xlsx';
import Product from '../models/Product.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.any(), async (req, res) => {
  try {
    const fileObj = req.files && req.files.find(f => f.fieldname === 'file');
    if (!fileObj) {
      return res.status(400).json({ message: 'No spreadsheet file uploaded' });
    }
    
    // Convert bulkImages to base64 mapped by originalname (without extension)
    const imageMap = {};
    if (req.files) {
      req.files.forEach(f => {
        if (f.fieldname === 'bulkImages') {
          const name = f.originalname.split('.')[0].toLowerCase();
          const b64 = `data:${f.mimetype};base64,${f.buffer.toString('base64')}`;
          imageMap[name] = b64;
        }
      });
    }

    const { sellerId, sellerName } = req.body;
    if (!sellerId || !sellerName) {
        return res.status(400).json({ message: 'Missing seller identity context' });
    }

    // Read the file buffer using xlsx
    const workbook = xlsx.read(fileObj.buffer, { type: 'buffer' });
    
    // Find the relevant sheet. Try to find one named 'apparel_set' or fallback to the first sheet if it exists
    let sheetName = workbook.SheetNames.find(n => n === 'apparel_set' || n.includes('default'));
    if (!sheetName) sheetName = workbook.SheetNames[0];
    
    const sheet = workbook.Sheets[sheetName];
    // Convert sheet to json array of arrays (handling raw rows)
    const rawRows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    if (!rawRows || rawRows.length < 2) {
      return res.status(400).json({ message: 'Invalid or empty spreadsheet format' });
    }

    // Attempt to identify header row. Flipkart templates usually have headers around row 1, 2, or 3.
    let headerRowIdx = 0;
    for (let i = 0; i < 5 && i < rawRows.length; i++) {
      const rowStr = rawRows[i].join(' ').toLowerCase();
      if (rowStr.includes('seller sku') || rowStr.includes('brand') || rowStr.includes('serial number')) {
        headerRowIdx = i;
        break;
      }
    }

    const headers = rawRows[headerRowIdx].map(h => String(h || '').trim());
    const dataRows = rawRows.slice(headerRowIdx + 1);

    // Grouping rows by 'Group ID' or 'Style Code' for Parent-Variant Mapping
    const groupColIdx = headers.findIndex(h => h.toLowerCase().includes('group id') || h.toLowerCase().includes('style code'));
    const skuColIdx = headers.findIndex(h => h.toLowerCase().includes('seller sku'));
    const nameColIdx = headers.findIndex(h => h.toLowerCase().includes('name') || h.toLowerCase().includes('title'));
    const priceColIdx = headers.findIndex(h => h.toLowerCase().includes('selling price') || h.toLowerCase().includes('price'));
    const mrpColIdx = headers.findIndex(h => h.toLowerCase().includes('mrp') || h.toLowerCase().includes('original price'));
    const sizeColIdx = headers.findIndex(h => h.toLowerCase().includes('size'));
    const colorColIdx = headers.findIndex(h => h.toLowerCase().includes('color'));
    const stockColIdx = headers.findIndex(h => h.toLowerCase().includes('inventory') || h.toLowerCase().includes('stock'));
    const imgColIdx = headers.findIndex(h => h.toLowerCase().includes('main image url'));
    const descColIdx = headers.findIndex(h => h.toLowerCase().includes('description'));
    const categoryColIdx = headers.findIndex(h => h.toLowerCase().includes('type') || h.toLowerCase().includes('category'));

    const productsMap = {};

    dataRows.forEach(row => {
      // Skip empty rows
      if (!row || row.length === 0 || !row.some(c => c)) return;

      const groupID = groupColIdx >= 0 ? row[groupColIdx] : null;
      const sku = skuColIdx >= 0 ? row[skuColIdx] : `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const str_sku = String(sku).toLowerCase();
      const str_group = String(groupID || '').toLowerCase();
      const parentId = groupID || sku; // If no Group ID, treat as individual product

      if (!productsMap[parentId]) {
        productsMap[parentId] = {
          name: nameColIdx >= 0 && row[nameColIdx] ? row[nameColIdx] : 'Untitled Bulk Product',
          category: categoryColIdx >= 0 && row[categoryColIdx] ? row[categoryColIdx] : 'Apparel',
          description: descColIdx >= 0 ? row[descColIdx] : '',
          price: priceColIdx >= 0 ? Number(row[priceColIdx]) || 0 : 0,
          originalPrice: mrpColIdx >= 0 ? Number(row[mrpColIdx]) || 0 : 0,
          image: imgColIdx >= 0 && row[imgColIdx] ? row[imgColIdx] : (imageMap[str_sku] || imageMap[str_group] || ''),
          images: [],
          stock: 0,
          sellerId,
          sellerName,
          status: 'review',
          styleCode: parentId,
          attributes: [],
          variants: []
        };

        // Extract dynamic EAV attributes
        headers.forEach((header, idx) => {
          if (idx !== groupColIdx && idx !== skuColIdx && row[idx] && String(row[idx]).trim() !== '') {
            // Filter out internal Flipkart/system headers
            if (!['flipkart serial number', 'catalog qc status', 'qc failed reason', 'product data status'].some(x => header.toLowerCase().includes(x))) {
               productsMap[parentId].attributes.push({
                 key: header,
                 value: String(row[idx])
               });
            }
          }
        });
        
        // Find all images matching SKU or Group ID
        const matchedImages = [];
        Object.keys(imageMap).forEach(imgName => {
           if (imgName.includes(str_sku) || (str_group && imgName.includes(str_group))) {
              matchedImages.push(imageMap[imgName]);
           }
        });
        if (!productsMap[parentId].image && matchedImages.length > 0) {
           productsMap[parentId].image = matchedImages[0];
        }
        productsMap[parentId].images = matchedImages;
      }

      // Add to variants
      const vPrice = priceColIdx >= 0 ? Number(row[priceColIdx]) || 0 : 0;
      const vMrp = mrpColIdx >= 0 ? Number(row[mrpColIdx]) || 0 : 0;
      const vStock = stockColIdx >= 0 ? Number(row[stockColIdx]) || 10 : 10; // default 10 if not found

      productsMap[parentId].variants.push({
        sku: sku,
        color: colorColIdx >= 0 ? row[colorColIdx] : '',
        size: sizeColIdx >= 0 ? row[sizeColIdx] : '',
        price: vPrice,
        originalPrice: vMrp,
        stock: vStock
      });
      
      // Update parent aggregates
      productsMap[parentId].stock += vStock;
      if (productsMap[parentId].price === 0 || (vPrice > 0 && vPrice < productsMap[parentId].price)) {
         productsMap[parentId].price = vPrice;
      }
      if (productsMap[parentId].originalPrice === 0 || (vMrp > 0 && vMrp < productsMap[parentId].originalPrice)) {
         productsMap[parentId].originalPrice = vMrp;
      }
    });

    const productsToInsert = Object.values(productsMap);
    
    // Calculate colors and sizes caches
    productsToInsert.forEach(p => {
       const sizeSet = new Set();
       const colorSet = new Set();
       p.variants.forEach(v => {
          if (v.size) sizeSet.add(v.size);
          if (v.color) colorSet.add(v.color);
       });
       p.sizes = Array.from(sizeSet);
       p.colors = Array.from(colorSet);
    });

    if (productsToInsert.length === 0) {
      return res.status(400).json({ message: 'No valid products found in the file' });
    }

    const inserted = await Product.insertMany(productsToInsert);
    res.json({ message: 'Bulk upload successful', count: inserted.length });

  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
