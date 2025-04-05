import { createUser } from "../src/controllers/userController.js";
import prisma from "../src/utils/prismaClient.js";

beforeAll(async () => {
  await prisma.user.deleteMany();
});

describe("Basic CRUD for user", () => {
  let testUserList = [];
  let newUser;
  const duplicatedEmail = "hi@gmail.com";

  it("create the first user", async () => {
    newUser = await createUser({
      name: "seojun",
      email: duplicatedEmail,
    });
    console.log(newUser);
    testUserList.push(newUser);

    expect(newUser).toBeDefined();
    expect(newUser).not.toBe(null);
  });

  it("same name test", async () => {
    const user = await createUser({
      name: newUser.name,
      email: "hello@gmail.com",
    });
    expect(user).not.toBe(null);
    testUserList.push(user);
  });

  it("same email test", async () => {
    const user = await createUser({
      name: "jack",
      email: duplicatedEmail,
    });
    expect(user).toBe(null);
  });

  afterAll(() => {
    console.log(testUserList);
    testUserList.forEach((user) => {
      console.log(user.publicId);
    });
  });
});

describe("User related post", () => {
  let dummyUser;
  beforeAll(async () => {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    dummyUser = await prisma.user.create({
      data: {
        publicId: nanoid(12),
        name: "dummy",
        email: "test@email.com",
      },
    });

    const post1 = await createPost({
      userId: dummyUser.id,
      title: "test post title 1",
      content: "test contents",
    });
    // console.log(post1);

    const post2 = await createPost({
      userId: dummyUser.id,
      title: "test post title 2",
      content: "test contents",
    });
    // console.log(post2);
  });

  it("get all posts for user", async () => {
    const myPosts = await getMyPosts(dummyUser.id);
    expect(myPosts.length).toBe(2);
  });
});
