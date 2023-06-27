import * as TodoItemDAO from '../db/daos/TodoItemDAO';
import { TodoItemInput, TodoItemOutput } from '../db/models/TodoItem';

export const create = (payload: TodoItemInput): Promise<TodoItemOutput> => {
  return TodoItemDAO.create(payload);
}

export const update = async (id: number, payload: Partial<TodoItemInput>): Promise<TodoItemOutput> => {
  return TodoItemDAO.update(id, payload);
}

export const getById = async (id: number): Promise<TodoItemOutput> => {
  return TodoItemDAO.getById(id);
}

export const deleteById = async (id: number): Promise<boolean> => {
  return TodoItemDAO.deleteById(id);
}

export const getAll = async (): Promise<TodoItemOutput[]> => {
  return TodoItemDAO.getAll();
}
