import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import client from '../../client';
import { createNotes } from './common';
import supertest from 'supertest';

const notes = createNotes(5);
let getTest: supertest.Test;

Given('I have some notes', () => {
  client.note.createMany({
    data: notes.map((note) => ({
      ...note,
      ownerId: 1
    }))
  });
});

When('I request them', () => {
  getTest = supertest(process.env.APP_URL).get('/notes');
});

Then('my list of notes contains them', () =>
  getTest.expect(200).then((res) => {
    expect(res.body).to.deep.include(notes);
  })
);
