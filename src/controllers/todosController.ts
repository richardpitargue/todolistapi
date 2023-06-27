import { Request, Response } from 'express';
import { CreateTodoItem } from '../interfaces';
import * as TodoItemService from '../services/TodoItemService';

export const getAll = async (req: Request, res: Response) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 0;
    const result = await TodoItemService.getAll(offset, limit);
    return res.json(result);
  } catch (error) {
    return res.status(500).send({ message: 'Something went wrong.' });
  }
}

export const createOne = async (req: Request, res: Response) => {
  try {
    const payload: CreateTodoItem = req.body;
    const result = await TodoItemService.create(payload);
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ message: 'Bad request.' });
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await TodoItemService.getById(id);
    return res.json(result);
  } catch (error: any) {
    if (error.message === 'Not found.') {
      return res.status(404).json({ message: 'Not found.' });
    } else {
      return res.status(400).json({ message: 'Bad request.' });
    }
  }
}

export const updateById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const payload: CreateTodoItem = req.body;
    const result = await TodoItemService.update(id, payload);
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ message: 'Bad request.' });
  }
}

export const deleteById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const success = await TodoItemService.deleteById(id);
    return res.json({ success });
  } catch (error) {
    return res.status(400).json({ message: 'Bad request.' });
  }
}
