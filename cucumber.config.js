require('ts-node/register');
require('dotenv').config();

module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: [
      'src/hooks/world.ts',
      'src/hooks/hooks.ts',
      'src/steps/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      resultsDir: 'allure-results'
    },
    parallel: 1,
    worldParameters: {
      browser: process.env.BROWSER ?? 'chromium',
      baseUrl: process.env.BASE_URL ?? 'http://localhost:80',
      headless: process.env.HEADLESS !== 'false'
    }
  }
};