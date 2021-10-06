import { Given, Then, When } from '@cucumber/cucumber';
import supertest from 'supertest';
import { createNote, getFirstNoteId } from './common';
import client from '../../client';
import { BaseNote } from '../../Note';

const note: BaseNote = createNote();

Given('I have a note', () =>
  client.note.create({
    data: {
      ...note,
      owner: {
        connect: {
          id: 1
        }
      }
    }
  })
);

When('I delete it', async () =>
  supertest(process.env.APP_URL)
    .delete(`/notes/${await getFirstNoteId()}`)
    .expect(200)
);

Then(
  'my list of notes should not include that note',
  async () =>
    await client.note.findUnique({
      where: {
        id: await getFirstNoteId()
      }
    })
);
