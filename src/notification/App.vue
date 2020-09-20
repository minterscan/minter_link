<template>
  <app class="app notification" type="notification" />
</template>

<script lang="ts">
import App from '@/App.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'NotificationApp',
  components: { App }
})
export default class AppNotification extends Vue {}
</script>
