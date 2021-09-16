import { Request, Response } from 'express';
import { Client } from '../client';

export type DeleteNoteParams = {
  noteId: string;
};

const createDeleteNote =
  (client: Client) =>
  async (req: Request<DeleteNoteParams>, res: Response): Promise<void> => {
    await client.note.delete({
      where: {
        id: Number(req.params.noteId)
      }
    });
    res.json(200);
  };

export default createDeleteNote;
