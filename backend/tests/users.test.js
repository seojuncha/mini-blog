import { createUser } from "../src/controllers/userController.js";
import { cleanTables } from "./utils.js";
import { testUserData } from "./testData.js";
import app from "../src/app.js";

import request from "supertest";

describe("[normal case] create", () => {
  beforeEach(async () => {
    await cleanTables();
  });

  it("[1][controller] create an user", async () => {
    const user = await createUser({
      name: testUserData[0].name,
      email: testUserData[0].email,
      password: testUserData[0].password,
    });
    // console.log(user);
    expect(user).toBeDefined();
    expect(user).not.toBe(null);
  });

  it("[2][api] create an user", async () => {
    const payload = {
      name: testUserData[0].name,
      email: testUserData[0].email,
      password: testUserData[0].password,
    };
    const res = await request(app).post("/users/signup").send(payload);
    expect(res.statusCode).toBe(201);
  });

  it("[3][controller] don't allow same hash password", async () => {
    const samePassword = testUserData[0].password;
    const firstUser = await createUser({
      name: testUserData[0].name,
      email: testUserData[0].email,
      password: samePassword,
    });
    const secondUser = await createUser({
      name: testUserData[1].name,
      email: testUserData[1].email,
      password: samePassword,
    });
    expect(firstUser.password).not.toBe(secondUser.password);
  });
});

describe("[exceptional case] create", () => {
  beforeEach(async () => {
    await cleanTables();
  });

  it("[1][controller] dulicate email", async () => {
    const user = await createUser({
      name: testUserData[1].name,
      email: testUserData[1].email,
      password: testUserData[1].password,
    });
    const errorUser = await createUser({
      name: testUserData[2].name,
      email: testUserData[2].email,
      password: testUserData[2].password,
    });
    expect(user).not.toBe(null);
    expect(errorUser).toBe(null);
  });

  it("[2][api] missing name", async () => {
    const payload = {
      email: testUserData[0].email,
      password: testUserData[0].password,
    };
    const res = await request(app).post("/users/signup").send(payload);
    expect(res.statusCode).toBe(500);
  });
});

// describe("Get an user", () => {
//   let dummyUser;
//   beforeAll(async () => {
//     await prisma.post.deleteMany();
//     await prisma.user.deleteMany();

//     dummyUser = await prisma.user.create({
//       data: {
//         publicId: nanoid(12),
//         name: "dummy",
//         email: "test@email.com",
//       },
//     });

//     const post1 = await createPost({
//       userId: dummyUser.id,
//       title: "test post title 1",
//       content: "test contents",
//     });
//     // console.log(post1);

//     const post2 = await createPost({
//       userId: dummyUser.id,
//       title: "test post title 2",
//       content: "test contents",
//     });
//     // console.log(post2);
//   });

//   it("get all posts for user", async () => {
//     const myPosts = await getMyPosts(dummyUser.id);
//     expect(myPosts.length).toBe(2);
//   });
// });
