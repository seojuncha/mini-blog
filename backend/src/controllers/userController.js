import { nanoid } from "nanoid";
import prisma from "../utils/prismaClient.js";
import bcrypt from "bcrypt";

// Called in user signup API
const createUser = async ({ pubId = nanoid(12), name, email, password }) => {
  // Error check then,

  // TODO: Need to check generating different hashed password for every same plain password.
  //       => Done, users.test.js >> Test Suite [3]
  const hashedPassword = await bcrypt.hash(password, 10);

  // Duplicating email raises an exception(PrismaClientKnownRequestError)
  try {
    const user = await prisma.user.create({
      data: {
        publicId: pubId,
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (err) {
    // console.log(err);
    return null;
  }
};

const getUser = async (pubId) => {
  return await prisma.user.findUnique({
    where: {
      publicId: pubId,
    },
    include: {
      posts: true,
    },
  });
};

export { createUser, getUser };
