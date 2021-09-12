import createApp from '../src';
import client from '../src/client';
import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.PORT);

createApp(client).listen(port, () => {
  console.log('================ RUNNING! on port %i', port);
});
