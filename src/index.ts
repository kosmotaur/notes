import express, { Express } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { Client } from './client';
import createPostNote from './routes/postNote';
import createGetNotes from './routes/getNotes';

const createApp = (client: Client): Express => {
  const app = express();

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.post('/notes', createPostNote(client));
  app.get('/notes', createGetNotes(client));

  return app;
};

export default createApp;
