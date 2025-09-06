import express from "express";
const spellChecker = express.Router();
import axios from "axios";

spellChecker.post("/", async(req,res)=>{
    const {word} = req.body;
    console.log("Incoming body:", req.body);  
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: "Missing OpenAI API key in environment." });
    }
    try {
        const response = await axios.post("http://localhost:11434/api/chat", {
            model: "llama2:7b", // Change this to whatever model you've pulled via `ollama pull`
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that checks and corrects spelling errors in the following text. Only return the correct words in English without any additional comments or text."
                },
                {
                    role: "user",
                    content: `Correct the spelling of this word: ${word}`
                }
            ],
            stream: false
        });

        let rephrasedWord = response.data.message.content;

        // Remove surrounding quotes, if present
        if (rephrasedWord.startsWith('"') && rephrasedWord.endsWith('"')) {
            rephrasedWord = rephrasedWord.slice(1, -1);
        }

        res.json({ rephrasedWord });

    } catch (e) {
        console.error("Ollama API Error:", e.response?.status, e.response?.data || e.message);

        const status = e.response?.status || 500;
        const message = e.message;

        return res.status(status).json({ error: { status, message } });
    }
})

export default spellChecker;