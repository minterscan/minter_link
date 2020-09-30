module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts', // No need to cover bootstrap file
    '!src/tab/main.ts' // No need to cover bootstrap file
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel'
}
