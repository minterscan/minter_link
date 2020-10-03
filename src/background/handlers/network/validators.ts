import Explorer from '@/providers/ExplorerProvider'
import { Validator } from '@/model/Validator'

// Get all available Minter validators
export async function handleGetNetworkValidators (): Promise<Validator[]> {
  return Explorer.getValidators()
}
