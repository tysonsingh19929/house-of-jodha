import express from 'express';
import multer from 'multer';
import * as xlsx from 'xlsx';
import Product from '../models/Product.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Category Auto-Classifier
const detectCategory = (title, subcat, sku) => {
  const combined = `${title || ''} ${subcat || ''} ${sku || ''}`.toLowerCase();
  if (/blouse|choli/i.test(combined)) return 'Blouse';
  if (/lehenga|ghagra|chaniya/i.test(combined)) return 'Lehenga';
  if (/saree|sari/i.test(combined)) return 'Saree';
  if (/anarkali/i.test(combined)) return 'Anarkali';
  if (/sharara/i.test(combined)) return 'Sharara';
  if (/gharara/i.test(combined)) return 'Gharara';
  if (/co-ords|coord|apparel_set/i.test(combined)) return 'Co-ords';
  if (/dress/i.test(combined)) return 'Dress';
  if (/top/i.test(combined)) return 'Top';
  if (/kurti|kurta|salwar|kameez|suit|dupatta/i.test(combined)) return 'Salwar Kameez';
  if (/jewel|necklace|earring|bangle|ring|jhumka/i.test(combined)) return 'Jewellery';
  if (subcat && subcat.trim().length > 1) {
    const s = subcat.trim();
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase().replace(/_/g, ' ');
  }
  return 'Apparel';
};

const categoryDefaultImages = {
  'Blouse': '/images/salwar/1.jpg',
  'Lehenga': '/images/lehenga/1.jpg',
  'Saree': '/images/saree/1.jpg',
  'Anarkali': '/images/anarkali/1.jpg',
  'Sharara': '/images/sharara/1.jpg',
  'Gharara': '/images/gharara/1.jpg',
  'Salwar Kameez': '/images/salwar/1.jpg',
  'Co-ords': '/images/salwar/2.jpg',
  'Dress': '/images/salwar/3.jpg',
  'Top': '/images/salwar/4.jpg',
  'Jewellery': '/images/saree/1.jpg',
  'Apparel': '/images/lehenga/1.jpg'
};

const sizeRegex = /[-_\s](XXXL|XXL|XL|XS|3XL|2XL|4XL|5XL|[SML])(\b|$)/i;
const colorsList = ['NAVY BLUE', 'DARK PINK', 'DARK GREEN', 'MAROON', 'BLACK', 'GREY', 'BLUE', 'RED', 'MAGENTA', 'YELLOW', 'WHITE', 'GOLD', 'SILVER', 'GREEN', 'PINK', 'PEACH', 'ORANGE', 'PURPLE', 'BEIGE'];

