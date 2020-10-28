import config from '@/config'
import Base from '@/mixins/Base'
import Antd from 'ant-design-vue'
import VueRouter from 'vue-router'
import Centrifuge from 'centrifuge'
import { ERouter } from '@/model/Router'
import PostmanService from '@/services/Postman'
import { CryptoService } from '@/services/Crypto'
import { browser } from 'webextension-polyfill-ts'
import { mount, createLocalVue } from '@vue/test-utils'
import MinterWsProvider from '@/providers/MinterWsProvider'

const localVue = createLocalVue()
localVue.use(Antd)
localVue.use(VueRouter)

jest.mock('centrifuge')

const instance = new Base()
const router = new VueRouter()

it('get ws', () => {
  const ws = instance.ws

  expect(Centrifuge).toHaveBeenCalled()
  expect(ws).toBeInstanceOf(MinterWsProvider)
})

it('get ui', () => {
  expect(instance.ui).toHaveProperty('loading')
})

it('get state', () => {
  expect(instance.state).toHaveProperty('vault')
})

it('get network', () => {
  expect(instance.network).toHaveProperty('status')
})

it('get settings', () => {
  expect(instance.settings).toHaveProperty('autoLock')
})

it('get addressBook', () => {
  expect(instance.addressBook).toHaveProperty('book')
})

it('get crypto', () => {
  expect(instance.crypto).toBeInstanceOf(CryptoService)
})

it('get postman', () => {
  expect(instance.postman).toBeInstanceOf(PostmanService)
})

it('get config', () => {
  expect(instance.config).toEqual(config)
})

it('translate', () => {
  instance.t('foo')

  expect(browser.i18n.getMessage).toHaveBeenCalledWith('foo')
})

it('navigate', async () => {
  const wrapper = mount({
    template: '<div></div>',
    mixins: [Base]
  }, {
    localVue,
    router
  })

  await (wrapper.vm as Base).navigate(ERouter.Home)
  await (wrapper.vm as Base).navigate(ERouter.About)
  expect(wrapper.vm.$route.path).toEqual(ERouter.About)
})
