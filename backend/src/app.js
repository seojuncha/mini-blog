import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import postRouter from "./routes/postRoute.js";

import cors from "cors";

const app = express();

// Use json response
app.use(express.json());
app.use(cors());

// API document with Swagger
// console.log(JSON.stringify(swaggerSpec, null, 2));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/posts", postRouter);

app.use("/signup");

app.use("/login");

app.use("/logout");

// Test routing path
app.get("/", (req, res) => {
  console.log("Index page");
  res.send("It's index page");
});

export default app;
