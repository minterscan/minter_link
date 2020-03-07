import Explorer from '@/providers/Explorer'
import { Validator } from '@/model/Validator'

// Get all available Minter validators
export async function handleGetValidators (): Promise<Validator[]> {
  return Explorer.getValidators()
}
