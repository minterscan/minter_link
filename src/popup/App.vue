<template>
  <app class="app popup" type="app" />
</template>

<script lang="ts">
import App from '@/App.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'PopupApp',
  components: { App }
})
export default class AppTab extends Vue {}
</script>
