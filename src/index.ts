import express, { Express } from 'express';
import bodyParser from 'body-parser';

const createApp = (): Express => {
  const app = express();

  app.use(bodyParser.json());

  return app;
};

export default createApp;
