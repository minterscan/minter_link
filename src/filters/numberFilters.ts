import Vue from 'vue'
import { pretty, pipToBip, toFixed, timestamp } from '@/services/Util'

Vue.filter('sato', pipToBip)
Vue.filter('pretty', pretty)
Vue.filter('toFixed', toFixed)
Vue.filter('timestamp', timestamp)
