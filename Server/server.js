const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = 4000;

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxPIOyZ7SAZ1LA5rPD0Gfn3PTvWLPWmz5XnmFgV53Ni44sHrar6VaaBTvsvMJZ3ua2o/exec";

app.use(cors());
app.use(express.json());

app.post("/send-offers", async (req, res) => {
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google Script Error: ${errorText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
