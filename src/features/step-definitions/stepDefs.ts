import { Given, Then, When } from '@cucumber/cucumber';
import { Note } from '@prisma/client';
import { expect } from 'chai';
import supertest from 'supertest';
import client from '../../client';
import { BaseNote } from '../../Note';
import { createBaseNote, createNotes, getFirstNoteId } from './common';
import chance from '../../utils/chance';

const note: BaseNote = createBaseNote();
let postTest: supertest.Test;

When('I add a note', () => {
  postTest = supertest(process.env.APP_URL)
    .post('/notes')
    .send({
      ...note,
      owner: {
        connect: {
          id: 1
        }
      }
    });
});
Then('it should be created', async () =>
  postTest.expect(201).then((res) => {
    expect(res.body).to.deep.include(note);
  })
);
Then('my list of notes should contain that note', async () => {
  const storedNote = await client.note.findFirst();

  expect(storedNote).to.deep.include(note);
});

const baseNote: BaseNote = createBaseNote();
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

const notes = createNotes(5);
let getTest: supertest.Test;

Given('I have some notes', () =>
  client.note.createMany({
    data: notes.map((note) => ({
      ...note,
      ownerId: 1
    }))
  })
);

When('I request them', () => {
  getTest = supertest(process.env.APP_URL).get('/notes');
});

Then('my list of notes contains them', () =>
  getTest.expect(200).then((res) => {
    (res.body as Note[]).forEach((note, i) =>
      expect(note).to.deep.include(notes[i])
    );
  })
);

const noteUpdate: Partial<BaseNote> = {
  title: chance.word()
};
const updatedNote: BaseNote = {
  ...baseNote,
  ...noteUpdate
};
let putTest: supertest.Test;

When('I update it', () => {
  putTest = supertest(process.env.APP_URL)
    .put(`/notes/${storedNote.id}`)
    .send(noteUpdate);
});

Then('my note should be updated', async () => {
  await putTest.expect(200).then((res) => {
    expect(res.body).to.include(updatedNote);
  });
  const storedNote = await client.note.findFirst();

  expect(storedNote).to.include(updatedNote);
});
