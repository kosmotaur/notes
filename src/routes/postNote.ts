import { NextFunction, Request, Response } from 'express';
import { Client } from '../client';

const createPostNote =
  (client: Client) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await client.note.create({
        data: req.body
      });

      res.json(result);
    } catch (e) {
      next(e);
    }
  };

export default createPostNote;
