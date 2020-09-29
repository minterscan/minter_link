// eslint-disable-next-line @typescript-eslint/no-var-requires
Object.assign(global, require('jest-chrome'))
// eslint-disable-next-line @typescript-eslint/no-var-requires
jest.mock('webextension-polyfill', () => require('sinon-chrome/webextensions'))
