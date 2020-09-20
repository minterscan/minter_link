import Base from '@/mixins/Base'
import { Component, Mixins } from 'vue-property-decorator'

/**
 * Wallet Meta form
 */

@Component
export default class MetaForm extends Mixins(Base) {
  protected label = ''
  protected icon = ''

  changeLabel (label: string) {
    this.label = label
  }

  changeIcon (icon: string) {
    this.icon = icon
  }
}
