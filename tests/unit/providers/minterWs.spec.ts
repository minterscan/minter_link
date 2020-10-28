import Centrifuge from 'centrifuge'
import MockCentrifuge from '../mocks/centrifuge'
import MinterWsProvider from '@/providers/MinterWsProvider'

/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

let centrifuge: Centrifuge
let instance: MinterWsProvider

beforeEach(() => {
  centrifuge = new MockCentrifuge() as unknown as Centrifuge
  instance = new MinterWsProvider(centrifuge)
})

it('connect', () => {
  const spy = jest.spyOn(centrifuge, 'connect')

  instance.connect()

  expect(spy).toHaveBeenCalled()
})

it('subscribe to txs', async () => {
  const channel = 'transactions'
  const callback = jest.fn()
  const spy = jest.spyOn(centrifuge, 'subscribe')

  instance.subscribeToTxs(callback)
  instance.centrifuge.publish(channel, { data: 'foo' })

  expect(spy).toHaveBeenCalledWith(channel, expect.any(Function))
  expect(callback).toHaveBeenCalledWith('foo')
  expect(instance.txsSubscription).not.toBeUndefined()
})

it('subscribe to address', () => {
  const channel = 'address'
  const callback = jest.fn()
  const spySub = jest.spyOn(centrifuge, 'subscribe')
  const spyGetSub = jest.spyOn(centrifuge, 'getSub')

  // double sub to test if statement
  instance.subscribeToAddress(channel, callback)
  instance.subscribeToAddress(channel, callback)
  instance.centrifuge.publish(channel, { data: 'foo' })

  expect(spySub).toHaveBeenCalledWith(channel, expect.any(Function))
  expect(spyGetSub).toHaveBeenCalledWith(channel)
  expect(callback).toHaveBeenCalledWith('foo')
  expect(instance.addressSubscriptions).toHaveProperty(channel)
})

it('unsubscribe from txs with empty txsSubscriptions', () => {
  instance.unsubscribeFromTxs()
})

it('unsubscribe from txs', () => {
  const channel = 'transactions'
  const callback = jest.fn()

  instance.subscribeToTxs(callback)

  expect(centrifuge.getSub(channel)).not.toBeUndefined()

  const spyUnsub = jest.spyOn(instance.txsSubscription!, 'unsubscribe')
  const spyRemoveListeners = jest.spyOn(instance.txsSubscription!, 'removeAllListeners')

  instance.unsubscribeFromTxs()

  expect(spyUnsub).toHaveBeenCalled()
  expect(spyRemoveListeners).toHaveBeenCalled()
  expect(centrifuge.getSub(channel)).toBeUndefined()
})

it('unsubscribe from address with empty addressSubscriptions', () => {
  instance.unsubscribeFromAddress('')
})

it('unsubscribe from address', () => {
  const channel = 'address'
  const callback = jest.fn()

  instance.subscribeToAddress(channel, callback)

  expect(centrifuge.getSub(channel)).not.toBeUndefined()

  const spy = jest.spyOn(instance.addressSubscriptions[channel], 'unsubscribe')

  instance.unsubscribeFromAddress(channel)

  expect(spy).toHaveBeenCalled()
  expect(centrifuge.getSub(channel)).toBeUndefined()
})
