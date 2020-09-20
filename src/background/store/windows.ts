import { Runtime } from 'webextension-polyfill-ts'

interface WindowsStore {
  ports: {
    [domain: string]: Runtime.Port;
  };
  interact: {
    connect: boolean;
    payment: boolean;
    sign: boolean;
  };
}

// Persistent background popups store

const store: WindowsStore = {
  ports: {},
  interact: {
    connect: false,
    payment: false,
    sign: false
  }
}

export default store
