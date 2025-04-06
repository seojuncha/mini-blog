import { nanoid } from "nanoid";
import prisma from "../utils/prismaClient.js";

/**
 * Unauthorized user part
 * - Anonymous user must be able to read any posts.
 */

// will be loaded in main page to show all users's posts.
// NOTE:
//  there would be a lot of hit. is it good to use sql?
//  Cache? Users have more chance to click the posts presented in the first page,
//  should be loaded fast!
const getRecentPosts = async (limit = 10) => {
  const posts = await prisma.post.findMany({
    orderBy: { createDate: "desc" },
    take: limit,
    select: {
      title: true,
      content: true,
      tags: true,
      createDate: true,
    },
  });
  // TODO: Move to converter.
  posts.map((post) => {
    post.createDate = new Date(post.createDate).toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });
  });
  return posts;
};

const getPostSummary = async (pubId) => {
  return null;
};

// Called If user clicks the post summary(card?)
// Unauthorized user also can watch.
const getPostDetail = async (pubId) => {
  return await prisma.post.findUnique({
    where: { publicId: pubId },
  });
};

/**
 *  Authorized user part.
 */

const createPost = async ({
  userId,
  pubId = nanoid(12),
  title,
  summary,
  content,
}) => {
  try {
    let selfSummary = summary;
    if (selfSummary === undefined) {
      selfSummary = content.substring(0, 60);
    }
    return await prisma.post.create({
      data: {
        publicId: pubId,
        title: title,
        summary: selfSummary,
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

const removePost = async (pubId) => {
  return await prisma.post.delete({
    where: {
      publicId: pubId,
    },
  });
};

export { getRecentPosts, getPostDetail, createPost, removePost };
