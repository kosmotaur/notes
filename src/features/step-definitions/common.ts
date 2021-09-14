import { Note } from '@prisma/client';
import client from '../../client';

export const getFirstNoteId = async (): Promise<Note['id']> =>
  ((await client.note.findFirst()) as Note).id;
