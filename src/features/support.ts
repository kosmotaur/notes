import dotenv from 'dotenv';
import { exec } from 'shelljs';
import { After, Before } from '@cucumber/cucumber';
import waitOn from 'wait-on';

dotenv.config();

const startDb = () => {
  exec(
    'docker run -e POSTGRES_USER=test -e POSTGRES_PASSWORD=test -e POSTGRES_DB=test --name test_db -p 5433:5432 -d postgres',
    { silent: true }
  );
};

const waitForDb = async () => {
  await waitOn({
    resources: ['tcp:5433'],
    timeout: 10000
  });
};

const removeDb = () => {
  exec('docker kill test_db', { silent: true });
  exec('docker rm test_db', { silent: true });
};

const migrateDb = () => {
  exec('npm run migrate:test');
};

const removeTestMigrations = () => {
  exec('rm -rf ./src/migrations');
};

Before({ timeout: 20000 }, async () => {
  startDb();
  await waitForDb();
  migrateDb();
});

After(() => {
  removeDb();
  removeTestMigrations();
});
