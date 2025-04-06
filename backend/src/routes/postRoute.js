import express from "express";
import {
  getRecentPosts,
  createPost,
  removePost,
  getPostDetail,
} from "../controllers/postController.js";

const postRouter = express.Router();

/**
 * @swagger
 * /posts/:
 *  get:
 *    summary: Get the recent content list
 */
postRouter.get("/", async (req, res) => {
  const posts = await getRecentPosts();
  console.log(posts);
  if (posts === null) {
    res.status(500).json({ message: "internal server error" });
  } else if (posts.length === 0) {
    res.sendStatus(204);
  } else {
    res.status(200).json(posts);
  }
});

/**
 * @swagger
 * /posts/:
 *  posts:
 *    summary: Create a new post
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              content:
 *                type: string
 *            required:
 *              - title
 *              - content
 *    responses:
 *      201:
 *        description: Returns an identification number for the new post
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: aBc1Q3q
 */
postRouter.post("/", async (req, res) => {
  console.log(req.body);
  // Where should be an user id? in body? in header? may depend on session control.
  const { title, summary, content } = req.body;
  const createdPost = await createPost({
    userId: 1,
    title: title,
    summary: summary,
    content: content,
  });
  if (createdPost === null) {
    // Have to define error codes.
    res.status(500).json({ message: "internal server error" });
  } else {
    res.status(201).json({ id: createdPost.publicId });
  }
});

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Remove the post
 */
postRouter.delete("/:id", async (req, res) => {
  // Need a return value?
  const removedPost = await removePost(req.body.id);
  if (removedPost === null) {
    res.status(500).json({ message: "internal server error" });
  } else {
    // 204: No Content
    res.sendStatus(204);
  }
});

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Post updated
 */
postRouter.put("/:id", function (req, res) {});

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post
 */
postRouter.get("/:id", async (req, res) => {
  const post = await getPostDetail(req.body.id);
  if (post === null) {
  } else {
    // How about big contents?
    res.status(200).json(post);
  }
});

export default postRouter;
