import { nanoid } from "nanoid";
import prisma from "../utils/prismaClient.js";

// Called in user registration API
const createUser = async ({ name, email }) => {
  try {
    const User = await prisma.user.create({
      data: {
        publicId: nanoid(12),
        name: name,
        email: email,
      },
    });
    return User.publicId;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { createUser };
