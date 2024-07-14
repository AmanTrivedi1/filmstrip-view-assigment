const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const path = require("path");
const templates = require("../backend/data/templates.json");

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/templates", (req, res) => {
  res.json(templates);
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});