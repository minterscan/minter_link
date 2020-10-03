import Tx from 'minterjs-tx'
import Wallet from '@/services/Wallet'
import vault from '@/drivers/VaultDriver'
import { PreparedTxData } from '@/model/Tx'
import gate from '@/providers/GateProvider'
import { coinToBuffer } from 'minterjs-tx/src/helpers'
import TxSignature from 'minterjs-tx/src/tx-signature'

// Tx wrapper
export async function handleTx (txData: PreparedTxData, type: string, payload: string, gasCoin: string): Promise<string> {
  const seed = await vault.getActiveWalletSeed()
  const address = await vault.getActiveWalletAddress()
  const nonce = +(await gate.getNonce(address)) + 1
  const privateKey = Wallet.getPrivateKey(seed)

  const tx = new Tx({
    nonce,
    chainId: '0x01',
    gasPrice: '0x01',
    gasCoin: coinToBuffer(gasCoin),
    type,
    data: txData.serialize(),
    signatureType: '0x01',
    payload: `0x${Buffer.from(payload, 'utf-8').toString('hex')}`
  })

  tx.signatureData = (new TxSignature()).sign(tx.hash(false), privateKey).serialize()

  return gate.txSend(tx.serialize().toString('hex'))
}
