import gate from '@/providers/GateProvider'
import { Letter } from '@/model/Letter'
import { convertToPip } from 'minterjs-util'
import { EstimateSellRequest, EstimateResponse } from '@/model/Estimate'

// Ignore snake case for Minter Explorer API data
/* eslint-disable @typescript-eslint/camelcase */

// Get Tx.SellCoin estimate
export async function handleEstimateSell (message: Letter): Promise<EstimateResponse> {
  const preparedData: EstimateSellRequest = message.body

  preparedData.value_to_sell = convertToPip(preparedData.value_to_sell)

  return gate.estimateSell(preparedData)
}
