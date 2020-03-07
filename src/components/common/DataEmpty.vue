<template>
  <div class="empty">{{ text }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DataEmpty extends Vue {
  @Prop({ default: '' }) text!: string
}
</script>
