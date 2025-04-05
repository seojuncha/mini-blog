import {
  getRecentPosts,
  createPost,
  removePost,
  getPostDetail,
} from "../src/controllers/postController.js";
import prisma from "../src/utils/prismaClient.js";
import { nanoid } from "nanoid";

const testUserData = {
  publicId: nanoid(12),
  name: "dummy",
  email: "test@email.com",
};

const testFivePostsData = [
  { title: "title 1", content: "content 1" },
  { title: "title 2", content: "content 2" },
  { title: "title 3", content: "content 3" },
  { title: "title 4", content: "content 4" },
  { title: "title 5", content: "content 5" },
];

const test15PostsData = [
  { title: "title 1", content: "content 1" },
  { title: "title 2", content: "content 2" },
  { title: "title 3", content: "content 3" },
  { title: "title 4", content: "content 4" },
  { title: "title 5", content: "content 5" },

  { title: "title 6", content: "content 6" },
  { title: "title 7", content: "content 7" },
  { title: "title 8", content: "content 8" },
  { title: "title 9", content: "content 9" },
  { title: "title 10", content: "content 10" },

  { title: "title 11", content: "content 11" },
  { title: "title 12", content: "content 12" },
  { title: "title 13", content: "content 13" },
  { title: "title 14", content: "content 14" },
  { title: "title 15", content: "content 15" },
];

const cleanTables = async () => {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
};

const initOnlyUser = async () => {
  await cleanTables();
  return await prisma.user.create({
    data: testUserData,
  });
};

const initOneUserOnePost = async () => {
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

const initOneUserMultiplePosts = async (useBig = false) => {
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

describe("Create a post", () => {
  let testUser;
  beforeAll(async () => {
    testUser = await initOnlyUser();
  });

  it("create post without summary", async () => {
    const post = await createPost({
      userId: testUser.id,
      title: "test post title",
      content: "test contents",
    });
    console.log(post);
    expect(post).not.toBe(null);
  });

  it("create post with summary", async () => {
    const post = await createPost({
      userId: testUser.id,
      title: "test post title",
      summary: "test summary",
      content: "test contents",
    });
    console.log(post);
    expect(post).not.toBe(null);
  });
});

describe("Read a post", () => {
  let testUser, testPost;
  beforeAll(async () => {
    [testUser, testPost] = await initOneUserOnePost();
  });

  it("read one post", async () => {
    const post = await getPostDetail(testPost.publicId);
    // console.log(post);
    expect(post.id).toBe(testPost.id);
    expect(post.publicId).toBe(testPost.publicId);
  });
});

describe.only("Read multiple posts", () => {
  let testUser, testPosts;
  beforeAll(async () => {
    [testUser, testPosts] = await initOneUserMultiplePosts(true);
  });

  it("read default recent posts", async () => {
    // The number of default recent posts should be 10.
    const posts = await getRecentPosts();
    // console.log(posts);
    expect(posts.length).toBe(10);
  });
});

describe("Remove a post", () => {
  let testUser, testPost;
  beforeAll(async () => {
    [testUser, testPost] = await initOneUserOnePost();
  });

  it("remove one post", async () => {
    const removedPost = await removePost(testPost.publicId);
    expect(removedPost).toBeDefined();
    expect(removedPost).not.toBe(null);
  });
});
