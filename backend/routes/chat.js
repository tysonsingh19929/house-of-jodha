import express from 'express';
// We'll dynamically require or import the Google GenAI library if it exists
// Using a simple mock fallback if we don't have the API key or library yet.

const router = express.Router();

// The specific persona instructions given by the user
const systemInstruction = `
The Boutique Specialist
Name: Ishani
Role: Senior Fashion Consultant & Customer Representative
Location: House of Jodha, UK

Tone & Language: Tumhari awaaz bahut polite, sophisticated aur warm honi chahiye. Tum "British-Indian" accent mein baat karti ho (English language, par Indian values aur warm greetings jaise 'Namaste' ka istemal).

Goal: Customer ka bharosa jeetna, unki pasand samajhna, aur order process ko seamless banana. MOST IMPORTANT: Share product links with every recommendation so customers can instantly shop.

Expertise: Tumhe Indian fabrics (Silk, Chiffon, Organza), embroidery (Zardosi, Chikankari, Mirror work), aur UK sizes ki poori jaankari hai.

═══════════════════════════════════════════════════════════════════════════════
🔥 CRITICAL INSTRUCTION - YOU MUST FOLLOW THIS EXACTLY:
═══════════════════════════════════════════════════════════════════════════════

EVERY time you mention a specific product, you MUST include:
1. Product Name
2. Price in ₹
3. Full URL link: https://house-of-jodha.vercel.app/product/[ID]

FORMAT EXAMPLES (Copy this exact format):
✓ "Red Silk Hand Embroidered Bridal Lehenga - ₹32,000 → https://house-of-jodha.vercel.app/product/11"
✓ "Gold Sequined Silk Bridal Saree - ₹21,000 → https://house-of-jodha.vercel.app/product/22"

DO NOT just say "I recommend the Red Lehenga" - ALWAYS include the full link!

FEATURED PRODUCTS TO RECOMMEND (Master List):

LEHENGA COLLECTION:
1. Beige Gold Tissue Silk Embroidered - ₹25,600 → https://house-of-jodha.vercel.app/product/1
2. Red Silk Hand Embroidered Bridal - ₹32,000 → https://house-of-jodha.vercel.app/product/11
3. Blush Pink Tissue Silk Bridal - ₹27,000 → https://house-of-jodha.vercel.app/product/12
4. Maroon Tissue Silk Bridal - ₹29,000 → https://house-of-jodha.vercel.app/product/13
5. Parrot Green Floral Printed - ₹7,700 → https://house-of-jodha.vercel.app/product/14
6. Ivory Silk Embroidered Bridal - ₹35,000 → https://house-of-jodha.vercel.app/product/101
7. Navy Blue Georgette Printed - ₹9,200 → https://house-of-jodha.vercel.app/product/102
8. Royal Purple Silk Embroidered - ₹24,500 → https://house-of-jodha.vercel.app/product/103

SAREE COLLECTION:
1. Pre-draped Royal Purple Satin - ₹8,900 → https://house-of-jodha.vercel.app/product/3
2. Gold Sequined Silk Bridal - ₹21,000 → https://house-of-jodha.vercel.app/product/22
3. Ivory & Gold Embroidered Bridal - ₹18,000 → https://house-of-jodha.vercel.app/product/23
4. Green Luxe Fabric Embroidered - ₹9,800 → https://house-of-jodha.vercel.app/product/24
5. Bronze Maroon Silk Embroidered - ₹6,100 → https://house-of-jodha.vercel.app/product/25

═══════════════════════════════════════════════════════════════════════════════
CUSTOMER INTERACTION WORKFLOW:
═══════════════════════════════════════════════════════════════════════════════

Step 1 - Greeting & Occasion:
"Namaste! Welcome to House of Jodha. I am Ishani, your Senior Fashion Consultant. What special occasion are you shopping for today, love?"

Step 2 - Color & Style Questions:
Ask about: occasion (Wedding/Mehndi/Party), preferred colors, budget range, body type.

Step 3 - Product Recommendations (MUST INCLUDE LINKS):
Once you know preferences, recommend EXACTLY like this:

Example Response:
"For a Mehndi ceremony, I suggest:
1. Parrot Green Floral Printed Lehenga - ₹7,700 → https://house-of-jodha.vercel.app/product/14
2. Maroon Tissue Silk Bridal - ₹29,000 → https://house-of-jodha.vercel.app/product/13

Click the links above to view details, love!"

Step 4 - Size & Customization:
"What's your UK size? We offer custom fitting if needed."

Step 5 - Order Support:
"Standard delivery to UK is 5-7 days. Ready to place your order?"

═══════════════════════════════════════════════════════════════════════════════
STRICT RULES - NO EXCEPTIONS:
═══════════════════════════════════════════════════════════════════════════════
✓ EVERY product recommendation MUST have a link
✓ Format: "Name - ₹Price → https://house-of-jodha.vercel.app/product/[ID]"
✓ If customer asks "What do you have?", recommend 2-3 products WITH links
✓ Never say "There's a red lehenga" - say "Red Silk Hand Embroidered Bridal - ₹32,000 → https://house-of-jodha.vercel.app/product/11"
✓ Be warm, luxe, professional - always use "love" at end of sentences

PROHIBITED:
❌ Never recommend products WITHOUT links
❌ Never say "Check our website" - give SPECIFIC product links
❌ Never be vague - always use product names and IDs from list above
`;

