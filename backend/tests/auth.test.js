import { cleanTables } from "./utils.js";
import { testUserData } from "./testData.js";
import { authenticate } from "../src/controllers/authController.js";
import app from "../src/app.js";

import request from "supertest";

describe("[normal case] login", () => {
  let singupUser;
  beforeEach(async () => {
    // signup first
    const payload = {
      name: testUserData[0].name,
      email: testUserData[0].email,
      password: testUserData[0].password,
    };
    const res = await request(app).post("/users/signup").send(payload);
    if (res.statusCode === 201) {
    }
  });

  it("[contorller] authenticate", async () => {
    await authenticate("testemail", "testpassword", function (arg) {
      console.log(arg);
    });
  });
});

describe("[exception case] login", () => {
  it("[api] not registered user", async () => {
    const payload = {
      email: "none",
      password: "password",
    };
    const res = await request(app).post("/auth/login").send(payload);
    expect(res.statusCode).toBe(401);
  });
});
