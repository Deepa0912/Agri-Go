const express = require('express');
const router = express.Router();

const SYSTEM_PROMPT = `You are AgriBot, an expert AI Agronomist, Soil Specialist, and Plant Pathologist assisting farmers and agricultural professionals on the Agri-Go Smart Agriculture Platform. 
Your goal is to provide accurate, practical, and easy-to-follow advice regarding:
- Crop disease diagnosis and remedies (both organic/biological and chemical).
- Irrigation scheduling, evapotranspiration (ET0), and water conservation.
- Soil health, N-P-K nutrient balancing, and fertilizer application timing.
- Pest management and weather-based crop risk mitigation.

Keep your tone friendly, professional, encouraging, and clear. Use bullet points and bold text where helpful for readability.`;

// POST /api/chat
router.post('/', async (req, res) => {
  try {
    const { message, history = [], userApiKey } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: "Please provide a valid message." });
    }

    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback expert smart response when API key is not configured yet
      const fallbackResponse = generateSmartFallback(message);
      return res.json({
        success: true,
        reply: fallbackResponse,
        source: "agronomic-knowledge-engine",
        requiresApiKey: true,
        note: "Add your Gemini API key in the Chatbot settings header or server .env to enable real-time Gemini AI capabilities!"
      });
    }

    // Call Google Gemini API endpoint (gemini-3.6-flash)
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

    // Format conversation history for Gemini API API payload
    const contents = [
      {
        role: "user",
        parts: [{ text: `System Instruction: ${SYSTEM_PROMPT}` }]
      },
      {
        role: "model",
        parts: [{ text: "Understood! I am AgriBot, your expert AI Agronomist ready to assist with crop diseases, irrigation, NPK fertilizers, and farm management." }]
      }
    ];

    // Append prior chat history if provided
    history.forEach(item => {
      if (item.sender === 'user') {
        contents.push({ role: 'user', parts: [{ text: item.text }] });
      } else if (item.sender === 'bot') {
        contents.push({ role: 'model', parts: [{ text: item.text }] });
      }
    });

    // Append current user message
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await fetch(geminiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return res.status(400).json({
        success: false,
        message: data.error.message || "Gemini API request failed. Please check your API key.",
        requiresApiKey: true
      });
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I couldn't process that query. Please try rephrasing.";

    return res.json({
      success: true,
      reply: replyText,
      source: "gemini-1.5-flash",
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Chat endpoint error:", error);
    res.status(500).json({
      success: false,
      message: "Server error handling chatbot request.",
      error: error.message
    });
  }
});

// Fallback response engine for instant answers before key entry
function generateSmartFallback(query) {
  const q = query.toLowerCase();

  if (q.includes('early blight') || q.includes('tomato')) {
    return `### 🍅 Tomato Early Blight Agronomic Advice
**Diagnosis:** Caused by *Alternaria solani*, characterized by concentric 'bullseye' brown spots on lower leaves with yellow halos.

**Immediate Actions:**
1. **Prune Lower Leaves:** Cut off infected leaves up to 12 inches from soil level to stop spore splash.
2. **Organic Spray:** Apply Copper Octanoate or Neem Oil solution (2 tbsp/gal) early morning every 7 days.
3. **Chemical Remedy:** Spray Chlorothalonil or Mancozeb fungicide.
4. **Water Management:** Switch to drip irrigation; avoid wet leaves.`;
  }

  if (q.includes('npk') || q.includes('fertilizer') || q.includes('nitrogen')) {
    return `### 🌾 N-P-K Nutrient Management Guide
- **Nitrogen (N):** Drives vegetative foliage growth. Best applied in split doses (e.g. at planting and 30 days after).
- **Phosphorus (P):** Essential for root establishment and flower/fruit set. Apply early near plant root line (e.g. DAP).
- **Potassium (K):** Enhances disease resistance, drought tolerance, and grain filling (e.g. MOP).

*Tip:* Use the **Irrigation & Fertilizer** tab in Agri-Go to calculate exact kg/acre needs for your soil type!`;
  }

  if (q.includes('water') || q.includes('irrigation') || q.includes('drip')) {
    return `### 💧 Irrigation Best Practices
- **Clay Soil:** Retains moisture well. Irrigate deeply every 3-4 days to prevent root compaction.
- **Sandy Soil:** High drainage. Irrigate in shorter, twice-daily drip cycles to stop nutrient leaching.
- **Evapotranspiration (ET0):** On hot humid days (28°C+, UV 7+), increase water volume by 15-20%.`;
  }

  return `### 🌱 AgriBot Agronomic Assistant
Thank you for your question! I can help you with:
- **Crop Disease Prevention & Remedies** (Organic & Chemical)
- **Soil Fertility & NPK Calculations**
- **Irrigation Schedules & Water Conservation**
- **Weather Risk Mitigation**

*Note:* You can enter your **Gemini API Key** in the chatbot header settings (⚙️ icon) to unlock real-time generative AI answers powered by Google Gemini!`;
}

module.exports = router;
