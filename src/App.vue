<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'
import AppHeader from '@/components/AppHeader.vue'
import Toast from 'primevue/toast'

const userStore = useUserStore()
onMounted(async () => {
  await userStore.getUser()
})
</script>

<template>
  <Toast />
  <AppHeader v-if="userStore.user" />
  <RouterView />
</template>
