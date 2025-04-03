const express = require("express");
const cors = require("cors");

// Load .env file
require("dotenv").config();

const app = express();
const port = process.env.LISTEN_PORT || 8989;

// Use json response
app.use(express.json());
app.use(cors());

// Index routes is here.
app.get("/", (req, res) => {
  console.log("Index page");
  res.send("It's index page");
});

app.listen(port, () => {
  console.log(`Sever is running on http://localhost:${port}`);
});
