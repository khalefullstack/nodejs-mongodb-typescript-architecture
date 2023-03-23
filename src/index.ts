import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v1 } from './routes';

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to api application.' });
});

app.use('/v1', v1);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
