module.exports = {
  default: [
    `--format-options '{"snippetInterface": "synchronous"}'`,
    '--require-module ts-node/register',
    '--require src/**/step-definitions/*.ts'
  ].join(' ')
};
