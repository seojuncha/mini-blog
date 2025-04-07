import express from "express";
import { authenticate } from "../controllers/authController";

export default authRouter = express.Router();

// Login through email address
authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  authenticate(email, password, (arg) => {
    if (arg.success) {
      // what is this?
      req.session.success = "succes??";
      console.log(req.session);

      // test only now.
      res.sendStatus(200);
    } else {
      // test only now.
      res.sendStatus(401);
    }
  });
});

authRouter.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
