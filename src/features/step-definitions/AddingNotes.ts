import { Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import supertest from 'supertest';
import client from '../../client';
import { BaseNote } from '../../Note';
import { createNote } from './common';

const note: BaseNote = createNote();
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
