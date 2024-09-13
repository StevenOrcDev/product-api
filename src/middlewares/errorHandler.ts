import { Request, Response } from 'express';

export const errorHandler = (err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};
