import request from "supertest";
import app from "../src/app.js";
import prisma from "../src/utils/prismaClient.js";

const cleanTables = async () => {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
};

// describe("Post Insertion", () => {});

describe("Post Controller Integration", () => {
  it("Get empty recent posts", async () => {
    await cleanTables();
    const res = await request(app).get("/posts");
    expect(res.statusCode).toBe(204);
  });

  it("Get one post", async () => {});
});
