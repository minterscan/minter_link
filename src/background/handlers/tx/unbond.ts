import { handleTx } from './tx'
import { Letter } from '@/model/Letter'
import { TX_TYPE } from 'minterjs-tx/src/tx-types'
import { mPrefixToHex, convertToPip } from 'minterjs-util'
import TxDataUnbond from 'minterjs-tx/src/tx-data/unbond'
import { PreparedTxData, TxUnbondRequest } from '@/model/Tx'

// Tx.Unbond
export async function handleTxUnbond (message: Letter): Promise<string> {
  const data: TxUnbondRequest = message.body
  const txData: PreparedTxData = new TxDataUnbond({
    publicKey: mPrefixToHex(data.pubKey),
    coin: data.coin,
    stake: `0x${convertToPip(data.stake, 'hex')}`
  })
  const hash = await handleTx(txData, TX_TYPE.UNBOND, data.payload, data.gasCoin)

  return hash
}
