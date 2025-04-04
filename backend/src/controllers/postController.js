import { nanoid } from "nanoid";
import prisma from "../utils/prismaClient.js";

const createPost = async (userId, title, content) => {
  try {
    const post = await prisma.post.create({
      data: {
        publicId: nanoid(12),
        title: title,
        content: content,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return post.publicId;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getPostSummary = async (postPublicId) => {
  return null;
};

const getPost = async (postPublicId) => {
  return null;
};

const removePost = async () => {
  return null;
};

const addComment = async () => {
  return null;
};

export { createPost, removePost, addComment };
