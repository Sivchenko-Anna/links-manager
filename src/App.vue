<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js';
import AppHeader from '@/components/AppHeader.vue';

const userStore = useUserStore();
onMounted(async() => {
  await userStore.getUser()
})
</script>

<template>
  <AppHeader />
  <RouterView />
</template>
