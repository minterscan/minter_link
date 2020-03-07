import { MutationPayload } from 'vuex'
import { Vue, Component } from 'vue-property-decorator'

/**
 * Debug Vuex mutations
 */

@Component
export default class Debug extends Vue {
  constructor () {
    super()

    this.$store.subscribe((mutation: MutationPayload) => {
      console.info(mutation.type, mutation.payload)
    })
  }
}
