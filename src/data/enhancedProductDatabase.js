// Enhanced product database with Like A Diva inspired product details
// Includes comprehensive data for 82+ products across all categories

export const enhancedProductDatabase = [
  // LEHENGA SECTION (IDs 1, 11-21, 101-113)
  {
    id: 1,
    name: "Red Royal Bridal Lehenga Choli Set",
    price: 32000,
    originalPrice: 42000,
    category: "lehenga",
    imageIndex: 0,
    material: "Silk",
    color: "Red",
    occasions: ['wedding', 'bridal', 'mehendi', 'sangeet', 'reception'],
    rating: 4.9,
    reviews: 35,
    stock: 2,
    image: "/images/lehenga/0.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15089",
    description: `Every bride dreams of a show-stopping wedding lehenga, and this Red Royal Bridal Lehenga Choli Set delivers exactly that. The rich red silk is pure luxury and the intricate embroidery makes this piece truly unforgettable.

Hand-embroidered with premium zari, sequins, and precious stones, this lehenga features a beautifully flared silhouette that moves gracefully with every step. The matching choli has a sweetheart neckline adorned with exquisite detail work.

Complete with an embroidered dupatta in matching red silk. This is not just a lehenga - it's a statement of elegance and tradition.`,
    fabricDetails: {
      lehenga: "Silk",
      choli: "Silk",
      dupatta: "Silk Chiffon"
    },
    care: "Professional dry cleaning only. Store in cool, dry place away from moisture.",
    embroidery: "Hand embroidered with zari, sequins, stones, and cutdana",
    deliveryType: "Made to Order",
    deliveryDays: "25-30 days",
    freeShipping: true,
    maxBustSize: "50 inches",
    customFitAvailable: true
  },
  {
    id: 11,
    name: "Peach Silk Embroidered Lehenga Choli Set",
    price: 16500,
    originalPrice: 20000,
    category: "lehenga",
    imageIndex: 1,
    material: "Silk",
    color: "Peach",
    occasions: ['wedding', 'mehendi', 'party', 'engagement', 'reception'],
    rating: 4.7,
    reviews: 20,
    stock: 5,
    image: "/images/lehenga/1.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15278",
    description: `Delicate peach silk combined with intricate embroidery creates a romantic look perfect for mehendi and pre-wedding celebrations. The soft peach tone is universally flattering and exudes elegance.

Made from premium silk with hand-embroidered details featuring zari and sequins. The lehenga has a flared design with a beautifully embellished border. Complete with matching choli and dupatta.`,
    fabricDetails: {
      lehenga: "Silk",
      choli: "Silk",
      dupatta: "Silk Chiffon"
    },
    care: "Dry clean recommended for longevity.",
    embroidery: "Hand embroidered with zari, sequins, and pearls",
    deliveryType: "Made to Order",
    deliveryDays: "18-22 days",
    freeShipping: true,
    maxBustSize: "48 inches",
    customFitAvailable: true
  },
  {
    id: 12,
    name: "Hot Pink Tissue Silk Embroidered Lehenga Choli Set",
    price: 12000,
    originalPrice: 15000,
    category: "lehenga",
    imageIndex: 2,
    material: "Tissue Silk",
    color: "Hot Pink",
    occasions: ['party', 'celebration', 'festival', 'sangeet', 'wedding', 'reception'],
    rating: 4.6,
    reviews: 18,
    stock: 6,
    image: "/images/lehenga/2.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15312",
    description: `Vibrant hot pink tissue silk lehenga for the bold and confident bride. The bright color is perfect for celebrations where you want to stand out and make an impression.

The lightweight tissue silk drapes beautifully and the hand embroidery adds traditional charm. The lehenga features a gracefully flared bottom with an elaborately embroidered border.`,
    fabricDetails: {
      lehenga: "Tissue Silk",
      choli: "Tissue Silk",
      dupatta: "Net Silk"
    },
    care: "Dry clean recommended.",
    embroidery: "Hand embroidery with zari, sequins, and pearls",
    deliveryType: "Ready to Wear",
    deliveryDays: "5-7 days",
    freeShipping: true,
    maxBustSize: "46 inches",
    customFitAvailable: false
  },
  {
    id: 13,
    name: "Maroon Tissue Silk Bridal Lehenga Choli Set",
    price: 29000,
    originalPrice: 36000,
    category: "lehenga",
    imageIndex: 3,
    material: "Tissue Silk",
    color: "Maroon",
    occasions: ['wedding', 'bridal', 'reception', 'cocktail', 'mehendi'],
    rating: 4.8,
    reviews: 26,
    stock: 2,
    image: "/images/lehenga/3.jpg",
    size: "M",
    itemCode: "LIKEADIVA-14765",
    description: `Radiate royalty in this magnificent Maroon Tissue Silk Bridal Lehenga Choli Set. The rich maroon color symbolizes luxury and tradition, perfect for your special day.

Features elaborate hand embroidery with gold zari woven details and stone studded borders. The lehenga has a beautifully flared design that creates an impressive silhouette. Complete with embroidered choli and matching dupatta.`,
    fabricDetails: {
      lehenga: "Tissue Silk",
      choli: "Tissue Silk",
      dupatta: "Net Chiffon"
    },
    care: "Dry clean only. Store in cool, dry place away from moisture.",
    embroidery: "Hand embroidery with zari, stones, and cutdana",
    deliveryType: "Made to Order",
    deliveryDays: "22-28 days",
    freeShipping: true,
    maxBustSize: "50 inches",
    customFitAvailable: true
  },
  {
    id: 14,
    name: "Parrot Green Floral Printed Lehenga Set",
    price: 7700,
    originalPrice: 10500,
    category: "lehenga",
    imageIndex: 4,
    material: "Georgette",
    color: "Parrot Green",
    occasions: ['casual', 'party', 'festival', 'mehendi', 'engagement'],
    rating: 4.6,
    reviews: 18,
    stock: 8,
    image: "/images/lehenga/4.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15089",
    description: `Fresh and vibrant! This Parrot Green Floral Printed Lehenga Set is perfect for casual celebrations and festival seasons. The beautiful floral prints add a playful touch to this traditional silhouette.

Made from lightweight georgette fabric, this lehenga is comfortable for all-day wear. Perfect for mehendi celebrations, daytime parties, and casual festive occasions.`,
    fabricDetails: {
      lehenga: "Georgette",
      choli: "Georgette",
      dupatta: "Georgette"
    },
    care: "Gentle wash recommended. Avoid bleach and dry clean if needed.",
    embroidery: "Floral prints with light embroidery",
    deliveryType: "Ready to Wear",
    deliveryDays: "5-7 days",
    freeShipping: true,
    maxBustSize: "46 inches",
    customFitAvailable: false
  },
  {
    id: 15,
    name: "Magenta Silk Printed & Embroidered Lehenga Set",
    price: 8300,
    originalPrice: 14800,
    category: "lehenga",
    imageIndex: 5,
    material: "Silk",
    color: "Magenta Pink",
    occasions: ['party', 'celebration', 'festival', 'cocktail', 'wedding', 'reception'],
    rating: 4.7,
    reviews: 22,
    stock: 6,
    image: "/images/lehenga/5.jpg",
    size: "M",
    itemCode: "LIKEADIVA-14998",
    description: `Stunning Magenta Silk Printed & Embroidered Lehenga Set that combines the best of both worlds - contemporary prints with classic embroidery.

The vibrant magenta color is perfect for festive occasions and celebrations. Enhanced with delicate printed patterns and hand embroidery details. This color flatters all skin tones beautifully.`,
    fabricDetails: {
      lehenga: "Silk",
      choli: "Silk",
      dupatta: "Silk"
    },
    care: "Dry clean recommended for longevity.",
    embroidery: "Printed with selective hand embroidery",
    deliveryType: "Ready to Wear",
    deliveryDays: "5-7 days",
    freeShipping: true,
    maxBustSize: "46 inches",
    customFitAvailable: false
  },
  {
    id: 16,
    name: "Yellow Silk Hand Worked & Printed Lehenga Set",
    price: 18000,
    originalPrice: 21600,
    category: "lehenga",
    imageIndex: 6,
    material: "Silk",
    color: "Yellow",
    occasions: ['wedding', 'mehendi', 'party', 'cocktail', 'reception'],
    rating: 4.7,
    reviews: 20,
    stock: 5,
    image: "/images/lehenga/6.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15156",
    description: `Brighten your celebration with this cheerful Yellow Silk Lehenga Set. The sunny color combined with hand-worked embroidery creates a festive yet elegant look.

Perfect for mehendi ceremonies and pre-wedding celebrations. The silk fabric ensures comfort while the embroidery adds traditional touch. A versatile piece for your ethnic wardrobe.`,
    fabricDetails: {
      lehenga: "Silk",
      choli: "Silk",
      dupatta: "Silk Chiffon"
    },
    care: "Dry clean recommended. Test colors before washing.",
    embroidery: "Hand worked embroidery with prints",
    deliveryType: "Ready to Wear",
    deliveryDays: "7-10 days",
    freeShipping: true,
    maxBustSize: "46 inches",
    customFitAvailable: true
  },
  {
    id: 17,
    name: "Mint Green Printed & Embroidered Silk Lehenga Set",
    price: 10000,
    originalPrice: 12300,
    category: "lehenga",
    imageIndex: 7,
    material: "Silk",
    color: "Mint Green",
    occasions: ['party', 'casual', 'festival', 'cocktail', 'reception'],
    rating: 4.6,
    reviews: 19,
    stock: 7,
    image: "/images/lehenga/7.jpg",
    size: "M",
    itemCode: "LIKEADIVA-14856",
    description: `Refreshing mint green brings a contemporary twist to traditional lehenga wear. This Mint Green Printed & Embroidered Silk Lehenga Set is perfect for modern brides who love color variety.

The light mint shade makes it ideal for daytime celebrations and mehendi functions. Combined with delicate prints and embroidery, it's a perfect balance of traditional and modern.`,
    fabricDetails: {
      lehenga: "Silk",
      choli: "Silk",
      dupatta: "Silk"
    },
    care: "Dry clean recommended.",
    embroidery: "Printed with embroidered accents",
    deliveryType: "Ready to Wear",
    deliveryDays: "5-7 days",
    freeShipping: true,
    maxBustSize: "46 inches",
    customFitAvailable: false
  },
  {
    id: 18,
    name: "Lemon Green & Pink Silk Embroidered Lehenga Set",
    price: 29000,
    originalPrice: 34900,
    category: "lehenga",
    imageIndex: 8,
    material: "Silk",
    color: "Lemon Green & Pink",
    occasions: ['wedding', 'sangeet', 'engagement', 'mehendi', 'reception'],
    rating: 4.8,
    reviews: 27,
    stock: 3,
    image: "/images/lehenga/8.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15287",
    description: `Absolutely stunning two-tone Lehenga Set featuring vibrant lemon green and pink silk. This unique color combination is perfect for modern brides who want something extraordinary.

The hand embroidery beautifully complements both colors, creating visual harmony. The contrasting colors make this lehenga a real showstopper at any celebration.`,
    fabricDetails: {
      lehenga: "Silk",
      choli: "Silk",
      dupatta: "Silk Chiffon"
    },
    care: "Dry clean recommended. Colors may bleed if wet cleaned.",
    embroidery: "Hand embroidered with zari and sequins",
    deliveryType: "Made to Order",
    deliveryDays: "20-25 days",
    freeShipping: true,
    maxBustSize: "48 inches",
    customFitAvailable: true
  },
  {
    id: 19,
    name: "Orange Tissue Silk Embroidered Lehenga Set",
    price: 16200,
    originalPrice: 19400,
    category: "lehenga",
    imageIndex: 9,
    material: "Tissue Silk",
    color: "Orange",
    occasions: ['wedding', 'mehendi', 'party', 'cocktail', 'reception'],
    rating: 4.7,
    reviews: 21,
    stock: 5,
    image: "/images/lehenga/9.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15031",
    description: `Vibrant and elegant! This Orange Tissue Silk Embroidered Lehenga Set brings festive energy to your wardrobe. The warm orange tone is traditional and trendy at the same time.

Made from premium tissue silk with delicate hand embroidery, this lehenga drapes beautifully and is comfortable to wear for extended periods. Perfect for weddings and festive celebrations.`,
    fabricDetails: {
      lehenga: "Tissue Silk",
      choli: "Tissue Silk",
      dupatta: "Net Silk"
    },
    care: "Dry clean recommended.",
    embroidery: "Hand embroidered with zari and mirrors",
    deliveryType: "Ready to Wear",
    deliveryDays: "7-10 days",
    freeShipping: true,
    maxBustSize: "46 inches",
    customFitAvailable: true
  },
  {
    id: 20,
    name: "Pink Georgette Embroidered Lehenga Set",
    price: 6100,
    originalPrice: 8000,
    category: "lehenga",
    imageIndex: 10,
    material: "Georgette",
    color: "Dark Pink",
    occasions: ['party', 'casual', 'festival', 'reception', 'cocktail'],
    rating: 4.5,
    reviews: 15,
    stock: 9,
    image: "/images/lehenga/10.jpg",
    size: "M",
    itemCode: "LIKEADIVA-14723",
    description: `Affordable elegance! This Dark Pink Georgette Embroidered Lehenga Set is perfect for those who want style without breaking the bank. The lightweight georgette makes it ideal for comfort-conscious wear.

Beautiful embroidery adds traditional charm while keeping the overall look fresh and modern. Perfect for casual celebrations and festive occasions.`,
    fabricDetails: {
      lehenga: "Georgette",
      choli: "Georgette",
      dupatta: "Georgette"
    },
    care: "Can be gently washed or dry cleaned.",
    embroidery: "Embroidered with thread and mirrors",
    deliveryType: "Ready to Wear",
    deliveryDays: "3-5 days",
    freeShipping: true,
    maxBustSize: "44 inches",
    customFitAvailable: false
  },
  {
    id: 21,
    name: "Mustard Georgette Embroidered Kurti Lehenga Set",
    price: 6800,
    originalPrice: 11000,
    category: "lehenga",
    imageIndex: 11,
    material: "Georgette",
    color: "Mustard Yellow",
    occasions: ['casual', 'festival', 'party', 'sangeet', 'wedding', 'cocktail', 'reception'],
    rating: 4.6,
    reviews: 17,
    stock: 8,
    image: "/images/lehenga/11.jpg",
    size: "M",
    itemCode: "LIKEADIVA-14891",
    description: `Warm and welcoming mustard yellow brings sunshine to your wardrobe. This Mustard Georgette Embroidered Kurti Lehenga Set features a stylish kurti-style choli for a modern take on traditional wear.

The lightweight georgette fabric is perfect for comfortable all-day wear. Great value for money with beautiful embroidery details.`,
    fabricDetails: {
      lehenga: "Georgette",
      kurti: "Georgette",
      dupatta: "Georgette"
    },
    care: "Hand wash or gentle machine wash recommended.",
    embroidery: "Embroidered with traditional motifs",
    deliveryType: "Ready to Wear",
    deliveryDays: "5-7 days",
    freeShipping: true,
    maxBustSize: "44 inches",
    customFitAvailable: false
  },
  {
    id: 101,
    name: "Ivory Silk Embroidered Bridal Lehenga",
    price: 35000,
    originalPrice: 44000,
    category: "lehenga",
    imageIndex: 12,
    material: "Pure Silk",
    color: "Ivory",
    occasions: ['wedding', 'bridal', 'engagement', 'sangeet', 'reception'],
    rating: 4.9,
    reviews: 29,
    stock: 2,
    image: "/images/lehenga/12.jpg",
    size: "M",
    itemCode: "LIKEADIVA-14652",
    description: `Timeless ivory elegance for the modern bride. This Ivory Silk Embroidered Bridal Lehenga features intricate hand embroidery with gold zari work and precious stone detailing.

The ivory color never goes out of style and works beautifully with any skin tone. This is a premium bridal piece that will make your wedding day unforgettable. Features customization options for perfect fit.`,
    fabricDetails: {
      lehenga: "Pure Silk",
      choli: "Pure Silk",
      dupatta: "Silk Net"
    },
    care: "Professional dry cleaning recommended.",
    embroidery: "Intricate hand embroidery with zari and stones",
    deliveryType: "Made to Order",
    deliveryDays: "25-30 days",
    freeShipping: true,
    maxBustSize: "50 inches",
    customFitAvailable: true
  },
  {
    id: 102,
    name: "Navy Blue Georgette Printed Lehenga Suit",
    price: 9200,
    originalPrice: 12500,
    category: "lehenga",
    imageIndex: 13,
    material: "Georgette",
    color: "Navy Blue",
    occasions: ['party', 'festival', 'casual', 'mehendi', 'wedding', 'cocktail', 'reception'],
    rating: 4.6,
    reviews: 19,
    stock: 7,
    image: "/images/lehenga/13.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15002",
    description: `Classic navy blue with contemporary prints - this Georgette Lehenga Suit is perfect for the modern woman. The navy shade is versatile and elegant for various occasions.

Lightweight georgette fabric makes it comfortable for extended wear. Beautiful printed patterns add visual interest while keeping the overall look sophisticated.`,
    fabricDetails: {
      lehenga: "Georgette",
      choli: "Georgette",
      dupatta: "Georgette"
    },
    care: "Can be hand washed or dry cleaned.",
    embroidery: "Printed with embroidered accents",
    deliveryType: "Ready to Wear",
    deliveryDays: "5-7 days",
    freeShipping: true,
    maxBustSize: "46 inches",
    customFitAvailable: false
  },
  {
    id: 103,
    name: "Royal Purple Silk Embroidered Lehenga Set",
    price: 24500,
    originalPrice: 30000,
    category: "lehenga",
    imageIndex: 14,
    material: "Silk",
    color: "Royal Purple",
    occasions: ['wedding', 'sangeet', 'engagement', 'cocktail', 'reception'],
    rating: 4.8,
    reviews: 25,
    stock: 4,
    image: "/images/lehenga/14.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15134",
    description: `Regal and magnificent! Royal purple is the color of royalty and this Silk Embroidered Lehenga Set delivers exactly that. Perfect for wedding celebrations and sangeet nights.

The rich purple hue combined with intricate embroidery creates a look that's both traditional and fashion-forward. The silk fabric ensures comfort and an elegant drape.`,
    fabricDetails: {
      lehenga: "Silk",
      choli: "Silk",
      dupatta: "Silk Chiffon"
    },
    care: "Dry clean recommended for color preservation.",
    embroidery: "Hand embroidered with zari and cutdana",
    deliveryType: "Made to Order",
    deliveryDays: "18-22 days",
    freeShipping: true,
    maxBustSize: "48 inches",
    customFitAvailable: true
  },
  {
    id: 104,
    name: "Coral Pink Tissue Silk Embroidered Lehenga",
    price: 18700,
    originalPrice: 23000,
    category: "lehenga",
    imageIndex: 15,
    material: "Tissue Silk",
    color: "Coral Pink",
    occasions: ['wedding', 'party', 'mehendi', 'reception', 'engagement'],
    rating: 4.7,
    reviews: 22,
    stock: 5,
    image: "/images/lehenga/15.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15201",
    description: `Coral pink is the season's hottest color! This Tissue Silk Embroidered Lehenga features a beautiful coral pink tone that's perfect for modern brides who want color with elegance.

The tissue silk drapes beautifully and the hand embroidery adds traditional charm. Great for wedding functions from mehendi to receptions.`,
    fabricDetails: {
      lehenga: "Tissue Silk",
      choli: "Tissue Silk",
      dupatta: "Net Silk"
    },
    care: "Dry clean recommended.",
    embroidery: "Hand embroidered with sequins and mirrors",
    deliveryType: "Ready to Wear",
    deliveryDays: "7-10 days",
    freeShipping: true,
    maxBustSize: "46 inches",
    customFitAvailable: true
  },
  {
    id: 105,
    name: "Dark Green Silk Hand Embroidered Lehenga",
    price: 26000,
    originalPrice: 32000,
    category: "lehenga",
    imageIndex: 16,
    material: "Silk",
    color: "Dark Green",
    occasions: ['wedding', 'sangeet', 'bridal', 'reception', 'cocktail'],
    rating: 4.8,
    reviews: 24,
    stock: 3,
    image: "/images/lehenga/16.jpg",
    size: "M",
    itemCode: "LIKEADIVA-14978",
    description: `Dark green symbolizes prosperity and tradition. This Dark Green Silk Hand Embroidered Lehenga is a perfect choice for brides who love deep, rich colors.

Every element is hand-crafted with care - from the embroidery to the final stitching. The lehenga features beautiful zari work and embellishment that catches light beautifully.`,
    fabricDetails: {
      lehenga: "Silk",
      choli: "Silk",
      dupatta: "Silk Chiffon"
    },
    care: "Dry clean only. Avoid sunlight to prevent fading.",
    embroidery: "Hand embroidered with zari, mirrors, and beads",
    deliveryType: "Made to Order",
    deliveryDays: "22-28 days",
    freeShipping: true,
    maxBustSize: "48 inches",
    customFitAvailable: true
  },
  {
    id: 106,
    name: "Gold Georgette Embroidered Lehenga Set",
    price: 15500,
    originalPrice: 19000,
    category: "lehenga",
    imageIndex: 17,
    material: "Georgette",
    color: "Gold",
    occasions: ['wedding', 'party', 'festive', 'cocktail', 'reception'],
    rating: 4.6,
    reviews: 18,
    stock: 6,
    image: "/images/lehenga/17.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15089",
    description: `Gleaming gold always makes a statement! This Gold Georgette Embroidered Lehenga Set is perfect for those who want to shine at celebrations.

The lightweight georgette with shimmering embroidery creates an eye-catching ensemble. Perfect for pre-wedding functions and festive occasions.`,
    fabricDetails: {
      lehenga: "Georgette",
      choli: "Georgette",
      dupatta: "Georgette"
    },
    care: "Gentle wash or dry clean recommended.",
    embroidery: "Embroidered with gold thread and mirrors",
    deliveryType: "Ready to Wear",
    deliveryDays: "5-7 days",
    freeShipping: true,
    maxBustSize: "46 inches",
    customFitAvailable: false
  },
  {
    id: 107,
    name: "Peach Chinon Silk Embroidered Lehenga",
    price: 22000,
    originalPrice: 27000,
    category: "lehenga",
    imageIndex: 18,
    material: "Chinon Silk",
    color: "Peach",
    occasions: ['wedding', 'mehendi', 'sangeet', 'reception'],
    rating: 4.7,
    reviews: 20,
    stock: 5,
    image: "/images/lehenga/18.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15145",
    description: `Delicate peach hue combined with chinon silk creates a soft yet striking look. This Peach Chinon Silk Embroidered Lehenga is perfect for the romantic bride.

The chinon silk fabric has a beautiful natural sheen and the embroidery adds dimension. Versatile enough for mehendi, sangeet, or wedding functions.`,
    fabricDetails: {
      lehenga: "Chinon Silk",
      choli: "Chinon Silk",
      dupatta: "Net Silk"
    },
    care: "Dry clean recommended.",
    embroidery: "Hand embroidered with zari and sequins",
    deliveryType: "Made to Order",
    deliveryDays: "18-22 days",
    freeShipping: true,
    maxBustSize: "48 inches",
    customFitAvailable: true
  },
  {
    id: 108,
    name: "Lavender Georgette Embroidered Bridal Lehenga",
    price: 28000,
    originalPrice: 35000,
    category: "lehenga",
    imageIndex: 19,
    material: "Georgette",
    color: "Lavender",
    occasions: ['wedding', 'bridal', 'engagement', 'mehendi', 'sangeet', 'reception'],
    rating: 4.8,
    reviews: 26,
    stock: 4,
    image: "/images/lehenga/19.jpg",
    size: "M",
    itemCode: "LIKEADIVA-14834",
    description: `Ethereal lavender brings a dreamy quality to bridal wear. This Lavender Georgette Embroidered Bridal Lehenga is perfect for the unconventional bride who loves pastels.

The soft lavender color is flattering to all complexions and the embroidery adds sparkle and drama. A unique choice for your wedding day.`,
    fabricDetails: {
      lehenga: "Georgette",
      choli: "Georgette",
      dupatta: "Net"
    },
    care: "Dry clean recommended to preserve color.",
    embroidery: "Intricate hand embroidery with beads and sequins",
    deliveryType: "Made to Order",
    deliveryDays: "20-25 days",
    freeShipping: true,
    maxBustSize: "48 inches",
    customFitAvailable: true
  },
  {
    id: 109,
    name: "Teal Green Tissue Silk Embroidered Lehenga",
    price: 19500,
    originalPrice: 24000,
    category: "lehenga",
    imageIndex: 20,
    material: "Tissue Silk",
    color: "Teal Green",
    occasions: ['wedding', 'party', 'celebration', 'reception', 'mehendi', 'sangeet'],
    rating: 4.7,
    reviews: 21,
    stock: 5,
    image: "/images/lehenga/20.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15267",
    description: `Teal green is a contemporary choice that still honors tradition. This Tissue Silk Embroidered Lehenga is perfect for the modern bride.

The jewel-tone teal combined with tissue silk creates an elegant ensemble. The embroidery work enhances the color beautifully.`,
    fabricDetails: {
      lehenga: "Tissue Silk",
      choli: "Tissue Silk",
      dupatta: "Silk Chiffon"
    },
    care: "Dry clean recommended.",
    embroidery: "Hand embroidered with gold zari and mirrors",
    deliveryType: "Ready to Wear",
    deliveryDays: "7-10 days",
    freeShipping: true,
    maxBustSize: "46 inches",
    customFitAvailable: true
  },
  {
    id: 110,
    name: "Wine Red Silk Embroidered Bridal Lehenga Set",
    price: 31000,
    originalPrice: 38000,
    category: "lehenga",
    imageIndex: 21,
    material: "Silk",
    color: "Wine Red",
    occasions: ['wedding', 'bridal', 'mehendi', 'reception', 'cocktail'],
    rating: 4.8,
    reviews: 23,
    stock: 3,
    image: "/images/lehenga/21.jpg",
    size: "M",
    itemCode: "LIKEADIVA-14756",
    description: `Rich wine red is a classic choice for brides who want timeless elegance. This Silk Embroidered Bridal Lehenga Set features premium silk and intricate hand embroidery.

The deep wine color is sophisticated and photogenic. The embroidery work includes traditional zari and stone detailing for maximum impact.`,
    fabricDetails: {
      lehenga: "Silk",
      choli: "Silk",
      dupatta: "Silk Chiffon"
    },
    care: "Professional dry cleaning required.",
    embroidery: "Hand embroidered with premium zari and stones",
    deliveryType: "Made to Order",
    deliveryDays: "25-30 days",
    freeShipping: true,
    maxBustSize: "50 inches",
    customFitAvailable: true
  },
  {
    id: 111,
    name: "Cream & Gold Silk Embroidered Lehenga",
    price: 26500,
    originalPrice: 32500,
    category: "lehenga",
    imageIndex: 22,
    material: "Silk",
    color: "Cream & Gold",
    occasions: ['wedding', 'sangeet', 'engagement', 'reception', 'cocktail'],
    rating: 4.7,
    reviews: 22,
    stock: 4,
    image: "/images/lehenga/22.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15023",
    description: `Soft cream with gold accents creates a sophisticated and timeless look. This Cream & Gold Silk Embroidered Lehenga features the perfect balance of subtlety and glamour.

The gold embroidery on cream silk is both traditional and contemporary. Perfect for brides who prefer neutral tones with sparkle.`,
    fabricDetails: {
      lehenga: "Silk",
      choli: "Silk",
      dupatta: "Silk Chiffon"
    },
    care: "Dry clean recommended. Keep away from moisture.",
    embroidery: "Hand embroidered with gold zari and sequins",
    deliveryType: "Made to Order",
    deliveryDays: "20-25 days",
    freeShipping: true,
    maxBustSize: "48 inches",
    customFitAvailable: true
  },
  {
    id: 112,
    name: "Forest Green Georgette Embroidered Lehenga",
    price: 14800,
    originalPrice: 18500,
    category: "lehenga",
    imageIndex: 23,
    material: "Georgette",
    color: "Forest Green",
    occasions: ['party', 'festival', 'casual', 'reception', 'wedding', 'cocktail', 'engagement'],
    rating: 4.6,
    reviews: 17,
    stock: 7,
    image: "/images/lehenga/23.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15176",
    description: `Deep forest green for the nature-loving bride. This Georgette Embroidered Lehenga combines traditional styling with earthy elegance.

The lightweight georgette makes it comfortable while the embroidery adds traditional charm. Great for daytime celebrations and casual festivities.`,
    fabricDetails: {
      lehenga: "Georgette",
      choli: "Georgette",
      dupatta: "Georgette"
    },
    care: "Can be hand washed or dry cleaned.",
    embroidery: "Embroidered with traditional motifs",
    deliveryType: "Ready to Wear",
    deliveryDays: "5-7 days",
    freeShipping: true,
    maxBustSize: "46 inches",
    customFitAvailable: false
  },
  {
    id: 113,
    name: "Rose Pink Silk Hand Embroidered Lehenga Set",
    price: 23000,
    originalPrice: 28000,
    category: "lehenga",
    imageIndex: 24,
    material: "Silk",
    color: "Rose Pink",
    occasions: ['wedding', 'mehendi', 'sangeet', 'reception'],
    rating: 4.7,
    reviews: 19,
    stock: 5,
    image: "/images/lehenga/24.jpg",
    size: "M",
    itemCode: "LIKEADIVA-14947",
    description: `Romantic rose pink is perfect for the sentimental bride. This Silk Hand Embroidered Lehenga Set features beautiful hand-work and premium silk.

The rose pink color is flattering and the embroidery work is intricate. A perfect choice for mehendi or sangeet celebrations.`,
    fabricDetails: {
      lehenga: "Silk",
      choli: "Silk",
      dupatta: "Silk Chiffon"
    },
    care: "Dry clean recommended.",
    embroidery: "Hand embroidered with zari, sequins, and pearls",
    deliveryType: "Made to Order",
    deliveryDays: "18-22 days",
    freeShipping: true,
    maxBustSize: "48 inches",
    customFitAvailable: true
  },

  // ORIGINAL 6 ENHANCED PRODUCTS (401-406)
  {
    id: 401,
    name: "Ivory Chinon Silk Kurta Sharara Set",
    price: 15000,
    originalPrice: 16400,
    category: "sharara",
    imageIndex: 5,
    material: "Chinon Silk",
    color: "Ivory",
    occasions: ['wedding', 'mehendi', 'party', 'reception'],
    rating: 4.8,
    reviews: 24,
    stock: 5,
    image: "/images/sharara/5.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15808",
    description: `Be the gorgeous beauty at every party & occasion this season in this one of its kind Ivory kurta set from our exclusive collection.

The chic attire is crafted beautifully in premium quality Chinon Silk fabric. To enhance the beauty of the outfit it is adorned with intricate hand embroidery done to perfection with cutdana, sequins, moti & pearls.

It is paired with Chinon Silk crafted, pleated, & flared Sharara. To complete the look it comes with stunning Shrug style hand embroidered & Organza Silk crafted Dupatta.`,
    fabricDetails: {
      top: "Chinon Silk",
      bottom: "Chinon Silk",
      dupatta: "Organza Silk"
    },
    care: "We suggest you dry clean this dress. Avoid twisting & wringing.",
    embroidery: "Hand embroidered with cutdana, sequins, moti and pearls",
    deliveryType: "Ready to Wear",
    deliveryDays: "12-15 days",
    freeShipping: true,
    maxBustSize: "46 inches",
    customFitAvailable: true
  },
  {
    id: 402,
    name: "Beige Gold Tissue Silk Lehenga Set",
    price: 25600,
    originalPrice: 30800,
    category: "lehenga",
    imageIndex: 8,
    material: "Tissue Silk",
    color: "Beige Gold",
    occasions: ['wedding', 'sangeet', 'party', 'mehendi', 'reception'],
    rating: 4.9,
    reviews: 31,
    stock: 3,
    image: "/images/lehenga/8.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15223",
    description: `Adorn yourself in sheer elegance with this exquisite Beige Gold Tissue Silk Lehenga Set. This stunning ensemble features intricate hand embroidery with zari woven pallu and beautifully embellished borders.

Perfect for weddings, sangeet ceremonies, and celebratory occasions, this lehenga captures the essence of traditional Indian luxury with a modern twist. The luxurious tissue silk fabric drapes gracefully, accentuating your silhouette beautifully.

Complete with matching choli and dupatta, this is a must-have for every bride's trousseau.`,
    fabricDetails: {
      lehenga: "Tissue Silk",
      choli: "Tissue Silk",
      dupatta: "Tissue Silk"
    },
    care: "Dry clean recommended. Avoid prolonged exposure to sunlight.",
    embroidery: "Hand embroidered with zari, cutdana, and sequins",
    deliveryType: "Made to Order",
    deliveryDays: "20-25 days",
    freeShipping: true,
    maxBustSize: "48 inches",
    customFitAvailable: true
  },
  {
    id: 403,
    name: "Red Silk Bandhani Saree",
    price: 14800,
    originalPrice: 18500,
    category: "saree",
    imageIndex: 9,
    material: "Silk",
    color: "Red",
    occasions: ['wedding', 'festival', 'celebration', 'mehendi', 'cocktail', 'reception'],
    rating: 4.8,
    reviews: 26,
    stock: 4,
    image: "/images/saree/9.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15445",
    description: `Traditional red silk bandhani saree with authentic tie-dye patterns. This classic red is perfect for festive occasions and celebrations.

The bandhani technique creates unique patterns that make each saree special. The red color is auspicious and the silk ensures comfort and elegance.

A timeless piece that celebrates traditional Indian craftsmanship.`,
    fabricDetails: {
      saree: "Silk",
      blouse: "Silk"
    },
    care: "Gentle hand wash recommended. Test colors before washing.",
    embroidery: "Traditional bandhani tie-dye patterns",
    deliveryType: "Ready to Wear",
    deliveryDays: "7-10 days",
    freeShipping: true,
    maxBustSize: "46 inches",
    customFitAvailable: true
  },
  {
    id: 404,
    name: "Pink Anarkali Suit",
    price: 17500,
    originalPrice: 21900,
    category: "anarkali",
    imageIndex: 6,
    material: "Silk",
    color: "Pink",
    occasions: ['wedding', 'party', 'engagement', 'cocktail', 'reception'],
    rating: 4.8,
    reviews: 25,
    stock: 4,
    image: "/images/anarkali/6.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15312",
    description: `Stunning pink silk anarkali suit perfect for the modern bride. The soft pink hue is romantic and flattering to all skin tones.

Features beautifully embroidered neckline and hemline with traditional zari work. The anarkali silhouette is graceful and timeless.

Includes matching churidar and dupatta for a complete ethnic ensemble.`,
    fabricDetails: {
      anarkali: "Silk",
      churidar: "Silk",
      dupatta: "Net Silk"
    },
    care: "Dry clean recommended.",
    embroidery: "Hand embroidered with zari and beads",
    deliveryType: "Made to Order",
    deliveryDays: "18-22 days",
    freeShipping: true,
    maxBustSize: "48 inches",
    customFitAvailable: true
  },
  {
    id: 405,
    name: "Cream Salwar Kameez Suit",
    price: 8500,
    originalPrice: 10600,
    category: "salwar-kameez",
    imageIndex: 3,
    material: "Georgette",
    color: "Cream",
    occasions: ['casual', 'party', 'festival', 'wedding', 'cocktail', 'reception'],
    rating: 4.7,
    reviews: 22,
    stock: 6,
    image: "/images/salwarkameez/3.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15178",
    description: `Elegant cream georgette salwar kameez suit for versatile ethnic wear. The cream color is neutral and works with any jewelry.

The lightweight georgette makes it comfortable for all-day wear. Simple embroidery adds elegance without being overwhelming.

Perfect for casual celebrations, family gatherings, and daily ethnic wear.`,
    fabricDetails: {
      kameez: "Georgette",
      salwar: "Georgette",
      dupatta: "Georgette"
    },
    care: "Hand wash or gentle machine wash.",
    embroidery: "Embroidered neckline and sleeves",
    deliveryType: "Ready to Wear",
    deliveryDays: "5-7 days",
    freeShipping: true,
    maxBustSize: "44 inches",
    customFitAvailable: false
  },
  {
    id: 406,
    name: "Golden Gharara Set",
    price: 18900,
    originalPrice: 23600,
    category: "gharara",
    imageIndex: 2,
    material: "Silk",
    color: "Golden",
    occasions: ['wedding', 'party', 'celebration', 'cocktail', 'reception'],
    rating: 4.8,
    reviews: 27,
    stock: 4,
    image: "/images/gharara/2.jpg",
    size: "M",
    itemCode: "LIKEADIVA-15567",
    description: `Absolutely stunning golden gharara set that shimmers with luxury. The gharara silhouette is fun and flowy, perfect for celebrations.

Made from premium silk with intricate hand embroidery featuring zari work and sequins. The golden color catches light beautifully.

Perfect for sangeet, mehendi, and wedding celebrations. A show-stopping piece that makes you the center of attention.`,
    fabricDetails: {
      kurta: "Silk",
      gharara: "Silk",
      dupatta: "Net Silk"
    },
    care: "Professional dry cleaning recommended.",
    embroidery: "Intricate hand embroidery with zari and sequins",
    deliveryType: "Made to Order",
    deliveryDays: "20-25 days",
    freeShipping: true,
    maxBustSize: "48 inches",
    customFitAvailable: true
  }
];
