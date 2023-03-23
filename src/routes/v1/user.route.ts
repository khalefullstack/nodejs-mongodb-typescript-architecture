import express, { Request, Response, NextFunction } from 'express';

const userApi = express.Router();

// Get user list
userApi.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('response users');
});

export default userApi;
