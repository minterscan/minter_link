import {
  seed,
  address,
  privateKey
} from './../util'
import WalletService from '@/services/Wallet'

it('generate', () => {
  const seed = WalletService.generate()
  const result = WalletService.verifySeed(seed)

  expect(result).toBeTruthy()
})

it('verify', () => {
  const result = WalletService.verifySeed(seed)

  expect(result).toBeTruthy()
})

it('getPrivateKey', () => {
  const result = WalletService.getPrivateKey(seed).toString('hex')

  expect(result).toEqual(privateKey)
})

it('getAddress', () => {
  const result = WalletService.getAddress(seed)

  expect(result).toEqual(address)
})

it('getMinterWallet seed', () => {
  const meta = { label: '', icon: '' }
  const result = WalletService.getMinterWallet(seed, meta)

  expect(result).toEqual({
    seed,
    address,
    meta
  })
})
