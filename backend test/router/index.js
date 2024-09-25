const express = require("express");
const ControllerMember = require("../controllers/member");
const ControllerBook = require("../controllers/book");
const ControllerBorrow = require("../controllers/borrow");
const router = express.Router();

/**
 * @swagger
 * /api/readMember:
 *   get:
 *     summary: Read all members
 *     responses:
 *       200:
 *         description: Success to read all members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   code:
 *                     type: string
 *                   name:
 *                     type: string
 *                   penalty:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   Borrows:
 *                     type: integer
 *                     description: Number of books borrowed by the member
 */

router.get("/readMember", ControllerMember.readMember);

/**
 * @swagger
 * /api/readBook:
 *   get:
 *     summary: Read all books
 *     responses:
 *       200:
 *         description: Success to read all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   code:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   stock:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   Borrows:
 *                     type: integer
 *                     description: Number of times the book has been borrowed
 */

router.get("/readBook", ControllerBook.readAllBook);

/**
 * @swagger
 * /api/borrow/{bookId}:
 *   post:
 *     summary: Borrow a book
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to borrow
 *       - in: header
 *         name: sessionid
 *         required: true
 *         schema:
 *           type: string
 *         description: The session ID of the member borrowing the book
 *     responses:
 *       200:
 *         description: Successfully borrowed the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success to borrow
 *       400:
 *         description: Error while borrowing the book
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error message
 */

router.post("/borrow/:bookId", ControllerBorrow.borrowBook);

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Library API
 *   version: 1.0.0
 *   description: API to manage book borrow and return in a library
 * paths:
 *   /returnBook/{bookId}:
 *     post:
 *       summary: Return a borrowed book
 *       description: Return a borrowed book and handle penalties if the book is returned late.
 *       parameters:
 *         - in: path
 *           name: bookId
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the book to be returned
 *         - in: header
 *           name: sessionid
 *           required: true
 *           schema:
 *             type: string
 *           description: Session ID of the member returning the book
 *       responses:
 *         '200':
 *           description: Book returned successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "success to return book but you got penalty"
 */

router.delete("/returnBook/:bookId", ControllerBorrow.returnBook);

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the member
 *         code:
 *           type: string
 *           description: Code of the member
 *         name:
 *           type: string
 *           description: Name of the member
 *         penalty:
 *           type: boolean
 *           description: Indicates whether the member has a penalty
 *           example: false
 *         limitPenalty:
 *           type: string
 *           format: date-time
 *           description: Date when the penalty ends
 *           example: "null"
 *       required:
 *         - code
 *         - name
 *       example:
 *         id: 1
 *         code: "M001"
 *         name: "John Doe"
 *         penalty: false
 *         limitPenalty: null
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the book
 *         code:
 *           type: string
 *           description: Code of the book
 *         title:
 *           type: string
 *           description: Title of the book
 *         author:
 *           type: string
 *           description: Author of the book
 *         stock:
 *           type: integer
 *           description: Number of copies available in stock
 *           example: 5
 *       required:
 *         - code
 *         - title
 *         - author
 *         - stock
 *       example:
 *         id: 1
 *         code: "B001"
 *         title: "Learn JavaScript"
 *         author: "John Doe"
 *         stock: 5
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Borrow:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the borrow record
 *         bookId:
 *           type: integer
 *           description: ID of the borrowed book
 *         memberId:
 *           type: integer
 *           description: ID of the member who borrowed the book
 *         limitBorrow:
 *           type: string
 *           format: date-time
 *           description: Due date for returning the borrowed book
 *           example: "2024-09-30T00:00:00Z"
 *       required:
 *         - bookId
 *         - memberId
 *         - limitBorrow
 *       example:
 *         id: 1
 *         bookId: 101
 *         memberId: 1001
 *         limitBorrow: "2024-09-30T00:00:00Z"
 */

module.exports = router;
