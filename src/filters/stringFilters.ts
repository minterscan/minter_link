import Vue from 'vue'
import { base64decode, shortenString, getReadableTxType } from '@/services/Util'

Vue.filter('base64', base64decode)
Vue.filter('short', shortenString)
Vue.filter('txType', getReadableTxType)
