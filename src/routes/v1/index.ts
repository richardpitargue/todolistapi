import express, { Router } from 'express';

import todosRouter from './todos';

const v1Router: Router = express.Router();

v1Router.use('/todos', todosRouter);

export default v1Router;
