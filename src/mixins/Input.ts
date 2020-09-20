import { Vue, Component } from 'vue-property-decorator'

/**
 * Auto-focus for element with ref=input
 */

@Component
export default class Input extends Vue {
  protected mounted () {
    this.focus()
  }

  protected focus () {
    if (!this.$refs.input) return

    const input = this.$refs.input as HTMLInputElement

    input.focus()
  }
}
