const common = require('./test/jest.common');

module.exports = {
  ...common,
  collectCoverageFrom: ['**/src/**/*.js'],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  projects: ['./test/jest.lint.js', './test/jest.client.js'],
};
