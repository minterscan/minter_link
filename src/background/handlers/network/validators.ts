import Explorer from '@/providers/Explorer'
import { Validator } from '@/model/Validator'

// Get all available Minter validators
export async function handleGetNetworkValidators (): Promise<Validator[]> {
  return Explorer.getValidators()
}
