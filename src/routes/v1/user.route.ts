import express from 'express';

const userApi = express.Router();

// Get user list
userApi.get('/', function (req, res, next) {
  res.send('response users');
});

export default userApi;
