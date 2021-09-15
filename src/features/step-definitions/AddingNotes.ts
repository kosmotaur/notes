import { Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import supertest from 'supertest';
import { Note } from '@prisma/client';

const note: Partial<Note> = {
  title: 'my great note',
  description: 'Lorem ipsum dolor sit amet'
};
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
  return supertest(process.env.APP_URL)
    .get('/notes')
    .expect(200)
    .then((res) => {
      expect(res.body[0]).to.deep.include(note);
    });
});
