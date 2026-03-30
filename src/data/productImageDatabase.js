// Image mapping for individual products
// Each product searches Unsplash using its own name/description
// Uses Unsplash Source API: https://source.unsplash.com/
// Format: Each product ID → Unsplash search URL with product-specific query

const productImageDatabase = {
  // Lehenga: Beige Gold Tissue Silk Embroidered Lehenga Set
  "1": "https://source.unsplash.com/400x600/?beige%20gold%20tissue%20silk",
  // Gharara: Ivory Chinon Silk Gharara Set
  "2": "https://source.unsplash.com/400x600/?ivory%20chinon%20silk%20gharara",
  // Saree: Pre-draped Royal Purple Satin Saree
  "3": "https://source.unsplash.com/400x600/?pre-draped%20royal%20purple%20satin",
  // Anarkali: Designer Anarkali Suit - Midnight Blue
  "4": "https://source.unsplash.com/400x600/?designer%20anarkali%20suit%20midnight",
  // Salwar Kameez: Salwar Kameez - Emerald Green
  "5": "https://source.unsplash.com/400x600/?salwar%20kameez%20emerald%20green",
  // Sharara: Sharara Suit - Wine Red
  "6": "https://source.unsplash.com/400x600/?sharara%20suit%20wine%20red",
  // Lehenga: Red Silk Hand Embroidered Bridal Lehenga
  "11": "https://source.unsplash.com/400x600/?red%20silk%20hand%20embroidered",
  // Lehenga: Blush Pink Tissue Silk Embroidered Bridal Lehenga
  "12": "https://source.unsplash.com/400x600/?blush%20pink%20tissue%20silk",
  // Lehenga: Maroon Tissue Silk Bridal Lehenga Choli Set
  "13": "https://source.unsplash.com/400x600/?maroon%20tissue%20silk%20bridal",
  // Lehenga: Parrot Green Floral Printed Lehenga Set
  "14": "https://source.unsplash.com/400x600/?parrot%20green%20floral%20printed",
  // Lehenga: Magenta Silk Printed & Embroidered Lehenga Set
  "15": "https://source.unsplash.com/400x600/?magenta%20silk%20printed%20embroidered",
  // Lehenga: Yellow Silk Hand Worked & Printed Lehenga Set
  "16": "https://source.unsplash.com/400x600/?yellow%20silk%20hand%20worked",
  // Lehenga: Mint Green Printed & Embroidered Silk Lehenga Set
  "17": "https://source.unsplash.com/400x600/?mint%20green%20printed%20embroidered",
  // Lehenga: Lemon Green & Pink Silk Embroidered Lehenga Set
  "18": "https://source.unsplash.com/400x600/?lemon%20green%20pink%20silk",
  // Lehenga: Orange Tissue Silk Embroidered Lehenga Set
  "19": "https://source.unsplash.com/400x600/?orange%20tissue%20silk%20embroidered",
  // Lehenga: Pink Georgette Embroidered Lehenga Set
  "20": "https://source.unsplash.com/400x600/?pink%20georgette%20embroidered%20lehenga",
  // Lehenga: Mustard Georgette Embroidered Kurti Lehenga Set
  "21": "https://source.unsplash.com/400x600/?mustard%20georgette%20embroidered%20kurti",
  // Saree: Gold Sequined Silk Bridal Saree
  "22": "https://source.unsplash.com/400x600/?gold%20sequined%20silk%20bridal",
  // Saree: Ivory & Gold Embroidered Bridal Saree
  "23": "https://source.unsplash.com/400x600/?ivory%20gold%20embroidered%20bridal",
  // Saree: Green Luxe Fabric Embroidered Saree
  "24": "https://source.unsplash.com/400x600/?green%20luxe%20fabric%20embroidered",
  // Saree: Bronze Maroon Silk Embroidered Designer Saree
  "25": "https://source.unsplash.com/400x600/?bronze%20maroon%20silk%20embroidered",
  // Saree: Plum Tissue Silk Embroidered Saree
  "26": "https://source.unsplash.com/400x600/?plum%20tissue%20silk%20embroidered",
  // Saree: Mustard Yellow Tissue Silk Embroidered Saree
  "27": "https://source.unsplash.com/400x600/?mustard%20yellow%20tissue%20silk",
  // Saree: Magenta Pink Silk Embroidered Saree
  "28": "https://source.unsplash.com/400x600/?magenta%20pink%20silk%20embroidered",
  // Saree: Dark Green Embroidered Silk Saree
  "29": "https://source.unsplash.com/400x600/?dark%20green%20embroidered%20silk",
  // Saree: Navy Blue Crepe Silk Printed Saree
  "30": "https://source.unsplash.com/400x600/?navy%20blue%20crepe%20silk",
  // Anarkali: Indigo Blue Georgette Embroidered Anarkali With Dupatta
  "31": "https://source.unsplash.com/400x600/?indigo%20blue%20georgette%20embroidered",
  // Anarkali: Ivory Georgette Embroidered Anarkali Dress With Dupatta
  "32": "https://source.unsplash.com/400x600/?ivory%20georgette%20embroidered%20anarkali",
  // Anarkali: Plum Georgette Embroidered Anarkali Dress With Dupatta
  "33": "https://source.unsplash.com/400x600/?plum%20georgette%20embroidered%20anarkali",
  // Anarkali: Plum Jacquard Silk Embroidered Anarkali Dress With Dupatta
  "34": "https://source.unsplash.com/400x600/?plum%20jacquard%20silk%20embroidered",
  // Anarkali: Lavender Silk Embroidered Anarkali Dress
  "35": "https://source.unsplash.com/400x600/?lavender%20silk%20embroidered%20anarkali",
  // Anarkali: Deep Red Silk Embroidered Bridal Anarkali
  "36": "https://source.unsplash.com/400x600/?deep%20red%20silk%20embroidered",
  // Anarkali: Ivory Georgette Embroidered Anarkali Suit
  "37": "https://source.unsplash.com/400x600/?ivory%20georgette%20embroidered%20anarkali",
  // Anarkali: Ruby Red Tissue Silk Anarkali
  "38": "https://source.unsplash.com/400x600/?ruby%20red%20tissue%20silk",
  // Anarkali: Midnight Blue Georgette Anarkali Dress
  "39": "https://source.unsplash.com/400x600/?midnight%20blue%20georgette%20anarkali",
  // Salwar Kameez: Navy Blue Crepe Silk Printed & Embroidered Indowestern Top & Palazzo Set
  "40": "https://source.unsplash.com/400x600/?navy%20blue%20crepe%20silk",
  // Salwar Kameez: Ivory & Pink Ombre Sparkling Crystal Detailed Georgette Top & Palazzo
  "41": "https://source.unsplash.com/400x600/?ivory%20pink%20ombre%20sparkling",
  // Salwar Kameez: Beautiful Lavender Kota Doriya Cotton Silk Embroidered Kurta Set
  "42": "https://source.unsplash.com/400x600/?beautiful%20lavender%20kota%20doriya",
  // Salwar Kameez: Beautiful Black Kota Doriya Cotton Silk Embroidered Kurta Set
  "43": "https://source.unsplash.com/400x600/?beautiful%20black%20kota%20doriya",
  // Salwar Kameez: Yellow Georgette Embroidered Indowestern Top & Palazzo Set With Dupatta
  "44": "https://source.unsplash.com/400x600/?yellow%20georgette%20embroidered%20indowestern",
  // Salwar Kameez: Black & Gold Crepe Silk Indowestern Top & Palazzo
  "45": "https://source.unsplash.com/400x600/?black%20gold%20crepe%20silk",
  // Salwar Kameez: Champagne Gold Silk Embroidered Saree-Style Kurta Set
  "46": "https://source.unsplash.com/400x600/?champagne%20gold%20silk%20embroidered",
  // Salwar Kameez: Emerald Green Kota Silk Sharara Set
  "47": "https://source.unsplash.com/400x600/?emerald%20green%20kota%20silk",
  // Salwar Kameez: Teal Georgette Embroidered Salwar Kameez Set
  "48": "https://source.unsplash.com/400x600/?teal%20georgette%20embroidered%20salwar",
  // Gharara: Pink Purple Georgette Embroidered Gharara Set
  "49": "https://source.unsplash.com/400x600/?pink%20purple%20georgette%20embroidered",
  // Gharara: Blush Pink Georgette Embroidered Gharara Suit
  "50": "https://source.unsplash.com/400x600/?blush%20pink%20georgette%20embroidered",
  // Gharara: Peach Silk Embroidered Gharara Set
  "51": "https://source.unsplash.com/400x600/?peach%20silk%20embroidered%20gharara",
  // Gharara: Maroon Chinon Silk Gharara with Gold Work
  "52": "https://source.unsplash.com/400x600/?maroon%20chinon%20silk%20gharara",
  // Gharara: Lavender Georgette Embroidered Gharara Suit
  "53": "https://source.unsplash.com/400x600/?lavender%20georgette%20embroidered%20gharara",
  // Gharara: Cream & Gold Silk Gharara Set
  "54": "https://source.unsplash.com/400x600/?cream%20gold%20silk%20gharara",
  // Gharara: Navy Blue Chinon Silk Gharara Suit
  "55": "https://source.unsplash.com/400x600/?navy%20blue%20chinon%20silk",
  // Sharara: Pink Purple Georgette Embroidered Sharara Suit Set
  "56": "https://source.unsplash.com/400x600/?pink%20purple%20georgette%20embroidered",
  // Sharara: Light Green Chanderi Silk Hand Embroidered Sharara Set With Shrug
  "57": "https://source.unsplash.com/400x600/?light%20green%20chanderi%20silk",
  // Sharara: Forest Green Georgette Embroidered Sharara Suit Set
  "58": "https://source.unsplash.com/400x600/?forest%20green%20georgette%20embroidered",
  // Sharara: Dusty Rose Georgette Sharara Suit
  "59": "https://source.unsplash.com/400x600/?dusty%20rose%20georgette%20sharara",
  // Sharara: Mustard Yellow Sharara Suit with Embroidery
  "60": "https://source.unsplash.com/400x600/?mustard%20yellow%20sharara%20suit",
  // Sharara: Maroon Silk Embroidered Sharara Set
  "61": "https://source.unsplash.com/400x600/?maroon%20silk%20embroidered%20sharara",
  // Sharara: Mint Green Georgette Sharara Suit
  "62": "https://source.unsplash.com/400x600/?mint%20green%20georgette%20sharara",
  // Sharara: Coral Pink Shararaa with Mirror Work
  "63": "https://source.unsplash.com/400x600/?coral%20pink%20shararaa%20with",
  // Sharara: Indigo Blue Sharara Suit Set
  "64": "https://source.unsplash.com/400x600/?indigo%20blue%20sharara%20suit",
  // Lehenga: Ivory Silk Embroidered Bridal Lehenga
  "101": "https://source.unsplash.com/400x600/?ivory%20silk%20embroidered%20bridal",
  // Lehenga: Navy Blue Georgette Printed Lehenga Suit
  "102": "https://source.unsplash.com/400x600/?navy%20blue%20georgette%20printed",
  // Lehenga: Royal Purple Silk Embroidered Lehenga Set
  "103": "https://source.unsplash.com/400x600/?royal%20purple%20silk%20embroidered",
  // Lehenga: Coral Pink Tissue Silk Embroidered Lehenga
  "104": "https://source.unsplash.com/400x600/?coral%20pink%20tissue%20silk",
  // Lehenga: Dark Green Silk Hand Embroidered Lehenga
  "105": "https://source.unsplash.com/400x600/?dark%20green%20silk%20hand",
  // Lehenga: Gold Georgette Embroidered Lehenga Set
  "106": "https://source.unsplash.com/400x600/?gold%20georgette%20embroidered%20lehenga",
  // Lehenga: Peach Chinon Silk Embroidered Lehenga
  "107": "https://source.unsplash.com/400x600/?peach%20chinon%20silk%20embroidered",
  // Lehenga: Lavender Georgette Embroidered Bridal Lehenga
  "108": "https://source.unsplash.com/400x600/?lavender%20georgette%20embroidered%20bridal",
  // Lehenga: Teal Green Tissue Silk Embroidered Lehenga
  "109": "https://source.unsplash.com/400x600/?teal%20green%20tissue%20silk",
  // Lehenga: Wine Red Silk Embroidered Bridal Lehenga Set
  "110": "https://source.unsplash.com/400x600/?wine%20red%20silk%20embroidered",
  // Lehenga: Cream & Gold Silk Embroidered Lehenga
  "111": "https://source.unsplash.com/400x600/?cream%20gold%20silk%20embroidered",
  // Lehenga: Forest Green Georgette Embroidered Lehenga
  "112": "https://source.unsplash.com/400x600/?forest%20green%20georgette%20embroidered",
  // Lehenga: Rose Pink Silk Hand Embroidered Lehenga Set
  "113": "https://source.unsplash.com/400x600/?rose%20pink%20silk%20hand",
  // Saree: Red Silk Hand Embroidered Bridal Saree
  "201": "https://source.unsplash.com/400x600/?red%20silk%20hand%20embroidered",
  // Saree: Blush Pink Georgette Embroidered Saree
  "202": "https://source.unsplash.com/400x600/?blush%20pink%20georgette%20embroidered",
  // Saree: Cream Silk Embroidered Wedding Saree
  "203": "https://source.unsplash.com/400x600/?cream%20silk%20embroidered%20wedding",
  // Saree: Teal Blue Tissue Silk Embroidered Saree
  "204": "https://source.unsplash.com/400x600/?teal%20blue%20tissue%20silk",
  // Saree: Peach Silk Hand Embroidered Saree
  "205": "https://source.unsplash.com/400x600/?peach%20silk%20hand%20embroidered",
  // Saree: Lavender Georgette Embroidered Saree
  "206": "https://source.unsplash.com/400x600/?lavender%20georgette%20embroidered%20saree",
  // Saree: Forest Green Silk Embroidered Saree
  "207": "https://source.unsplash.com/400x600/?forest%20green%20silk%20embroidered",
  // Saree: Wine Red Silk Embroidered Bridal Saree
  "208": "https://source.unsplash.com/400x600/?wine%20red%20silk%20embroidered",
  // Saree: Champagne Gold Tissue Silk Saree
  "209": "https://source.unsplash.com/400x600/?champagne%20gold%20tissue%20silk",
  // Saree: Maroon Chinon Silk Embroidered Saree
  "210": "https://source.unsplash.com/400x600/?maroon%20chinon%20silk%20embroidered",
  // Saree: Sky Blue Georgette Embroidered Saree
  "211": "https://source.unsplash.com/400x600/?sky%20blue%20georgette%20embroidered",
  // Saree: Coral Pink Silk Embroidered Saree
  "212": "https://source.unsplash.com/400x600/?coral%20pink%20silk%20embroidered",
  // Saree: Royal Blue Tissue Silk Embroidered Saree
  "213": "https://source.unsplash.com/400x600/?royal%20blue%20tissue%20silk",
  // Saree: Magenta Silk Hand Embroidered Saree
  "214": "https://source.unsplash.com/400x600/?magenta%20silk%20hand%20embroidered",
  // Anarkali: Red Silk Hand Embroidered Anarkali
  "301": "https://source.unsplash.com/400x600/?red%20silk%20hand%20embroidered",
  // Anarkali: Blush Pink Georgette Embroidered Anarkali
  "302": "https://source.unsplash.com/400x600/?blush%20pink%20georgette%20embroidered",
  // Anarkali: Forest Green Silk Embroidered Anarkali Suit
  "303": "https://source.unsplash.com/400x600/?forest%20green%20silk%20embroidered",
  // Anarkali: Peach Tissue Silk Embroidered Anarkali
  "304": "https://source.unsplash.com/400x600/?peach%20tissue%20silk%20embroidered",
  // Anarkali: Navy Blue Georgette Embroidered Anarkali Dress
  "305": "https://source.unsplash.com/400x600/?navy%20blue%20georgette%20embroidered",
  // Anarkali: Gold Silk Embroidered Bridal Anarkali
  "306": "https://source.unsplash.com/400x600/?gold%20silk%20embroidered%20bridal",
  // Anarkali: Teal Chinon Silk Embroidered Anarkali
  "307": "https://source.unsplash.com/400x600/?teal%20chinon%20silk%20embroidered",
  // Anarkali: Wine Red Silk Embroidered Anarkali Suit
  "308": "https://source.unsplash.com/400x600/?wine%20red%20silk%20embroidered",
  // Anarkali: Cream & Gold Embroidered Anarkali
  "309": "https://source.unsplash.com/400x600/?cream%20gold%20embroidered%20anarkali",
  // Anarkali: Maroon Georgette Embroidered Anarkali Dress
  "310": "https://source.unsplash.com/400x600/?maroon%20georgette%20embroidered%20anarkali",
  // Anarkali: Lavender Silk Embroidered Bridal Anarkali
  "311": "https://source.unsplash.com/400x600/?lavender%20silk%20embroidered%20bridal",
  // Anarkali: Coral Pink Tissue Silk Anarkali
  "312": "https://source.unsplash.com/400x600/?coral%20pink%20tissue%20silk",
  // Anarkali: Royal Blue Silk Hand Embroidered Anarkali
  "313": "https://source.unsplash.com/400x600/?royal%20blue%20silk%20hand",
  // Salwar Kameez: Red Silk Embroidered Salwar Kameez
  "401": "https://source.unsplash.com/400x600/?red%20silk%20embroidered%20salwar",
  // Salwar Kameez: Blush Pink Georgette Embroidered Kurta Set
  "402": "https://source.unsplash.com/400x600/?blush%20pink%20georgette%20embroidered",
  // Salwar Kameez: Forest Green Cotton Silk Embroidered Salwar Kameez
  "403": "https://source.unsplash.com/400x600/?forest%20green%20cotton%20silk",
  // Salwar Kameez: Peach Kota Doriya Embroidered Kurta Suit
  "404": "https://source.unsplash.com/400x600/?peach%20kota%20doriya%20embroidered",
  // Salwar Kameez: Navy Blue Georgette Embroidered Salwar Kameez Set
  "405": "https://source.unsplash.com/400x600/?navy%20blue%20georgette%20embroidered",
  // Salwar Kameez: Gold Silk Embroidered Indowestern Top & Palazzo
  "406": "https://source.unsplash.com/400x600/?gold%20silk%20embroidered%20indowestern",
  // Salwar Kameez: Teal Chinon Silk Embroidered Kurta Set
  "407": "https://source.unsplash.com/400x600/?teal%20chinon%20silk%20embroidered",
  // Salwar Kameez: Wine Red Silk Embroidered Salwar Kameez
  "408": "https://source.unsplash.com/400x600/?wine%20red%20silk%20embroidered",
  // Salwar Kameez: Cream Cotton Silk Embroidered Kurta Set
  "409": "https://source.unsplash.com/400x600/?cream%20cotton%20silk%20embroidered",
  // Salwar Kameez: Maroon Georgette Embroidered Salwar Kameez
  "410": "https://source.unsplash.com/400x600/?maroon%20georgette%20embroidered%20salwar",
  // Salwar Kameez: Lavender Kota Silk Embroidered Kurta Set
  "411": "https://source.unsplash.com/400x600/?lavender%20kota%20silk%20embroidered",
  // Salwar Kameez: Coral Pink Tissue Silk Embroidered Salwar Kameez
  "412": "https://source.unsplash.com/400x600/?coral%20pink%20tissue%20silk",
  // Gharara: Red Silk Embroidered Bridal Gharara
  "501": "https://source.unsplash.com/400x600/?red%20silk%20embroidered%20bridal",
  // Gharara: Forest Green Georgette Embroidered Gharara
  "502": "https://source.unsplash.com/400x600/?forest%20green%20georgette%20embroidered",
  // Gharara: Teal Silk Embroidered Gharara Set
  "503": "https://source.unsplash.com/400x600/?teal%20silk%20embroidered%20gharara",
  // Gharara: Wine Red Chinon Silk Gharara Suit
  "504": "https://source.unsplash.com/400x600/?wine%20red%20chinon%20silk",
  // Gharara: Gold Silk Embroidered Gharara Set
  "505": "https://source.unsplash.com/400x600/?gold%20silk%20embroidered%20gharara",
  // Gharara: Coral Pink Georgette Embroidered Gharara
  "506": "https://source.unsplash.com/400x600/?coral%20pink%20georgette%20embroidered",
  // Gharara: Royal Blue Silk Embroidered Gharara Suit
  "507": "https://source.unsplash.com/400x600/?royal%20blue%20silk%20embroidered",
  // Sharara: Red Silk Hand Embroidered Sharara
  "601": "https://source.unsplash.com/400x600/?red%20silk%20hand%20embroidered",
  // Sharara: Blush Pink Georgette Embroidered Sharara Set
  "602": "https://source.unsplash.com/400x600/?blush%20pink%20georgette%20embroidered",
  // Sharara: Navy Blue Silk Embroidered Sharara Suit
  "603": "https://source.unsplash.com/400x600/?navy%20blue%20silk%20embroidered",
  // Sharara: Peach Chinon Silk Embroidered Sharara
  "604": "https://source.unsplash.com/400x600/?peach%20chinon%20silk%20embroidered",
  // Sharara: Lavender Georgette Sharara Suit with Dupatta
  "605": "https://source.unsplash.com/400x600/?lavender%20georgette%20sharara%20suit",
  // Sharara: Gold Silk Embroidered Bridal Sharara Set
  "606": "https://source.unsplash.com/400x600/?gold%20silk%20embroidered%20bridal",
  // Sharara: Teal Green Tissue Silk Sharara Suit
  "607": "https://source.unsplash.com/400x600/?teal%20green%20tissue%20silk",
  // Sharara: Wine Red Silk Embroidered Sharara
  "608": "https://source.unsplash.com/400x600/?wine%20red%20silk%20embroidered",
  // Sharara: Cream Chinon Silk Embroidered Sharara Set
  "609": "https://source.unsplash.com/400x600/?cream%20chinon%20silk%20embroidered",
  // Sharara: Forest Green Georgette Embroidered Sharara
  "610": "https://source.unsplash.com/400x600/?forest%20green%20georgette%20embroidered",
  // Sharara: Magenta Silk Embroidered Sharara Suit
  "611": "https://source.unsplash.com/400x600/?magenta%20silk%20embroidered%20sharara",
  // Sharara: Royal Blue Tissue Silk Sharara Set
  "612": "https://source.unsplash.com/400x600/?royal%20blue%20tissue%20silk"
};

// Fallback function: Get image by product ID
export const getProductImage = (productId) => {
  return productImageDatabase[productId] || null;
};

export default productImageDatabase;
