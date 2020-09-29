import { password } from '../util'
import crypto from '@/services/Crypto'
import keyring, { ObservableProps } from '@/services/Keyring'

let expiry = 0
const subscribeCallback = jest.fn()

beforeAll(() => {
  keyring.destroy()
})

it('subscribe to keyring events', () => {
  keyring.subscribe(ObservableProps.Key, subscribeCallback)
})

it('create keyring', () => {
  expiry = keyring.create(password)

  expect(typeof expiry).toBe('number')
  expect(expiry).toBeGreaterThan(Date.now())
  expect(subscribeCallback).toHaveBeenCalled()
})

// Test expiry before key, cause key getter update Keyring expiry
it('get keyring expiry', () => {
  expect(keyring.expiry).toEqual(expiry)
})

it('get keyring expired', () => {
  expect(keyring.expired).toBeFalsy()
})

it('get keyring key', () => {
  expect(keyring.key).toEqual(crypto.encryptSHA3(password))
})

it('destroy keyring', () => {
  keyring.destroy()

  expect(keyring.key).toEqual('')
  expect(keyring.expiry).toEqual(0)
})
