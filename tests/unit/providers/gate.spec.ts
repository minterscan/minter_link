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
      data: {
        nonce: '1'
      }
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
      data: {
        hash: 'hash'
      }
    }
  })

  const url = `${baseUrl}/transaction/push`
  const hash = await Gate.txSend('foo')

  expect(maxios.post).toHaveBeenCalledWith(url, { transaction: 'foo' })
  expect(hash).toEqual('hash')
})

it('estimate buy', async () => {
  maxios.get.mockResolvedValue({
    data: {
      data: {
        commission: '',
        will_pay: '',
        will_get: ''
      }
    }
  })

  const data = {
    coinToBuy: '',
    coinToSell: '',
    valueToBuy: ''
  }
  const url = `${baseUrl}/estimate/coin-buy?${getQuery(data)}`
  const response = await Gate.estimateBuy(data)

  expect(maxios.get).toHaveBeenCalledWith(url)
  expect(response).toHaveProperty('commission')
  expect(response).toHaveProperty('will_pay')
  expect(response).toHaveProperty('will_get')
})

it('estimate sell', async () => {
  maxios.get.mockResolvedValue({
    data: {
      data: {
        commission: '',
        will_pay: '',
        will_get: ''
      }
    }
  })

  const data = {
    coinToBuy: '',
    coinToSell: '',
    valueToSell: ''
  }
  const url = `${baseUrl}/estimate/coin-sell?${getQuery(data)}`
  const response = await Gate.estimateSell(data)

  expect(maxios.get).toHaveBeenCalledWith(url)
  expect(response).toHaveProperty('commission')
  expect(response).toHaveProperty('will_pay')
  expect(response).toHaveProperty('will_get')
})
