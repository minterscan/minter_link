<template>
  <ul class="cp wallet-actions-menu">
    <li><a-button type="primary" icon="arrow-right" @click="send()">Send</a-button></li>
    <li><a-button type="primary" icon="retweet" @click="convert()">Convert</a-button></li>
    <li><a-button type="primary" icon="arrow-up" @click="delegate()">Delegate</a-button></li>
    <li><a-button type="primary" icon="arrow-down" @click="unbond()">Unbond</a-button></li>
  </ul>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { AppEvent } from '@/model/App'
import { Component } from 'vue-property-decorator'

@Component
export default class WalletActionsMenu extends Base {
  send (): void {
    this.$root.$emit(AppEvent.WalletActionSendOpen)
  }

  convert (): void {
    this.$root.$emit(AppEvent.WalletActionConvertOpen)
  }

  delegate (): void {
    this.$root.$emit(AppEvent.WalletActionDelegateOpen)
  }

  unbond (): void {
    this.$root.$emit(AppEvent.WalletActionUnbondOpen)
  }
}
</script>
