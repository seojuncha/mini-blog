import express from "express";
import { authenticate } from "../controllers/authController";

export default authRouter = express.Router();

// Login through email address
authRouter.post("/login", (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  console.log("try to login:", name);
  authenticate(email, password, (arg) => {
    // NOTE: 'success' is just user defined property in req.session
    req.session.success = arg.success;
    if (arg.success) {
      req.session.regenerate(() => {
        req.session.userid = arg.publicId;
      });
      res.sendStatus(200);
    } else {
      req.session.err = arg.err;
      res.send(401).json(req.session.err);
    }
  });
});

authRouter.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
