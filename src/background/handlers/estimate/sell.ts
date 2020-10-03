import gate from '@/providers/GateProvider'
import { Letter } from '@/model/Letter'
import { convertToPip } from 'minterjs-util'
import { EstimateSellRequest, EstimateResponse } from '@/model/Estimate'

// Get Tx.SellCoin estimate
export async function handleEstimateSell (message: Letter): Promise<EstimateResponse> {
  const preparedData: EstimateSellRequest = message.body

  preparedData.valueToSell = convertToPip(preparedData.valueToSell)

  return gate.estimateSell(preparedData)
}
