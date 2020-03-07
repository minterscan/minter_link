import UI from '@/store/ui'
import RootStore from '@/store'
import State from '@/store/state'
import { Route } from 'vue-router'
import { ERouter } from '@/model/Router'
import postman from '@/services/Postman'
import { getModule } from 'vuex-module-decorators'

const ui = getModule(UI, RootStore)
const state = getModule(State, RootStore)

/**
 * Get actual Keyring key expiration, Vault status & Vault exist from background
 * Set data to Vuex
 */
async function tryAccessVault () {
  const expiry = await postman.getPasswordExpiry()
  const status = await postman.getVaultStatus()
  const vaultExist = await postman.getVaultExist()

  if (expiry) { state.commitExpiry(expiry) }
  if (status) { state.commitLoggedIn(true) }
  if (vaultExist) { state.commitVaultExist(vaultExist) }
}

/**
 * Auth guard for routes with 'protected === true' in meta
 *
 * @param to
 * @param from
 * @param next
 */
export async function authGuard (to: Route, from: Route, next: Function) {
  try {
    ui.commitLoading(true)
    await tryAccessVault()

    if (!to.meta.protected) next()

    if (!from.name && to.path === ERouter.Home && state.loggedIn) {
      next(ERouter.Vault)
    }

    if (to.meta.protected && !state.loggedIn) {
      next(ERouter.Home)
    }

    next()
  } catch (e) {
    ui.commitError(e.message)
  } finally {
    ui.commitLoading(false)
  }
}
