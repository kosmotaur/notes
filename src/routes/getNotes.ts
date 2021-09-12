import { Client } from '../client';
import { Request, Response } from 'express';

const createGetNotes =
  (client: Client) =>
  async (req: Request, res: Response): Promise<void> => {
    res.json(await client.note.findMany());
  };

export default createGetNotes;
