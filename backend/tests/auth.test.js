import { cleanTables } from "./utils.js";
import { testUserData } from "./testData.js";
import { authenticate } from "../src/controllers/authController.js";
import app from "../src/app.js";

import request from "supertest";

describe("[normal case] login", () => {
  let signupUser;
  beforeEach(async () => {
    await cleanTables();
    // signup first
    const payload = {
      name: testUserData[0].name,
      email: testUserData[0].email,
      password: testUserData[0].password,
    };
    const res = await request(app).post("/users/signup").send(payload);
    if (res.statusCode === 201) {
      signupUser = res.body;
      // console.log(signupUser);
    } else {
      console.log(res.statusCode);
    }
  });

  it("[contorller] authenticate", async () => {
    await authenticate(signupUser.email, signupUser.password, function (arg) {
      console.log(arg);
      expect(arg.success).toBe(true);
    });
  });

  it("[api] login", async () => {
    const payload = {
      name: signupUser.name,
      email: signupUser.email,
      password: signupUser.password,
    };
    const res = await request(app).post("/auth/login").send(payload);
    expect(res.statusCode).toBe(200);
  });
});

describe("[exception case] login", () => {
  beforeEach(async () => {
    await cleanTables();
  });

  it("[api] not registered user", async () => {
    const payload = {
      email: "none",
      password: "password",
    };
    const res = await request(app).post("/auth/login").send(payload);
    expect(res.statusCode).toBe(401);
  });
});
