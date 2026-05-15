import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Insights API
  app.post("/api/ai/analyze-fraud", async (req, res) => {
    try {
      const { transactionData } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.json({
          analysis: "AI Analysis is currently in demo mode. Please configure GEMINI_API_KEY for real-time insights.",
          riskScore: 78,
          recommendation: "Flag for manual review due to geolocation anomaly.",
          reasoning: [
            "Transaction origin (Ip-192.168.1.1) deviates from typical user patterns.",
            "Purchase amount exceeds average by 340%.",
            "Mismatched billing and shipping information."
          ]
        });
      }

      const genAI = new GoogleGenAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Act as a senior fraud analyst at JPMorgan. Analyze this transaction and return a JSON object with: 
      - analysis (string)
      - riskScore (number 0-100)
      - recommendation (string)
      - reasoning (array of strings)
      
      Transaction: ${JSON.stringify(transactionData)}`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      // Simple parse attempt or return as is
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          res.json(JSON.parse(jsonMatch[0]));
        } else {
          res.json({ analysis: text, riskScore: 50, recommendation: "Manual Review", reasoning: [] });
        }
      } catch (e) {
        res.json({ analysis: text, riskScore: 50, recommendation: "Manual Review", reasoning: [] });
      }
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "Failed to analyze fraud" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
