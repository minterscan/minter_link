import { Coin } from '@/model/Coin'
import Explorer from '@/providers/Explorer'

// Get all available Minter coins
export async function handleGetCoins (): Promise<Coin[]> {
  return Explorer.getCoins()
}
