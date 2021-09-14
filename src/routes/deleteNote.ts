import { Request, Response } from 'express';
import { Client } from '../client';

export type DeleteNoteParams = {
  noteId: string;
};

const createDeleteNote =
  (client: Client) =>
  async (req: Request<DeleteNoteParams>, res: Response): Promise<void> => {
    const noteId = req.params.noteId;
    console.log({ noteId });
    const result = await client.note.delete({
      where: {
        id: Number(req.params.noteId)
      }
    });
    const result1 = result;
    console.log({ result1 });
    res.json(200);
  };

export default createDeleteNote;
