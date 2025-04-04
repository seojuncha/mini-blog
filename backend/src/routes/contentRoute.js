const express = require("express");
const contentRouter = express.Router();

/**
 * @swagger
 * /content/:
 *  post:
 *    summary: Create a new post
 *    responses:
 *      200:
 *        description: Returns an identification number for the new post
 */
contentRouter.post("/", function (req, res) {
  res.json({ id: 1 });
});

/**
 * @swagger
 * /content/{id}:
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
contentRouter.put("/:id", function (req, res) {});

/**
 * @swagger
 * /content/{id}:
 *   get:
 *     summary: Get a post
 */
contentRouter.get("/:id", function (req, res) {});

/**
 * @swagger
 * /content/{id}:
 *   delete:
 *     summary: Remove the post
 */
contentRouter.delete("/:id", function (req, res) {});

/**
 * @swagger
 * /content/recent:
 *   get:
 *     summary: Get the recent content list
 */
contentRouter.get("/recent", function (req, res) {});

module.exports = contentRouter;
