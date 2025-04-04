import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import postRouter from "./routes/postRoute.js";

import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.LISTEN_PORT || 8989;

// Use json response
app.use(express.json());
app.use(cors());

// API document with Swagger
// console.log(JSON.stringify(swaggerSpec, null, 2));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/post", postRouter);

// First test routes for index
app.get("/", (req, res) => {
  console.log("Index page");
  res.send("It's index page");
});

app.listen(port, () => {
  console.log(`Sever is running on http://localhost:${port}`);
});
