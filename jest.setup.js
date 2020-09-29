Object.assign(global, require('jest-chrome'))
jest.mock('webextension-polyfill', () => require('sinon-chrome/webextensions'))