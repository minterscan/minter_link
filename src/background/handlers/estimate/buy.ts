import gate from '@/providers/GateProvider'
import { Letter } from '@/model/Letter'
import { convertToPip } from 'minterjs-util'
import { EstimateBuyRequest, EstimateResponse } from '@/model/Estimate'

// Ignore snake case for Minter Explorer API data
/* eslint-disable @typescript-eslint/camelcase */

// Get Tx.BuyCoin estimate
export async function handleEstimateBuy (message: Letter): Promise<EstimateResponse> {
  const preparedData: EstimateBuyRequest = message.body

  preparedData.value_to_buy = convertToPip(preparedData.value_to_buy)

  return gate.estimateBuy(preparedData)
}
