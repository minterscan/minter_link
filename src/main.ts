import store from '@/store'
import router from '@/router'
import Antd from 'ant-design-vue'
import VueRouter from 'vue-router'
import Vue, { VueConstructor } from 'vue'
import '@/mixins/Icons'
import '@/styles/main.scss'
import '@/filters/stringFilters'
import '@/filters/numberFilters'
import 'ant-design-vue/dist/antd.less'

export default function init (App: VueConstructor) {
  Vue.use(Antd)
  Vue.use(VueRouter)
  Vue.config.productionTip = false

  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
}
