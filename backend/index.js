const express = require("express");
const cors = require("cors");
const { getAllOffers } = require("./providers");


const app = express();

app.use(cors());          // ← added
app.use(express.json());  // ← added

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});

app.post("/test", (req, res) => {
  res.json({
    success: true,
    message: "API working",
    body: req.body
  });
});

app.post("/offers", async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "amount is required" });
  }

  const offers = await getAllOffers(amount);
  res.json(offers);
});
