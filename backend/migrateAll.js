import { products } from '../src/data/products.js';

const API_URL = 'https://house-of-jodha-backend.onrender.com/api/products';
const validCategories = ['Lehenga', 'Saree', 'Anarkali', 'Salwar Kameez', 'Gharara', 'Sharara'];

async function migrateAll() {
    try {
        console.log('Fetching existing products on remote server...');
        const fetchRes = await fetch(API_URL);
        const existingProducts = await fetchRes.json();
        console.log(`Found ${existingProducts.length} items to purge.`);

        let deleted = 0;
        for (const item of existingProducts) {
            try {
                const delRes = await fetch(`${API_URL}/${item._id}`, { method: 'DELETE' });
                if (delRes.ok) deleted++;
            } catch(e) { console.error('Failed to delete', item._id); }
        }
        console.log(`Deleted ${deleted} existing products! Starting true migration...`);

        const documents = products.map(p => ({
            name: p.name || 'Unnamed Product',
            category: p.category ? p.category.charAt(0).toUpperCase() + p.category.slice(1).toLowerCase() : 'Lehenga',
            price: p.price || 1000,
            originalPrice: p.originalPrice || ((p.price || 1000) * 1.2),
            description: p.description || 'Premium design from House of Jodha.',
            image: p.image || '/images/placeholder.jpg',
            stock: p.stock || 5,
            sellerId: '507f1f77bcf86cd799439011',
            sellerName: 'House of Jodha Master',
            occasions: p.occasions || (p.occasion ? [p.occasion] : [])
        }));

        documents.forEach(doc => {
            if (doc.category.toLowerCase().includes('salwar')) doc.category = 'Salwar Kameez';
            else if (!validCategories.includes(doc.category)) {
                const cap = doc.category.charAt(0).toUpperCase() + doc.category.slice(1).toLowerCase();
                if (validCategories.includes(cap)) doc.category = cap;
                else doc.category = 'Lehenga'; 
            }
            if (doc.image.startsWith('/images') === false && doc.image.startsWith('http') === false) {
                // Keep paths as they are mapped by the UI
            }
        });

        console.log(`Starting POST flow for exactly ${documents.length} canonical products...`);

        let success = 0;
        let fail = 0;

        for (let i = 0; i < documents.length; i++) {
            const doc = documents[i];
            try {
                const res = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(doc)
                });
                if (res.ok) {
                    success++;
                    if (success % 10 === 0) console.log(`[${i+1}/${documents.length}] Syncing...`);
                } else {
                    fail++;
                }
            } catch (err) { fail++; }
        }
        
        console.log(`✅ Complete Synchronization! Successful: ${success}, Failed: ${fail}`);
    } catch (e) {
        console.error('Fatal error during migration:', e);
    }
}

migrateAll();
