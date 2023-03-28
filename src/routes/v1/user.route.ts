import express from 'express';
import { login, register } from '../../controllers/user.controller';

const userApi = express.Router();

// Get user list
userApi.post('/auth/register', register);

userApi.post('/auth/login', login);

export default userApi;
