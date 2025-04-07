import express from "express";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import postRouter from "./routes/postRoutes.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  session({
    resave: false,
    saveUninitialized: false, // don't create session until something stored
    secret: "testauthsecret",
  })
);

// API document with Swagger
// console.log(JSON.stringify(swaggerSpec, null, 2));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

// Test routing path
app.get("/", (req, res) => {
  console.log("Index page");
  res.send("It's index page");
});

export default app;
