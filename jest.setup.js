/* eslint-disable @typescript-eslint/no-var-requires */
Object.assign(global, require('jest-chrome'))
Object.assign(global, require('jest-webextension-mock'))

// jest.mock('webextension-polyfill', () => require('sinon-chrome/webextensions'))
// Object.assign(global, require('sinon-chrome/webextensions'))
