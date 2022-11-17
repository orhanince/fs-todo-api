const express = require('express');
const router = express.Router();
const todoService = require('./../services/todo.service');
const validatorMiddleware = require('../middlewares/validator-middleware');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');

/**
 * Todo Model
 * @typedef {object} Todo
 * @property {string} todo_id - Todo id (UUID)
 * @property {string} user_id - User id (UUID)
 * @property {string} title - Todo title
 */

/**
 * @typedef {object} GetTodoList
 * @property {boolean} status - Service status
 * @property {number} count - Total todo count
 * @property {array<Todo>} count - Todo list
 */

/**
 * GET /todo/listTodos
 * @summary All all todos.
 * @tags Todo
 * @security bearerAuth
 * @return {GetTodoList} 200 - success response - application/json
 */
router.get(
  '/listTodos',
  ...auth(),
  paginationMiddleware(),
  async (req, res, next) => {
    try {
      const result = await todoService.getAll(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} CreateTodoResponse
 * @property {string} status - true
 * @property {string} data - true
 */

/**
 * @typedef {object} TodoBody
 * @property {string} title.required - Todo title
 */

/**
 * POST /todo/createTodo
 * @summary Create todo
 * @tags Todo
 * @param {TodoBody} request.body.required - Create todo body
 * @return {CreateTodoResponse} 200 - success response - application/json
 * @security bearerAuth
 */
router.post(
  '/createTodo',
  ...auth(),
  validatorMiddleware(body('title').isString().isLength({ min: 5, max: 2550 })),
  async (req, res, next) => {
    try {
      const result = await todoService.create(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

module.exports = router;
