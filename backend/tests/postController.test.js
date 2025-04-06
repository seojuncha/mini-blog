import {
  getRecentPosts,
  createPost,
  removePost,
  getPostDetail,
} from "../src/controllers/postController.js";
import {
  initOnlyUser,
  initOneUserOnePost,
  initOneUserMultiplePosts,
} from "./utils.js";

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

describe("Read multiple posts", () => {
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
