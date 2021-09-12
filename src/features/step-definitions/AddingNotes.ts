import { Before, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import supertest from 'supertest';
import { Note } from '@prisma/client';

const isAddingNotesEnabled = () => process.env.ENABLE_ADDING_NOTES === 'true';

Before({ tags: '@addingNotes' }, () => {
  return isAddingNotesEnabled() ? null : 'skipped';
});
const note: Partial<Note> = {
  title: 'my great note',
  description: 'Lorem ipsum dolor sit amet'
};
When('I add a note', async () =>
  supertest(process.env.APP_URL)
    .post('/notes')
    .send({
      ...note,
      owner: {
        connect: {
          id: 1
        }
      }
    })
);
Then('my list of notes should contain one note', async () => {
  return supertest(process.env.APP_URL)
    .get('/notes')
    .expect(200)
    .then((res) => {
      expect(res.body[0]).to.deep.include(note);
    });
});
