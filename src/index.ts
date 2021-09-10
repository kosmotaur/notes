import express, { Express } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const createApp = (): Express => {
  const app = express();

  app.use(morgan('dev'));
  app.use(bodyParser.json());

  return app;
};

export default createApp;
