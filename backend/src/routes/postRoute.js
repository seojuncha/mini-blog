import express from "express";
import { createPost } from "../controllers/postController.js";

const postRouter = express.Router();

/**
 * @swagger
 * /post/:
 *  post:
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
 *      200:
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
  const { title, content } = req.body;
  const postId = await createPost(title, content);
  if (postId === null) {
    res.status(500).json({ message: "error" });
  } else {
    res.status(201).json({ id: postId });
  }
});

/**
 * @swagger
 * /post/{id}:
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
 * /post/{id}:
 *   get:
 *     summary: Get a post
 */
postRouter.get("/:id", function (req, res) {});

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Remove the post
 */
postRouter.delete("/:id", function (req, res) {});

/**
 * @swagger
 * /post/recent:
 *   get:
 *     summary: Get the recent content list
 */
postRouter.get("/recent", function (req, res) {});

export default postRouter;
