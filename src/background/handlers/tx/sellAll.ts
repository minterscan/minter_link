import { handleTx } from './tx'
import { Letter } from '@/model/Letter'
import { convertToPip } from 'minterjs-util'
import { TX_TYPE } from 'minterjs-tx/src/tx-types'
import { coinToBuffer } from 'minterjs-tx/src/helpers'
import TxDataSellAll from 'minterjs-tx/src/tx-data/sell-all'
import { PreparedTxData, TxSellAllRequest } from '@/model/Tx'

// Tx.SellAllCoin
export async function handleTxSellAll (message: Letter): Promise<string> {
  const data: TxSellAllRequest = message.body
  const txData: PreparedTxData = new TxDataSellAll({
    coinToBuy: coinToBuffer(data.coinToBuy),
    coinToSell: coinToBuffer(data.coinToSell),
    minimumValueToBuy: `0x${convertToPip(0, 'hex')}`
  })
  const hash = await handleTx(txData, TX_TYPE.SELL_ALL, data.payload, data.gasCoin)

  return hash
}
