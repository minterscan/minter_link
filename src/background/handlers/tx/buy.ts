import { handleTx } from './tx'
import { Letter } from '@/model/Letter'
import { convertToPip } from 'minterjs-util'
import { TX_TYPE } from 'minterjs-tx/src/tx-types'
import TxDataBuy from 'minterjs-tx/src/tx-data/buy'
import { coinToBuffer } from 'minterjs-tx/src/helpers'
import { TxBuyRequest, PreparedTxData } from '@/model/Tx'

const MAX_VALUE_TO_SELL = Number.MAX_SAFE_INTEGER

// Tx.BuyCoin
export async function handleTxBuy (message: Letter): Promise<string> {
  const data: TxBuyRequest = message.body
  const txData: PreparedTxData = new TxDataBuy({
    coinToBuy: coinToBuffer(data.coinToBuy),
    coinToSell: coinToBuffer(data.coinToSell),
    valueToBuy: `0x${convertToPip(data.valueToBuy, 'hex')}`,
    maximumValueToSell: `0x${convertToPip(MAX_VALUE_TO_SELL, 'hex')}`
  })
  const hash = await handleTx(txData, TX_TYPE.BUY, data.payload, data.gasCoin)

  return hash
}
