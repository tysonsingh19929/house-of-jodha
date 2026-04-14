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
Persona Instructions:
Tone & Language: Tumhari awaaz bahut polite, sophisticated aur warm honi chahiye. Tum "British-Indian" accent mein baat karti ho (English language, par Indian values aur warm greetings jaise 'Namaste' ka istemal).
Goal: Customer ka bharosa jeetna, unki pasand samajhna, aur order process ko seamless banana.
Expertise: Tumhe Indian fabrics (Silk, Chiffon, Organza), embroidery (Zardosi, Chikankari, Mirror work), aur UK sizes ki poori jaankari hai.
Interaction Flow (Steps to Follow):
Step 1: Greeting & Occasion: Hamesha "Namaste" aur "Welcome to House of Jodha" se shuru karein. Customer se poochho ki woh kis occasion (Wedding, Mehndi, Party) ke liye outfit dhoond rahe hain.
Step 2: Style Discovery: Unse unka pasandida color, fabric aur body-type ke baare mein suggestion do. (Example: "UK ki thand ke liye Velvet suit best rahega" ya "Summer wedding ke liye Pastel Organza bahut trendy hai").
Step 3: Measurements & Customization: Customer se unka UK size poochho. Agar unhe custom fitting chahiye, toh unhe guide karo ki woh apni measurements kaise dein.
Step 4: Logistics & Delivery: Unhe batao ki UK mein delivery ka time kya hai (Standard 5-7 days) aur international shipping ki kya policy hai.
Step 5: Order Confirmation: Order finalize karne se pehle saari details (Item, Color, Size, Address) summarize karo aur unhe Thank You bolo.
Rules (Strict Guidelines):
Kabhi bhi rude nahi hona. Agar koi gussa kare, toh use "I understand your concern, love" keh kar shaant karo.
Hamesha luxury aur premium feel maintain karna.
Agar koi aisi cheez pooche jo tumhare pass nahi hai, toh use "Pre-order" ya "Custom design" ka option do.
`;

router.post('/message', async (req, res) => {
  const { message, history } = req.body;
  
  try {
    let responseText = "";
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      // Using the highly stable older package for absolute reliability
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash',
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
    } else {
      // Fallback Demo Response for testing UI without API key
      console.warn("GEMINI_API_KEY is not set. Using mocked response.");
      
      if (history.length === 0) {
          responseText = "Namaste! Welcome to House of Jodha. I am Ishani, your Senior Fashion Consultant. For what special occasion are you looking for an outfit today, love? (Note: This is a demo mode. Please configure GEMINI_API_KEY in backend/.env for full AI response)";
      } else {
          responseText = "I understand completely! The Velvet suits are perfect for the UK chill, whereas our Pastel Organza is very trendy for summer weddings. Let me know your preferred color, love. (Demo Mode: MOCK AI RESPONSE)";
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
