/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-function */

export interface Subscription {
  subscribe: () => void;
  unsubscribe: () => void;
  removeAllListeners: () => void;
}

export default class MockCentrifuge {
  callbacks: Record<string, Function> = {}

  connect () {}
  subscribe (channel: string, callback: Function): Subscription {
    this.callbacks[channel] = callback

    return {
      subscribe: () => {},
      unsubscribe: () => {
        delete this.callbacks[channel]
      },
      removeAllListeners: () => {}
    }
  }

  getSub (channel: string): Function {
    return this.callbacks[channel]
  }

  publish (channel: string, data: string) {
    this.callbacks[channel](data)
  }
}
