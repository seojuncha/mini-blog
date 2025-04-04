const express = require("express");
const contentRouter = require("./routes/contentRoute");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const cors = require("cors");

// Load .env file
require("dotenv").config();

const app = express();
const port = process.env.LISTEN_PORT || 8989;

// Use json response
app.use(express.json());
app.use(cors());

// API document with Swagger
// console.log(JSON.stringify(swaggerSpec, null, 2));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/content", contentRouter);

// First test routes for index
app.get("/", (req, res) => {
  console.log("Index page");
  res.send("It's index page");
});

app.listen(port, () => {
  console.log(`Sever is running on http://localhost:${port}`);
});
