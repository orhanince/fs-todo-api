const moment = require('moment-timezone');
const { v4: uuidv4 } = require('uuid');
const { Todo } = require('./../models');
const paginationOptionGenerator = require('./../utils/pagination-option-generator');
/**
 * Get all todos from database
 */
async function getAll({ pagination, AUTH }) {
  const options = paginationOptionGenerator({
    pagination,
    likeColumns: ['uuid:todo_id', 'uuid:user_id'],
    user_id: AUTH.user_id,
  });

  const count = await Todo.count({
    where: options.where,
  });

  const data = await Todo.findAll({
    ...options,
  });

  return {
    status: true,
    count: count,
    data: data,
  };
}

/**
 * Create todo.
 */
async function create({ body, AUTH }) {
  const { title } = body || {};
  const now = moment.utc().toISOString();
  const createTodo = await Todo.create({
    todo_id: uuidv4(),
    user_id: AUTH.user_id,
    title: title,
    is_completed: 0,
    status: 1,
    created_at: now,
    updated_at: now,
  });
  if (createTodo) {
    return {
      status: true,
      data: createTodo,
    };
  }
}

module.exports = {
  getAll,
  create,
};
