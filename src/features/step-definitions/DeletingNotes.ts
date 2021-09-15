import { Given, Then, When } from '@cucumber/cucumber';
import supertest from 'supertest';
import { Note } from '@prisma/client';
import { getFirstNoteId } from './common';
import client from '../../client';

const note: Pick<Note, 'title' | 'description'> = {
  title: 'my great note',
  description: 'Lorem ipsum dolor sit amet'
};

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
