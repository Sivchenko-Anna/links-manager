<script setup>
import { onMounted } from 'vue'
import { useLinksStore } from '@/stores/linksStore.js'
import Button from 'primevue/button'
import AppLoader from '@/components/AppLoader.vue'

const linksStore = useLinksStore()

onMounted(async () => {
  if (window.location.hash) {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const accessToken = hashParams.get('access_token')

    if (accessToken) {
      window.history.replaceState(null, null, window.location.pathname)
    }
  }

  await linksStore.fetchLinks()
})
</script>

<template>
  <AppLoader v-if="linksStore.isLoading" />
  <div v-else>
    <h2 v-if="!linksStore.links.length" class="font-bold text-center">
      Вы пока еще не добавили ссылок
    </h2>
    <template v-else> Здесь будут ссылки </template>
  </div>
</template>
