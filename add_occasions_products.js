import fs from 'fs';
const path = 'src/data/products.js';
let content = fs.readFileSync(path, 'utf8');

const regex = /category:\s*"([^"]+)"\s*\}/g;
content = content.replace(regex, (match, p1) => {
    let arr = [];
    // Randomly assign occasions
    if (Math.random() > 0.4) arr.push('Cocktail');
    if (Math.random() > 0.4) arr.push('Reception');
    if (Math.random() > 0.5) arr.push('Sangeet');
    if (Math.random() > 0.6) arr.push('Wedding');
    if (Math.random() > 0.7) arr.push('Mehendi');
    if (Math.random() > 0.7) arr.push('Haldi');
    if (arr.length === 0) arr.push('Reception');
    
    return `category: "${p1}", occasions: ${JSON.stringify(arr)} }`;
});

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully boosted products.js');
