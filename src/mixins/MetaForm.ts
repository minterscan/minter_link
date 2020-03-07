import Base from '@/mixins/Base'
import { Component, Mixins } from 'vue-property-decorator'

/**
 * Wallet Meta form
 */

@Component
export default class MetaForm extends Mixins(Base) {
  protected label = ''
  protected color = ''

  changeLabel (label: string) {
    this.label = label
  }

  changeColor (color: string) {
    this.color = color
  }
}
