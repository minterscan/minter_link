import { Window } from '@/services/Window'
import { Runtime } from 'webextension-polyfill-ts'

interface WindowsStore {
  ports: {
    [domain: string]: Runtime.Port;
  };
  interact: {
    connect: Window | null;
    payment: Window | null;
    sign: Window | null;
  };
}

// Persistent background popups store

const store: WindowsStore = {
  ports: {},
  interact: {
    connect: null,
    payment: null,
    sign: null
  }
}

export default store
