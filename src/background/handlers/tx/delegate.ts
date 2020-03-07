import { handleTx } from './tx'
import { AxiosResponse } from 'axios'
import { Letter } from '@/model/Letter'
import { TX_TYPE } from 'minterjs-tx/src/tx-types'
import { coinToBuffer } from 'minterjs-tx/src/helpers'
import { toBuffer, convertToPip } from 'minterjs-util'
import TxDataDelegate from 'minterjs-tx/src/tx-data/delegate'
import { PreparedTxData, TxDelegateRequest } from '@/model/Tx'

// Tx.Delegate
export async function handleTxDelegate (message: Letter): Promise<AxiosResponse> {
  const data: TxDelegateRequest = message.body
  const txData: PreparedTxData = new TxDataDelegate({
    pubKey: toBuffer(data.pubKey),
    coin: coinToBuffer(data.coin),
    stake: `0x${convertToPip(data.stake, 'hex')}`
  })

  return handleTx(txData, TX_TYPE.DELEGATE, message.body.payload)
}
