import axios from 'axios'
import config from '@/config'
import Explorer from '@/providers/ExplorerProvider'

jest.mock('axios')

const maxios = axios as jest.Mocked<typeof axios>
const baseUrl = config.explorerApiBaseUrl

it('get address balances', async () => {
  maxios.get.mockResolvedValue({
    data: {
      data: {
        balances: ['item']
      }
    }
  })

  const address = 'address'
  const url = `${baseUrl}/addresses/${address}`
  const balances = await Explorer.getAddressBalances(address)

  expect(maxios.get).toHaveBeenCalledWith(url)
  expect(balances.length).toEqual(1)
})

it('get address txs', async () => {
  maxios.get.mockResolvedValue({
    data: {
      data: [],
      links: {},
      meta: {}
    }
  })

  const address = 'address'
  const page = 1
  const limit = 1
  const data = {
    address,
    page,
    limit
  }
  const url = `${baseUrl}/addresses/${data.address}/transactions?page=${data.page}&limit=${data.limit}`
  const txs = await Explorer.getAddressTxs(data)

  expect(maxios.get).toHaveBeenCalledWith(url)
  expect(txs).toHaveProperty('data')
  expect(txs).toHaveProperty('links')
  expect(txs).toHaveProperty('meta')
})

it('get address delegations', async () => {
  maxios.get.mockResolvedValue({
    data: {
      data: [],
      links: {},
      meta: {}
    }
  })

  const address = 'address'
  const url = `${baseUrl}/addresses/${address}/delegations`
  const txs = await Explorer.getAddressDelegations(address)

  expect(maxios.get).toHaveBeenCalledWith(url)
  expect(txs).toHaveProperty('data')
  expect(txs).toHaveProperty('links')
  expect(txs).toHaveProperty('meta')
})

it('get network validators', async () => {
  maxios.get.mockResolvedValue({
    data: {
      data: ['item']
    }
  })

  const url = `${baseUrl}/validators`
  const validators = await Explorer.getValidators()

  expect(maxios.get).toHaveBeenCalledWith(url)
  expect(validators.length).toEqual(1)
})

it('get network coins', async () => {
  maxios.get.mockResolvedValue({
    data: {
      data: ['item']
    }
  })

  const url = `${baseUrl}/coins`
  const coins = await Explorer.getCoins()

  expect(maxios.get).toHaveBeenCalledWith(url)
  expect(coins.length).toEqual(1)
})

it('get network status', async () => {
  maxios.get.mockResolvedValue({
    data: {
      data: 'ok'
    }
  })

  const url = `${baseUrl}/status`
  const status = await Explorer.getStatus()

  expect(maxios.get).toHaveBeenCalledWith(url)
  expect(status).toEqual('ok')
})
