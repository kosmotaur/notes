import { Request } from 'express';
import { Client } from '../client';

const createPostNote =
  (client: Client) =>
  (req: Request): void => {
    client.note.create({
      data: req.body
    });
  };

export default createPostNote;
