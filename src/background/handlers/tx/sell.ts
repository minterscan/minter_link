import { handleTx } from './tx'
import { Letter } from '@/model/Letter'
import { convertToPip } from 'minterjs-util'
import { TX_TYPE } from 'minterjs-tx/src/tx-types'
import TxDataSell from 'minterjs-tx/src/tx-data/sell'
import { PreparedTxData, TxSellRequest } from '@/model/Tx'

// Tx.SellCoin
export async function handleTxSell (message: Letter): Promise<string> {
  const data: TxSellRequest = message.body
  const txData: PreparedTxData = new TxDataSell({
    coinToBuy: data.coinIdToBuy,
    coinToSell: data.coinIdToSell,
    valueToSell: `0x${convertToPip(data.valueToSell, 'hex')}`,
    minimumValueToBuy: `0x${convertToPip(0, 'hex')}`
  })
  const hash = await handleTx(txData, TX_TYPE.SELL, data.payload, data.gasCoin)

  return hash
}
