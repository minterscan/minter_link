import gate from '@/providers/GateProvider'
import { Letter } from '@/model/Letter'
import { convertToPip } from 'minterjs-util'
import { EstimateBuyRequest, EstimateResponse } from '@/model/Estimate'

// Get Tx.BuyCoin estimate
export async function handleEstimateBuy (message: Letter): Promise<EstimateResponse> {
  const preparedData: EstimateBuyRequest = message.body

  preparedData.valueToBuy = convertToPip(preparedData.valueToBuy)

  return gate.estimateBuy(preparedData)
}
