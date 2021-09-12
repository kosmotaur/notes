module.exports = {
  default: [
    `--format-options '{"snippetInterface": "synchronous"}'`,
    '--require-module ts-node/register',
    '--require src/features/support.ts',
    '--require src/**/step-definitions/*.ts',
    '--format @cucumber/pretty-formatter',
    '--publish-quiet'
  ].join(' ')
};
