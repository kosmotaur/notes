import dotenv from 'dotenv';
import { exec, ExecOptions } from 'shelljs';
import { After, AfterAll, BeforeAll } from '@cucumber/cucumber';
import waitOn from 'wait-on';
import path from 'path';
import child from 'child_process';
import client from '../client';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

const silentExec = (command: string, options: ExecOptions = {}) =>
  exec(command, { ...options, silent: true });

const startDb = () => {
  silentExec(
    'docker run -e POSTGRES_USER=test -e POSTGRES_PASSWORD=test -e POSTGRES_DB=test --name test_db -p 5433:5432 -d postgres',
    {
      silent: true
    }
  );
};
const initDb = () => silentExec('npm run db:init');

const waitForDb = () =>
  waitOn({
    resources: ['tcp:localhost:5433']
  });

const createDb = async () => {
  startDb();
  await waitForDb();
  initDb();
};
const removeDb = () => {
  silentExec('docker stop test_db');
  silentExec('docker rm test_db');
};

let appProcess: child.ChildProcess;
const startApp = () =>
  silentExec('npm start', {
    async: true
  });
const stopApp = () => {
  appProcess.kill('SIGINT');
};

BeforeAll({ timeout: 20000 }, async () => {
  await createDb();
  appProcess = startApp() as child.ChildProcess;
  await waitOn({
    resources: ['http://localhost:3000'],
    timeout: 10000,
    validateStatus: (status) => status === 404
  });
});

After(() => {
  client.note.deleteMany();
});

AfterAll(() => {
  removeDb();
  stopApp();
});
