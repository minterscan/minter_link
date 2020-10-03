import { handleTx } from './tx'
import { Letter } from '@/model/Letter'
import { TX_TYPE } from 'minterjs-tx/src/tx-types'
import TxDataSend from 'minterjs-tx/src/tx-data/send'
import { coinToBuffer } from 'minterjs-tx/src/helpers'
import { toBuffer, convertToPip } from 'minterjs-util'
import { TxSendRequest, PreparedTxData } from '@/model/Tx'

// Tx.Send
export async function handleTxSend (message: Letter): Promise<string> {
  const data: TxSendRequest = message.body
  const txData: PreparedTxData = new TxDataSend({
    to: toBuffer(data.address),
    coin: coinToBuffer(data.coin),
    value: `0x${convertToPip(data.amount, 'hex')}`
  })
  const hash = await handleTx(txData, TX_TYPE.SEND, data.payload, data.gasCoin)

  return hash
}
