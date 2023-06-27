import express, { Router } from 'express';
import * as todosController from '../../controllers/todosController';

const todosRouter: Router = express.Router();

/**
   * @openapi
   * components:
   *   schemas:
   *     TodoItem:
   *       properties:
   *         id:
   *           type: integer
   *         title:
   *           type: string
   *         description:
   *           type: string
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   *     TodoItemInput:
   *       required:
   *         - title
   *       properties:
   *         title:
   *           type: string
   *         description:
   *           type: string
   *     UpdateTodoItemInput:
   *       properties:
   *         title:
   *           type: string
   *         description:
   *           type: string
   *   responses:
   *     404NotFound:
   *       description: The specified to-do item was not found.
   *     400BadRequest:
   *       description: The server is unable to process your request due to incorrect user input.
   *     500InternalServerError:
   *       description: The server is unable to process your request.
   */

/**
 * @openapi
 * /api/v1/todos/:
 *   get:
 *     description: Get all to-do items in the database
 *     responses:
 *       200:
 *         description: An array of to-do items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TodoItem'
 *       500:
 *         $ref: '#/components/responses/500InternalServerError' 
 */
todosRouter.get('/', todosController.getAll);

/**
 * @openapi
 * /api/v1/todos/:
 *   post:
 *     description: Create a to-do item and save it to the database
 *     requestBody:
 *       description: The to-do item to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTodoItemInput'
 *     responses:
 *       200:
 *         description: The created to-do item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoItem'
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 */
todosRouter.post('/', todosController.createOne);

/**
 * @openapi
 * /api/v1/todos/{id}:
 *   get:
 *     description: Get a to-do item from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the to-do item to get
 *     responses:
 *       200:
 *         description: The fetched to-do item from the database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoItem'
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 */
todosRouter.get('/:id', todosController.getById);

/**
 * @openapi
 * /api/v1/todos/{id}:
 *   put:
 *     description: Update an existing to-do item in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the to-do item to get
 *     requestBody:
 *       description: An object describing which fields to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTodoItemInput'
 *     responses:
 *       200:
 *         description: The udpated to-do item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoItem'
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 */
todosRouter.put('/:id' , todosController.updateById);

/**
 * @openapi
 * /api/v1/todos/{id}:
 *   delete:
 *     description: Try to delete a to-do item from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the to-do item to get
 *     responses:
 *       200:
 *         description: Shows the status of the delete action
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 */
todosRouter.delete('/:id', todosController.deleteById);

export default todosRouter;
