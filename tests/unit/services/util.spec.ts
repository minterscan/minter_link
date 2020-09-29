import { ETxType } from '@/model/Tx'
import {
  pretty,
  toFixed,
  getQuery,
  pipToBip,
  timestamp,
  base64decode,
  shortenString,
  getReadableTxType
} from '@/services/Util'

it('base64decode', () => {
  const message = base64decode('SGVsbG8gd29ybGQ=')

  expect(message).toEqual('Hello world')
})

it('shortenString negative', () => {
  const result = shortenString('hello')

  expect(result).toEqual('hello')
})

it('shortenString positive', () => {
  const result = shortenString('hello', 1, 2)

  expect(result).toEqual('h...o')
})

it('getReadableTxType', () => {
  const result = getReadableTxType(ETxType.RedeemCheck)

  expect(result).toEqual('Redeem check')
})

it('pipToBip', () => {
  const result = pipToBip('032000000000000000')

  expect(result).toEqual('0.032')
})

it('pretty null', () => {
  const result = pretty(null)

  expect(result).toEqual('')
})

it('pretty undefined', () => {
  const result = pretty(undefined)

  expect(result).toEqual('')
})

it('pretty fixed', () => {
  const result = pretty('187.814878373498109306')

  expect(result).toEqual('187.8149')
})

it('pretty significant', () => {
  const result = pretty('0.0001')

  expect(result).toEqual('0')
})

it('toFixed default', () => {
  const result = toFixed(187.814878373498109306)

  expect(result).toEqual('187.81')
})

it('toFixed string', () => {
  const result = toFixed('187.814878373498109306')

  expect(result).toEqual('187.83')
})

it('toFixed decimals', () => {
  const result = toFixed(187.814878373498109306, 4)

  expect(result).toEqual('187.8149')
})

it('timestamp', () => {
  const result = timestamp(1601328058032)

  expect(result).toEqual('9/28/2020, 11:20:58 PM')
})

it('getQuery', () => {
  const result = getQuery({ foo: 'bar', bar: 'baz' })

  expect(result).toEqual('foo=bar&bar=baz')
})