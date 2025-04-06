import {
  testUserData,
  testFivePostsData,
  test15PostsData,
} from "./testData.js";
import prisma from "../src/utils/prismaClient.js";
import { nanoid } from "nanoid";

const cleanTables = async () => {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
};

export const initOnlyUser = async () => {
  await cleanTables();
  return await prisma.user.create({
    data: testUserData,
  });
};

export const initOneUserOnePost = async () => {
  await cleanTables();
  const user = await prisma.user.create({ data: testUserData });
  const post = await prisma.post.create({
    data: {
      publicId: nanoid(12),
      title: testFivePostsData[0].title,
      content: testFivePostsData[0].content,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  return [user, post];
};

export const initOneUserMultiplePosts = async (useBig = false) => {
  await cleanTables();
  const user = await prisma.user.create({ data: testUserData });
  let posts = [];

  if (useBig) {
    for (const testPost of test15PostsData) {
      posts.push(
        await prisma.post.create({
          data: {
            publicId: nanoid(12),
            title: testPost.title,
            content: testPost.content,
            author: {
              connect: {
                id: user.id,
              },
            },
          },
        })
      );
    }
  } else {
    for (const testPost of testFivePostsData) {
      posts.push(
        await prisma.post.create({
          data: {
            publicId: nanoid(12),
            title: testPost.title,
            content: testPost.content,
            author: {
              connect: {
                id: user.id,
              },
            },
          },
        })
      );
    }
  }

  // Warning: Promise.all is not proper to test 'order by' because all of createTime properties are same.
  // const results = await Promise.all(
  //   testPosts.map((post) => createPost(post))
  // );

  return [user, posts];
};
