<template>
  <ul class="cp wallet-actions-menu">
    <li><a-button icon="arrow-right" @click="send()">Send</a-button></li>
    <li><a-button icon="retweet" @click="convert()">Convert</a-button></li>
    <li><a-button icon="arrow-up" @click="delegate()">Delegate</a-button></li>
    <li><a-button icon="arrow-down" @click="unbond()">Unbond</a-button></li>
  </ul>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { AppEvent } from '@/model/App'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'WalletActionsMenu'
})
export default class WalletActionsMenu extends Base {
  send (): void {
    this.$root.$emit(AppEvent.WalletActionSendOpen)
  }

  convert () {
    this.$root.$emit(AppEvent.WalletActionConvertOpen)
  }

  delegate () {
    this.$root.$emit(AppEvent.WalletActionDelegateOpen)
  }

  unbond () {
    this.$root.$emit(AppEvent.WalletActionUnbondOpen)
  }
}
</script>
