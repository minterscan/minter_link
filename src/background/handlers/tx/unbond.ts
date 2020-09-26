import { handleTx } from './tx'
import { Letter } from '@/model/Letter'
import { TX_TYPE } from 'minterjs-tx/src/tx-types'
import { coinToBuffer } from 'minterjs-tx/src/helpers'
import { toBuffer, convertToPip } from 'minterjs-util'
import TxDataUnbond from 'minterjs-tx/src/tx-data/unbond'
import { PreparedTxData, TxUnbondRequest } from '@/model/Tx'

// Tx.Unbond
export async function handleTxUnbond (message: Letter): Promise<string> {
  const data: TxUnbondRequest = message.body
  const txData: PreparedTxData = new TxDataUnbond({
    pubKey: toBuffer(data.pubKey),
    coin: coinToBuffer(data.coin),
    stake: `0x${convertToPip(data.stake, 'hex')}`
  })
  const result = await handleTx(txData, TX_TYPE.UNBOND, data.payload, data.gasCoin)

  return result.data.data.hash
}
