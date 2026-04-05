const fs = require("fs");
const path = require("path");
const root = path.resolve("src");
const pattern = /(https:\/\/images\.pexels\.com\/photos\/[^"'\s]+?\.(?:jpe?g|png))(\?[^"'\s]*)?/g;
let files = 0;
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    const fp = path.join(dir, name);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) {
      walk(fp);
      continue;
    }
    if (!/[.]jsx?$/i.test(fp)) continue;
    const text = fs.readFileSync(fp, "utf8");
    const updated = text.replace(pattern, (match, url, qs) => {
      if (qs) {
        if (qs.includes("auto=compress") || qs.includes("format=webp")) return match;
        return url + qs + "&auto=compress&w=800&format=webp";
      }
      return url + "?auto=compress&w=800&format=webp";
    });
    if (updated !== text) {
      fs.writeFileSync(fp, updated, "utf8");
      files += 1;
      console.log("updated", fp);
    }
  }
};
walk(root);
console.log("updated files:", files);
