import { createPost, getPost } from "../src/controllers/postController.js";
import { getMyPosts } from "../src/controllers/userController.js";
import prisma from "../src/utils/prismaClient.js";
import { nanoid } from "nanoid";

describe("Basic CRUD for post", () => {
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
  });

  let post;
  it("create post", async () => {
    post = await createPost({
      userId: dummyUser.id,
      title: "test post title",
      content: "test contents",
    });
    // console.log(post);
    expect(post).not.toBe(null);
  });

  it("get post", async () => {
    const readPost = await getPost(post.publicId);
    expect(readPost.id).toBe(post.id);
    expect(readPost.publicId).toBe(post.publicId);
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
