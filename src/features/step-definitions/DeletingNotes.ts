import { Before, Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import supertest from 'supertest';
import { Note } from '@prisma/client';

const note: Partial<Note> = {
  title: 'my great note',
  description: 'Lorem ipsum dolor sit amet'
};
let postTest: Note;

const isDeletingNotesEnabled = () => process.env.ENABLE_DELETING_NOTES;

Before({ tags: '@deletingNotes' }, () => {
  return isDeletingNotesEnabled() ? null : 'skipped';
});

Given(
  'I have a note',
  async () =>
    (postTest = (
      await supertest(process.env.APP_URL)
        .post('/notes')
        .send({
          ...note,
          owner: {
            connect: {
              id: 1
            }
          }
        })
    ).body) as Note
);

When('I delete it', async () =>
  supertest(process.env.APP_URL).delete(`/notes/${postTest.id}`).expect(200)
);

Then('my list of notes should not include that note', async () =>
  supertest(process.env.APP_URL)
    .get('/notes')
    .then((res) => {
      expect(res.body).to.not.include(note);
    })
);
