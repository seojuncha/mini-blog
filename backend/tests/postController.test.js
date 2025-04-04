import { createPost } from "../src/controllers/postController.js";
import prisma from "../src/utils/prismaClient.js";

describe("Post creation test", () => {
  // Create one dummy user.
  beforeAll(async () => {});

  afterAll(async () => {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
  });

  it("test 1", () => {
    expect(2 + 2).toBe(4);
  });
});
