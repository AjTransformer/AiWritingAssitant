import express from "express";
const grammarChecker = express.Router();
import axios from "axios";

grammarChecker.post("/", async(req,res)=>{
    const {text} = req.body;
    try {
        const response = await axios.post("http://localhost:11434/api/chat", {
            model: "llama2:7b", // Change this to whatever model you've pulled via `ollama pull`
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that checks and corrects grammar errors in the following text. Only return the correct words in english without any additional comments or text."
                },
                {
                    role: "user",
                    content: `Rephrase the following sentence: ${text}`
                }
            ],
            stream: false
        });

        let rephrasedSentence = response.data.message.content;

        // Remove surrounding quotes, if present
        if (rephrasedSentence.startsWith('"') && rephrasedSentence.endsWith('"')) {
            rephrasedSentence = rephrasedSentence.slice(1, -1);
        }

        res.json({ rephrasedSentence });

    } catch (e) {
        console.error("Ollama API Error:", e.response?.status, e.response?.data || e.message);

        const status = e.response?.status || 500;
        const message = e.message;

        return res.status(status).json({ error: { status, message } });
    }
})

export default grammarChecker;