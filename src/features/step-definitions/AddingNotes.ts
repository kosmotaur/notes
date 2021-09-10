import { Before, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import supertest from 'supertest';

const isAddingNotesEnabled = () => process.env.ENABLE_ADDING_NOTES === 'true';

type Owner = {
  id: number;
};
type Note = {
  title: string;
  description: string;
  owner: Owner['id'];
};

Before({ tags: '@addingNotes' }, () => {
  return isAddingNotesEnabled() ? null : 'skipped';
});
const note: Note = {
  title: 'my great note',
  description: 'Lorem ipsum dolor sit amet',
  owner: 42
};
When('I add a note', async () =>
  supertest(process.env.APP_URL).post('/notes').send(note)
);
Then('my list of notes should contain one note', async () => {
  return supertest(process.env.APP_URL)
    .get('/notes')
    .send()
    .expect(200)
    .then((res) => {
      expect(res).to.deep.equal(note);
    });
});
