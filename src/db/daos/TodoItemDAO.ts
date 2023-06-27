import TodoItem, { TodoItemInput, TodoItemOutput } from '../models/TodoItem';

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

export const getAll = async (): Promise<TodoItemOutput[]> => {
  return TodoItem.findAll();
}
