import { enhancedProductDatabase } from '../src/data/enhancedProductDatabase.js';

const API_URL = 'https://house-of-jodha-backend.onrender.com/api/products';

const validCategories = ['Lehenga', 'Saree', 'Anarkali', 'Salwar Kameez', 'Gharara', 'Sharara'];

async function migrate() {
    try {
        const documents = enhancedProductDatabase.map(p => ({
            name: p.name || 'Unnamed Product',
            category: p.category ? p.category.charAt(0).toUpperCase() + p.category.slice(1).toLowerCase() : 'Lehenga',
            price: p.price || 1000,
            originalPrice: p.originalPrice || ((p.price || 1000) * 1.2),
            description: p.description || 'Premium design from House of Jodha.',
            image: p.image || '/images/placeholder.jpg',
            stock: p.stock || 10,
            sellerId: '507f1f77bcf86cd799439011',
            sellerName: 'House of Jodha Master',
            occasions: p.occasions || (p.occasion ? [p.occasion] : [])
        }));

        documents.forEach(doc => {
            if (doc.category.toLowerCase().includes('salwar')) {
                doc.category = 'Salwar Kameez';
            } else if (!validCategories.includes(doc.category)) {
                const cap = doc.category.charAt(0).toUpperCase() + doc.category.slice(1).toLowerCase();
                if (validCategories.includes(cap)) doc.category = cap;
                else doc.category = 'Lehenga'; 
            }
        });

        console.log(`Starting migration of ${documents.length} products to remote Render backend...`);

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
                    console.log(`[${i+1}/${documents.length}] Success: ${doc.name}`);
                } else {
                    fail++;
                    console.error(`[${i+1}/${documents.length}] Failed: ${doc.name}`, await res.text());
                }
            } catch (err) {
                fail++;
                console.error(`[${i+1}/${documents.length}] Error: ${doc.name}`, err.message);
            }
        }
        
        console.log(`✅ Migration complete! Successful: ${success}, Failed: ${fail}`);
    } catch (e) {
        console.error('Fatal error during migration:', e);
    }
}

migrate();
