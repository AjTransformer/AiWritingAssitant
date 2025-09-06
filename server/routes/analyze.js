import express from "express";
import axios from "axios";
const analyze = express.Router();


analyze.post("/", async(req,res)=>{
    const {sentence} = req.body;
    console.log("Incoming body:", req.body);  
    // if (!process.env.OPENAI_API_KEY) {
    //     return res.status(500).json({ error: "Missing OpenAI API key in environment." });
    // }

    // try{
    //     const response = await axios.post("https://api.openai.com/v1/chat/completions",{
    //         model:"gpt-3.5-turbo",
    //         messages:[{
    //                 role:"system",
    //                 content:"You are a helpful assistant that rephrases sentences. Only return the rephrased sentence without any additional comments and text"
    //             },
    //             {
    //                role:"user",
    //                content:`Rephrase the following sentence: ${sentence}` 
    //             }
    //         ],
    //         temperature:0.8,
    //         n:1,
    //         max_tokens:150,//Higher the token, higher the use of credits
    //         top_p:1,
    //         frequency_penalty:0,
    //         presence_penalty:0,
    //         stop:["\n"]
    //     },
    //     {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    //         }
    //     }
    // )
    // console.log(response.data);
    // const rephrasedSentence = response.data.choices.map((choice)=>{
    //     return choice.message.content;
    // })
    // res.json({
    //     "rephrasedSentence":rephrasedSentence
    // })
    // }catch(e){
    //     console.error("OpenAI API Error:", e.response?.status, e.response?.data || e.message);

    // const status = e.response?.status || 500;
    // const message = (status === 429) 
    //     ? "Too many requests — you're being rate limited by OpenAI." 
    //     : e.message;

    // return res.status(status).json({ error: { status, message } });
    // }
    try {
        const response = await axios.post("http://localhost:11434/api/chat", {
            model: "llama2:7b", // Change this to whatever model you've pulled via `ollama pull`
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that rephrases sentences. Only return the rephrased sentence in english without any additional comments or text."
                },
                {
                    role: "user",
                    content: `Rephrase the following sentence: ${sentence}`
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

export default analyze;