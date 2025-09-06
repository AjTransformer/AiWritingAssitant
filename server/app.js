import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import analyze from "./routes/analyze.js";
import spellChecker from "./routes/spellCheck.js";
import grammarChecker from "./routes/grammarCheck.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

// https://api.openai.com/v1/chat/completions

console.log("Loaded PORT from .env:", process.env.PORT);
// middlewares
app.use(cors()); // for cross origin
app.use(express.json());// for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use("/api/analyze", analyze);
app.use("/api/spellCheck", spellChecker);
app.use("/api/grammarCheck", grammarChecker);

app.get("/", (req, res) => {
  res.send("Server is up");
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});