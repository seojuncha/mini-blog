import { createUser } from "../src/controllers/userController.js";
import prisma from "../src/utils/prismaClient.js";

describe("User creation test", () => {
  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  it("user test 1", async () => {
    const userPublicId = await createUser({
      name: "seojun",
      email: "hi@gmail.com",
    });
    expect(userPublicId).not.toBe(null);
  });
});
