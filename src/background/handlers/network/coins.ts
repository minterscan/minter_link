import { Coin } from '@/model/Coin'
import Explorer from '@/providers/ExplorerProvider'

// Get all available Minter coins
export async function handleGetNetworkCoins (): Promise<Coin[]> {
  return Explorer.getCoins()
}
