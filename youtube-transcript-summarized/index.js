import http from "http";
import express from "express";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
import { log as print } from "console";
import textrank from "textrank-node";

app.use(express.static(path.join(__dirname, "public")));

app.get("/summarize", async (req, res) => {
  print("summarizing...");
  res.setHeader("Content-Type", "text/plain");
  const text = req.query.text;
  print(`Transcript: ${text}`);
  let summarizer = new textrank();
  let summrized = summarizer.summarize(text, 5);
  print("=================================================");
  print(`Summary: ${summrized}`);
  res.end(summrized);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
