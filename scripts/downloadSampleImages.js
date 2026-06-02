import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categories = {
  lehenga: 25,
  saree: 25,
  anarkali: 25,
  salwar: 21,
  gharara: 15,
  sharara: 21
};

const downloadImage = async (url, filepath) => {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download: ${response.statusCode}`);
    }
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
  } catch (error) {
    throw error;
  }
};

const downloadAllImages = async () => {
  let downloaded = 0;
  let failed = 0;

  for (const [category, count] of Object.entries(categories)) {
    console.log(`\nDownloading ${count} images for ${category}...`);
    
    for (let i = 1; i <= count; i++) {
      const filename = `${i}.jpg`;
      const filepath = path.join(__dirname, `../public/images/${category}/${filename}`);
      
      // Use picsum.photos which works and provides different random images
      const url = `https://picsum.photos/400/600?random=${category}${i}`;

      try {
        await downloadImage(url, filepath);
        process.stdout.write('.');
        downloaded++;
      } catch (error) {
        console.error(`\n❌ Failed to download ${category}/${filename}: ${error.message}`);
        failed++;
      }
    }
    console.log(`\n✅ Completed ${category}`);
  }

  console.log(`\n\n📊 Summary:`);
  console.log(`✅ Successfully downloaded: ${downloaded} images`);
  console.log(`❌ Failed: ${failed} images`);
  console.log(`📁 Images are now in: /public/images/{category}/`);
};

downloadAllImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
