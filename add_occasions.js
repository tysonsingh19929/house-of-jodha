import fs from 'fs';
const path = 'src/data/enhancedProductDatabase.js';

let content = fs.readFileSync(path, 'utf8');
const regex = /occasions:\s*\[(.*?)\]/g;

content = content.replace(regex, (match, p1) => {
    let arr = p1.split(',').map(s => s.trim().replace(/'|"/g, '')).filter(Boolean);
    
    // Add cocktail to 40% of items
    if (Math.random() > 0.6 && !arr.includes('cocktail')) arr.push('cocktail');
    
    // Add reception to 40% of items
    if (Math.random() > 0.6 && !arr.includes('reception')) arr.push('reception');
    
    // Ensure cocktail and reception exist heavily in specific categories to guarantee items
    if (match.includes("bridal") || match.includes("wedding")) {
        if (!arr.includes('reception')) arr.push('reception');
    }
    
    return `occasions: ['${arr.join("', '")}']`;
});

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully boosted cocktail and reception occasions in the local database!');
