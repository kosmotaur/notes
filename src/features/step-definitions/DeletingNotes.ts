import { Given, Then, When } from '@cucumber/cucumber';
import supertest from 'supertest';
import { createNote, getFirstNoteId } from './common';
import client from '../../client';
import { BaseNote } from '../../Note';
import { Note } from '@prisma/client';
import { expect } from 'chai';

const baseNote: BaseNote = createNote();
let storedNote: Note;

Given('I have a note', async () => {
  storedNote = await client.note.create({
    data: {
      ...baseNote,
      owner: {
        connect: {
          id: 1
        }
      }
    }
  });
});

When('I delete it', async () =>
  supertest(process.env.APP_URL)
    .delete(`/notes/${await getFirstNoteId()}`)
    .expect(200)
);

Then('my list of notes should not include that note', async () => {
  const storedNotes = await client.note.findMany();

  storedNotes.forEach((note) => {
    expect(note).to.not.deep.equal(storedNote);
  });
});
