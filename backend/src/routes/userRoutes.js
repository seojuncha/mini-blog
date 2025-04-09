import { createUser, getUser } from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();

// user signup
userRouter.post("/signup", async (req, res) => {
  // Should be protected by HTTPS later
  const { name, email, password } = req.body;
  const newUser = await createUser({
    name: name,
    email: email,
    password: password,
  });
  if (newUser === null) {
    res.sendStatus(500);
  } else {
    // decision point: auto login? redirect to the login page?
    //  redirect!
    // res.redirect("/login");

    // debug only
    res.status(201).json(newUser);
  }
});

// user information including written posts
userRouter.get("/me", async (req, res) => {
  const user = await getUser();
  if (user) {
    res.status(200).json(user);
  }
});

export default userRouter;
