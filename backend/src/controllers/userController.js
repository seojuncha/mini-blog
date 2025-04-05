import { nanoid } from "nanoid";
import prisma from "../utils/prismaClient.js";

// Called in user signup API
const createUser = async ({ pubId = nanoid(12), name, email }) => {
  try {
    return await prisma.user.create({
      data: {
        publicId: pubId,
        name: name,
        email: email,
      },
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getMyPosts = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posts: true,
      },
    });
    // console.log(user);
    return user.posts;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { createUser, getMyPosts };
