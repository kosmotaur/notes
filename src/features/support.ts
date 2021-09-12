import dotenv from 'dotenv';
import { exec, ExecOptions } from 'shelljs';
import { After, Before } from '@cucumber/cucumber';
import waitOn from 'wait-on';
import path from 'path';
import child from 'child_process';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

const silentExec = (command: string, options: ExecOptions = {}) =>
  exec(command, { ...options, silent: true });
const startDb = () => {
  silentExec(
    'docker run -e POSTGRES_USER=test -e POSTGRES_PASSWORD=test -e POSTGRES_DB=test --name test_db -p 5433:5432 -d postgres'
  );
};

let appProcess: child.ChildProcess;

const waitForDb = () => silentExec('docker exec test_db pg_isready');
const migrateDb = () => silentExec('npm run migrate:test');
const startApp = () =>
  exec('npm start', {
    async: true,
    silent: true
  });

const removeDb = () => {
  silentExec('docker stop test_db');
  silentExec('docker rm test_db');
};

const removeTestMigrations = () => {
  silentExec('rm -rf ./src/migrations');
};

const stopApp = () => {
  appProcess.kill(0);
};

Before({ timeout: 20000 }, async () => {
  startDb();
  waitForDb();
  migrateDb();
  appProcess = startApp();
  await waitOn({
    resources: ['http://localhost:3000'],
    timeout: 10000,
    validateStatus: (status) => status === 404
  });
});

After(() => {
  removeTestMigrations();
  stopApp();
  removeDb();
  process.exit(0);
});