router.post('/', upload.any(), async (req, res) => {
  try {
    const fileObj = req.files && req.files.find(f => f.fieldname === 'file');
    if (!fileObj) {
      return res.status(400).json({ message: 'No spreadsheet file uploaded' });
    }
    
    // Map uploaded bulk images by originalname (without extension)
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
    
    // 1. SMART MULTI-SHEET SELECTION: Pick sheet with most product data rows
    let bestSheetName = null;
    let maxScore = -1;

    workbook.SheetNames.forEach(name => {
      const sheet = workbook.Sheets[name];
      const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
      const nonEmptyRows = rows.filter(r => r && r.length > 0 && r.some(c => c !== null && c !== ''));
      if (nonEmptyRows.length < 2) return;
      
      let headerMatchScore = 0;
      for (let i = 0; i < Math.min(5, nonEmptyRows.length); i++) {
        const rowStr = (nonEmptyRows[i] || []).join(' ').toLowerCase();
        if (rowStr.includes('sku')) headerMatchScore += 10;
        if (rowStr.includes('title') || rowStr.includes('product name')) headerMatchScore += 10;
        if (rowStr.includes('price') || rowStr.includes('mrp')) headerMatchScore += 10;
        if (rowStr.includes('category')) headerMatchScore += 5;
      }
      const totalScore = headerMatchScore * 100 + nonEmptyRows.length;
      if (totalScore > maxScore) {
        maxScore = totalScore;
        bestSheetName = name;
      }
    });

    if (!bestSheetName) {
      bestSheetName = workbook.SheetNames[0];
    }

    const sheet = workbook.Sheets[bestSheetName];
    const rawRows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    if (!rawRows || rawRows.length < 2) {
      return res.status(400).json({ message: 'Invalid or empty spreadsheet format' });
    }

    // 2. IDENTIFY HEADER ROW
    let headerRowIdx = 0;
    for (let i = 0; i < 6 && i < rawRows.length; i++) {
      const rowStr = (rawRows[i] || []).join(' ').toLowerCase();
      if (rowStr.includes('seller sku') || rowStr.includes('sku id') || rowStr.includes('product title') || rowStr.includes('brand') || rowStr.includes('flipkart serial')) {
        headerRowIdx = i;
        break;
      }
    }

    const headers = (rawRows[headerRowIdx] || []).map(h => String(h || '').trim());
    const candidateRows = rawRows.slice(headerRowIdx + 1);

    // 3. FLEXIBLE COLUMN RESOLUTION
    const findCol = (regex) => headers.findIndex(h => regex.test(h));

    const skuColIdx = findCol(/seller\s*sku|sku\s*id|\bsku\b/i);
    const nameColIdx = findCol(/product\s*title|product\s*name|\btitle\b/i);
    const priceColIdx = findCol(/your\s*selling\s*price|selling\s*price|special\s*price|listing\s*price|\bprice\b/i);
    const mrpColIdx = findCol(/^mrp$|maximum\s*retail\s*price|original\s*price/i);
    const catColIdx = findCol(/sub-category|category|product\s*type|vertical|^type$/i);
    const sizeColIdx = findCol(/brand\s*size|^size$/i);
    const colorColIdx = findCol(/brand\s*color|^color$|^colour$/i);
    const stockColIdx = findCol(/stock|inventory|quantity|^qty$/i);
    const groupColIdx = findCol(/group\s*id|style\s*code|style\s*id|design\s*no/i);
    const imgColIdx = findCol(/main\s*image|image\s*url|front\s*image|image\s*1/i);
    const descColIdx = findCol(/description|key\s*features/i);

    const productsMap = {};

    candidateRows.forEach(row => {
      if (!row || row.length === 0 || !row.some(c => c !== null && c !== '')) return;

      const skuVal = skuColIdx >= 0 && row[skuColIdx] ? String(row[skuColIdx]).trim() : '';
      const rawTitle = nameColIdx >= 0 && row[nameColIdx] ? String(row[nameColIdx]).trim() : '';
      const rawSubcat = catColIdx >= 0 && row[catColIdx] ? String(row[catColIdx]).trim() : '';
      const priceVal = priceColIdx >= 0 ? Number(row[priceColIdx]) : NaN;
      const mrpVal = mrpColIdx >= 0 ? Number(row[mrpColIdx]) : NaN;

      // Filter out instruction, guidance, and sub-header rows
      if (priceColIdx >= 0 && mrpColIdx >= 0 && isNaN(priceVal) && isNaN(mrpVal)) {
        return;
      }
      if (
        !skuVal || 
        /your identifier|instruction|sample|allowed values|click here|used for:|refers to/i.test(skuVal) ||
        /click here|used for:|refers to|allowed values/i.test(rawTitle) ||
        /click here|used for:|refers to|allowed values/i.test(rawSubcat)
      ) {
        return;
      }

      // Grouping / Style Code derivation
      let styleCode = groupColIdx >= 0 && row[groupColIdx] ? String(row[groupColIdx]).trim() : '';
      let derivedSize = sizeColIdx >= 0 && row[sizeColIdx] ? String(row[sizeColIdx]).trim() : '';
      let derivedColor = colorColIdx >= 0 && row[colorColIdx] ? String(row[colorColIdx]).trim() : '';

      if (!styleCode) {
        const sizeMatch = skuVal.match(sizeRegex);
        if (sizeMatch) {
          if (!derivedSize) derivedSize = sizeMatch[1].toUpperCase();
          styleCode = skuVal.replace(sizeRegex, '').trim();
        } else {
          styleCode = skuVal;
        }
      }

      if (!derivedColor) {
        for (const c of colorsList) {
          if (skuVal.toUpperCase().includes(c)) {
            derivedColor = c.charAt(0) + c.slice(1).toLowerCase();
            break;
          }
        }
      }

      const cleanCategory = detectCategory(rawTitle, rawSubcat, skuVal);
      const parentKey = styleCode || skuVal;
      const str_sku = skuVal.toLowerCase();
      const str_group = (styleCode || '').toLowerCase();

      const finalPrice = !isNaN(priceVal) && priceVal > 0 ? priceVal : (!isNaN(mrpVal) && mrpVal > 0 ? mrpVal : 999);
      const finalMrp = !isNaN(mrpVal) && mrpVal > 0 ? mrpVal : (!isNaN(priceVal) && priceVal > 0 ? priceVal : 1999);
      const stockVal = stockColIdx >= 0 && !isNaN(Number(row[stockColIdx])) ? Number(row[stockColIdx]) : 10;

      if (!productsMap[parentKey]) {
        // Find matching images from uploaded folder
        const matchedImages = [];
        Object.keys(imageMap).forEach(imgName => {
          if (imgName.includes(str_sku) || (str_group && imgName.includes(str_group))) {
            matchedImages.push(imageMap[imgName]);
          }
        });

        const sheetImg = imgColIdx >= 0 && row[imgColIdx] ? String(row[imgColIdx]).trim() : '';
        const defaultImg = categoryDefaultImages[cleanCategory] || '/images/lehenga/1.jpg';
        const primaryImg = sheetImg || (matchedImages.length > 0 ? matchedImages[0] : defaultImg);

        productsMap[parentKey] = {
          name: rawTitle ? rawTitle.replace(/\s*\(\s*\)$/, '') : `${cleanCategory} - ${styleCode}`,
          category: cleanCategory,
          description: descColIdx >= 0 && row[descColIdx] ? String(row[descColIdx]) : `Handcrafted ${cleanCategory} with intricate detailing.`,
          price: finalPrice,
          originalPrice: finalMrp,
          image: primaryImg,
          images: matchedImages.length > 0 ? matchedImages : (sheetImg ? [sheetImg] : [defaultImg]),
          stock: 0,
          sellerId,
          sellerName,
          status: 'active',
          styleCode: styleCode,
          attributes: [],
          variants: []
        };

        // Capture all remaining non-core columns as dynamic attributes
        headers.forEach((h, colI) => {
          if (
            colI !== skuColIdx && colI !== nameColIdx && colI !== priceColIdx && 
            colI !== mrpColIdx && colI !== catColIdx && colI !== groupColIdx &&
            colI !== imgColIdx && colI !== descColIdx && colI !== stockColIdx
          ) {
            const val = row[colI];
            if (val !== undefined && val !== null && String(val).trim() !== '' && String(val).trim() !== 'undefined') {
              if (!/catalog qc|qc failed|flipkart serial|product data status/i.test(h)) {
                productsMap[parentKey].attributes.push({
                  key: h,
                  value: String(val).trim()
                });
              }
            }
          }
        });
      }

      // Add variant
      productsMap[parentKey].variants.push({
        sku: skuVal,
        color: derivedColor || 'Standard',
        size: derivedSize || 'Free Size',
        price: finalPrice,
        originalPrice: finalMrp,
        stock: stockVal
      });

      // Update parent totals & lowest price
      productsMap[parentKey].stock += stockVal;
      if (finalPrice < productsMap[parentKey].price) {
        productsMap[parentKey].price = finalPrice;
      }
      if (finalMrp > productsMap[parentKey].originalPrice) {
        productsMap[parentKey].originalPrice = finalMrp;
      }
    });

    const productsToInsert = Object.values(productsMap);

    // Compute color & size summary caches for fast filtering
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
    const detectedCategories = Array.from(new Set(productsToInsert.map(p => p.category)));

    res.json({ 
      message: 'Bulk upload successful', 
      count: inserted.length, 
      totalVariants: candidateRows.length,
      categories: detectedCategories 
    });

  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
