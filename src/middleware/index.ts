import { NextFunction, Request, Response } from 'express';

export * from './pokemon';

interface MiddlewareOptions {
  nest: string;
}
function middleware(options: MiddlewareOptions) {
  return function (req: Request, res: Response, next: NextFunction) {
    console.log('middleware options: ', options);
    // Implement the middleware function based on the options object
    next();
  };
}

export default middleware;
