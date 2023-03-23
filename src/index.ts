import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v1 } from './routes';
import { connect } from 'mongoose';

// initialize configuration
dotenv.config();

const app = express();

// const corsOptions = {
//   origin: 'http://localhost:8000',
// };

app.use(cors({ origin: '*' }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to api application.' });
});

app.use('/v1', v1);

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.render('500', { error: err });
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
