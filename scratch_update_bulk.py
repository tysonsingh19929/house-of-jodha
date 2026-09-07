import re

with open('backend/routes/bulkUpload.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(\"upload.single('file')\", \"upload.any()\")

# Update req.file check
old_file_check = '''    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }'''

new_file_check = '''    const fileObj = req.files && req.files.find(f => f.fieldname === 'file');
    if (!fileObj) {
      return res.status(400).json({ message: 'No spreadsheet file uploaded' });
    }
    
    // Convert bulkImages to base64 mapped by originalname (without extension)
    const imageMap = {};
    if (req.files) {
      req.files.forEach(f => {
        if (f.fieldname === 'bulkImages') {
          const name = f.originalname.split('.')[0].toLowerCase();
          const b64 = \data:\;base64,\\;
          imageMap[name] = b64;
        }
      });
    }'''
content = content.replace(old_file_check, new_file_check)

content = content.replace(\"xlsx.read(req.file.buffer\", \"xlsx.read(fileObj.buffer\")

# Update image matching logic
# Find: image: imgColIdx >= 0 ? row[imgColIdx] : '',
old_img = \"image: imgColIdx >= 0 ? row[imgColIdx] : '',\"
new_img = \"image: imgColIdx >= 0 && row[imgColIdx] ? row[imgColIdx] : (imageMap[str_sku] || imageMap[str_group] || ''),\"

# We need to compute str_sku and str_group before
content = content.replace(\"const parentId = groupID || sku;\", \"const parentId = groupID || sku;\\n      const str_sku = String(sku).toLowerCase();\\n      const str_group = String(groupID || '').toLowerCase();\")
content = content.replace(old_img, new_img)

with open('backend/routes/bulkUpload.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated bulkUpload.js')
