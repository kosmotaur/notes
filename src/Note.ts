import { Note } from '@prisma/client';

export type BaseNote = Pick<Note, 'title' | 'description'>;
