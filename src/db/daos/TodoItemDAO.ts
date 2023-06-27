import TodoItem, { TodoItemInput, TodoItemOutput } from '../models/TodoItem';

export interface Filter {
  offset: number;
  limit: number;
}
export interface TodoItemOutputPaginated {
  rows: TodoItemOutput[],
  count: number;
}

export const create = async (payload: TodoItemInput): Promise<TodoItemOutput> => {
  const todoItem = await TodoItem.create(payload);
  return todoItem;
}

export const update = async (id: number, payload: Partial<TodoItemInput>): Promise<TodoItemOutput> => {
  const todoItem = await TodoItem.findByPk(id);
  if (!todoItem) {
    throw new Error('Not found.');
  }

  const updatedTodoItem = await (todoItem as TodoItem).update(payload);
  return updatedTodoItem;
}

export const getById = async (id: number): Promise<TodoItemOutput> => {
  const todoItem = await TodoItem.findByPk(id);
  if (!todoItem) {
    throw new Error('Not found.');
  }

  return todoItem;
}

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedTodoItem = await TodoItem.destroy({
    where: { id }
  });
  return deletedTodoItem > 0;
}

export const getAll = async (filter?: Filter): Promise<TodoItemOutputPaginated> => {
  console.log(filter);
  if (!filter) {
    const rows = await TodoItem.findAll();
    return {
      count: rows.length,
      rows,
    }
  }

  return TodoItem.findAndCountAll({
    where: {},
    limit: filter.limit,
    offset: filter.offset
  });
}
