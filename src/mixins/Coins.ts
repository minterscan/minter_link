import RootStore from '@/store'
import NetworkStore from '@/store/network'
import { getModule } from 'vuex-module-decorators'
import { Vue, Component } from 'vue-property-decorator'

const network = getModule(NetworkStore, RootStore)

@Component
export default class Coins extends Vue {
  getCoin (id: number): string {
    return network.coins.find(item => item.id === id)?.symbol ?? 'coin not found'
  }
}
