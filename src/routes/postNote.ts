import { NextFunction, Request, Response } from 'express';
import { Client } from '../client';

const createPostNote =
  (client: Client) =>
  (req: Request, res: Response, next: NextFunction): void => {
    client.note.create({
      data: req.body
    });

    next();
  };

export default createPostNote;