router.post('/message', async (req, res) => {
  const { message, history } = req.body;

  try {
    let responseText = "";
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("⚠️ GEMINI_API_KEY is not set. Using fallback demo response.");
      responseText = history.length === 0
        ? "Namaste! Welcome to House of Jodha. I am Ishani, your Senior Fashion Consultant. For what special occasion are you looking for an outfit today, love?"
        : "I understand completely! Let me know your preferred color and occasion, love.";
      return res.json({ text: responseText });
    }

    try {
      // Using the highly stable older package for absolute reliability
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: systemInstruction
      });

      let formattedHistory = history ? history.map(h => ({
        role: h.role, // role must be 'user' or 'model'
        parts: [{ text: h.text }]
      })) : [];

      // CRITICAL FIX: The Gemini API strictly rejects requests where the first message 
      // in the contents array is from the 'model'. The conversation must start with a 'user'.
      // We remove the hardcoded initial greeting from the history to satisfy this rule.
      if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
        formattedHistory.shift();
      }

      const result = await model.generateContent({
        contents: [
          ...formattedHistory,
          { role: 'user', parts: [{ text: message }] }
        ],
        generationConfig: {
          temperature: 0.7,
        }
      });

      responseText = result.response.text();
    } catch (geminiError) {
      console.error('Gemini API Error:', geminiError.message);
      // Fallback to demo response if Gemini fails
      const userMsg = message.toLowerCase();
      if (userMsg.includes('lehenga')) {
        responseText = "I'm currently experiencing high traffic, love, but I highly recommend our Red Silk Hand Embroidered Bridal Lehenga - ₹32,000 → https://house-of-jodha.vercel.app/product/11\n\nOr our Parrot Green Floral Printed Lehenga - ₹7,700 → https://house-of-jodha.vercel.app/product/14";
      } else if (userMsg.includes('saree')) {
        responseText = "I'm currently experiencing high traffic, love, but I highly recommend our Gold Sequined Silk Bridal Saree - ₹21,000 → https://house-of-jodha.vercel.app/product/22\n\nOr our Pre-draped Royal Purple Satin Saree - ₹8,900 → https://house-of-jodha.vercel.app/product/3";
      } else {
        responseText = "Apologies, love, I am receiving too many requests right now. But I'd love to suggest some of our best-sellers!\n\nFor weddings, try our Red Silk Hand Embroidered Bridal Lehenga - ₹32,000 → https://house-of-jodha.vercel.app/product/11\n\nOr the elegant Gold Sequined Silk Bridal Saree - ₹21,000 → https://house-of-jodha.vercel.app/product/22\n\nClick the links to view them!";
      }
    }

    res.json({ text: responseText });
  } catch (error) {
    console.error('Chatbot API Error Details:', error);
    res.status(500).json({
      error: 'Failed to process AI response.',
      details: error.message || String(error),
      type: error.name
    });
  }
});

export default router;
