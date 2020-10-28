import axios from 'axios'
import config from '@/config'
import { address } from '../util'
import { getQuery } from '@/services/Util'
import Gate from '@/providers/GateProvider'

// Ignore snake case for Minter Explorer API data
/* eslint-disable @typescript-eslint/camelcase */

jest.mock('axios')

const baseUrl = config.gateApiBaseUrl
const maxios = axios as jest.Mocked<typeof axios>

it('get nonce', async () => {
  maxios.get.mockResolvedValue({
    data: {
      nonce: '1'
    }
  })

  const url = `${baseUrl}/nonce/${address}`
  const nonce = await Gate.getNonce(address)

  expect(maxios.get).toHaveBeenCalledWith(url)
  expect(nonce).toEqual(1)
})

it('send tx', async () => {
  maxios.post.mockResolvedValue({
    data: {
      hash: 'hash'
    }
  })

  const url = `${baseUrl}/send_transaction`
  const hash = await Gate.txSend('foo')

  expect(maxios.post).toHaveBeenCalledWith(url, { tx: 'foo' })
  expect(hash).toEqual('hash')
})

it('estimate buy', async () => {
  maxios.get.mockResolvedValue({
    data: {
      commission: '',
      will_pay: '',
      will_get: ''
    }
  })

  const data = {
    coin_id_to_buy: '',
    coin_id_to_sell: '',
    value_to_buy: ''
  }
  const url = `${baseUrl}/estimate_coin_buy?${getQuery(data)}`
  const response = await Gate.estimateBuy(data)

  expect(maxios.get).toHaveBeenCalledWith(url)
  expect(response).toHaveProperty('commission')
  expect(response).toHaveProperty('will_pay')
  expect(response).toHaveProperty('will_get')
})

it('estimate sell', async () => {
  maxios.get.mockResolvedValue({
    data: {
      commission: '',
      will_pay: '',
      will_get: ''
    }
  })

  const data = {
    coin_id_to_buy: '',
    coin_id_to_sell: '',
    value_to_sell: ''
  }
  const url = `${baseUrl}/estimate_coin_sell?${getQuery(data)}`
  const response = await Gate.estimateSell(data)

  expect(maxios.get).toHaveBeenCalledWith(url)
  expect(response).toHaveProperty('commission')
  expect(response).toHaveProperty('will_pay')
  expect(response).toHaveProperty('will_get')
})
