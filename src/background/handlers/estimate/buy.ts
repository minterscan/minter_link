import gate from '@/providers/Gate'
import { Letter } from '@/model/Letter'
import { convertToPip } from 'minterjs-util'
import { EstimateBuyRequest, EstimateResponse } from '@/model/Estimate'

// Get Tx.BuyCoin estimate
export async function handleEstimateBuy (message: Letter): Promise<EstimateResponse> {
  const preparedData: EstimateBuyRequest = message.body
  preparedData.valueToBuy = convertToPip(preparedData.valueToBuy)

  return (await gate.estimateBuy(preparedData)).data.data
}
