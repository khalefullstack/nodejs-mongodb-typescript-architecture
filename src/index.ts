import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v1 } from './routes';
import { connect } from 'mongoose';
import middleware from './middleware';
import morgan from 'morgan';
import fs from 'fs';
import YAML from 'yaml';

import swaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

// initialize configuration
dotenv.config();

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

// const options: swaggerJSDoc.Options = {
//   swaggerDefinition,
//   // Paths to files containing OpenAPI definitions
//   apis: ['./routes/user.ts'],
// };

// const swaggerSpec = swaggerJSDoc(options);
const swaggerYaml = fs.readFileSync('swagger.yaml', 'utf-8');
const swaggerSpec = YAML.parse(swaggerYaml);

const app = express();

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// const corsOptions = {
//   origin: 'http://localhost:8000',
// };

app.use(cors({ origin: '*' }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(morgan('dev'));
app.use(middleware({ nest: 'nest' }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to api application.' });
});

app.use('/v1', v1);

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.send(err || 'Internal Server Error');
});

async function connectDb() {
  // 4. Connect to MongoDB
  await connect('mongodb://127.0.0.1:27017/pokemon');
}

connectDb().catch((err) => console.log(err));

// port is now available to the Node.js runtime
// as if it were an environment variable
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
