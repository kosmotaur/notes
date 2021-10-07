import { Client } from '../client';
import { Request, Response } from 'express';

type NotePutRequest = Request<{
  noteId: string;
}>;

const createPutNote =
  (client: Client) =>
  async (req: NotePutRequest, res: Response): Promise<void> => {
    const updatedNote = await client.note.update({
      where: {
        id: Number(req.params.noteId)
      },
      data: req.body
    });

    res.status(200).json(updatedNote);
  };

export default createPutNote;
