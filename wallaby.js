module.exports = ({ compilers: { typeScript } }) => ({
  compilers: { '**/*.ts': typeScript({ isolatedModules: true }) },
  env: { type: 'node', runner: 'node' },
  files: ['src/*.ts', '!src/*.spec.ts'],
  testFramework: 'jest',
  tests: ['src/*.spec.ts'],
});
