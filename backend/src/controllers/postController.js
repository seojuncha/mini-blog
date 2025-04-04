import { nanoid } from "nanoid";
import prisma from "../utils/prismaClient.js";

const createPost = async (title, content) => {
  try {
    const Post = await prisma.post.create({
      data: {
        id: nanoid(12),
        title: title,
        content: content,
      },
    });
    return Post.id;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { createPost };
