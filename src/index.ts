import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import swaggerJsDoc, { OAS3Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';

import v1Router from './routes/v1';
import initializeDb from './db/initializeDb';

initializeDb();

const app: Express = express();
const port = process.env.PORT;

const swaggerOptions: OAS3Options = {
  failOnErrors: process.env.NODE_ENV === 'development',
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-do List API',
      version: '0.0.1',
      description: 'API for a To-do List Application',
    }
  },
  apis: ['./src/routes/v1/*.ts'],
};

const openApiSpecification = swaggerJsDoc(swaggerOptions);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification));
  app.use('/openapi/spec', (req: Request, res: Response) => {
    return res.send(openApiSpecification);
  });
}

app.get('/', (req: Request, res: Response) => {
  res.send('Nothing to see here.');
});

app.use('/api/v1', v1Router);

app.get('*', (req: Request, res: Response) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
