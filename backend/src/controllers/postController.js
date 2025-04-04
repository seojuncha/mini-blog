import { nanoid } from "nanoid";
import prisma from "../utils/prismaClient.js";

const createPost = async ({
  userId,
  postPubId = nanoid(12),
  title,
  content,
}) => {
  try {
    return await prisma.post.create({
      data: {
        publicId: postPubId,
        title: title,
        content: content,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getPostSummary = async (postPublicId) => {
  return null;
};

const getPost = async (postPubId) => {
  try {
    return await prisma.post.findUnique({
      where: { publicId: postPubId },
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

const removePost = async () => {
  return null;
};

export { createPost, getPost, removePost };
