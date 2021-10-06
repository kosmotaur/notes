import { Note } from '@prisma/client';
import client from '../../client';
import { BaseNote } from '../../Note';
import chance from '../../utils/chance';

export const getFirstNoteId = async (): Promise<Note['id']> =>
  ((await client.note.findFirst()) as Note).id;

export const createNote: () => BaseNote = () => ({
  title: chance.sentence(),
  description: chance
    .n(chance.sentence, chance.natural({ min: 1, max: 10 }))
    .join('')
});

export const createNotes: (n: number) => BaseNote[] = (n) =>
  chance.n(createNote, n);
