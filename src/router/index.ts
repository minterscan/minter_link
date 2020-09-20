import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import { ERouter } from '@/model/Router'
import { authGuard } from '@/router/guards'

const routes = [
  {
    path: ERouter.Home,
    name: 'home',
    component: Home
  },
  {
    path: ERouter.AccountExport,
    name: 'account-export',
    meta: { protected: true },
    component: () => import(/* webpackChunkName: "import-account" */ '@/views/vault/VaultExport.vue')
  },
  {
    path: ERouter.AccountImport,
    name: 'account-import',
    component: () => import(/* webpackChunkName: "import-account" */ '@/views/vault/VaultImport.vue')
  },
  {
    path: ERouter.Vault,
    name: 'vault',
    meta: { protected: true },
    component: () => import(/* webpackChunkName: "vault" */ '@/views/vault/Vault.vue')
  },
  {
    path: ERouter.VaultNewWallet,
    name: 'vault-new-wallet',
    meta: { protected: true },
    component: () => import(/* webpackChunkName: "vault-add-wallet" */ '@/views/vault/VaultNewWallet.vue')
  },
  {
    path: ERouter.VaultImportWallet,
    name: 'vault-import-wallet',
    meta: { protected: true },
    component: () => import(/* webpackChunkName: "vault-add-wallet" */ '@/views/vault/VaultImportWallet.vue')
  },
  {
    path: ERouter.AddressBook,
    name: 'address-book',
    meta: { protected: true },
    component: () => import(/* webpackChunkName: "contacts" */ '@/views/address-book/AddressBook.vue')
  },
  {
    path: ERouter.RequestPayment,
    name: 'request-payment',
    meta: { protected: true },
    component: () => import(/* webpackChunkName: "request-payment" */ '@/views/requests/Payment.vue')
  },
  {
    path: ERouter.RequestConnect,
    name: 'request-connect',
    meta: { protected: true },
    component: () => import(/* webpackChunkName: "request-connect" */ '@/views/requests/Connect.vue')
  },
  {
    path: ERouter.RequestSign,
    name: 'request-sign',
    meta: { protected: true },
    component: () => import(/* webpackChunkName: "request-sign" */ '@/views/requests/Sign.vue')
  },
  {
    path: ERouter.Settings,
    name: 'settings',
    meta: { protected: true },
    component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue')
  },
  {
    path: ERouter.About,
    name: 'about',
    meta: { protected: true },
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(authGuard)

export default router
