<script setup>
import { onMounted } from 'vue'
import { useLinksStore } from '@/stores/linksStore.js'
import Button from 'primevue/button'
import AppLoader from '@/components/AppLoader.vue'
import LinkCard from '@/components/LinkCard.vue'
import CardsFilters from '@/components/CardsFilters.vue'

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
    <CardsFilters />
    <h2 v-if="!linksStore.links.length" class="font-bold text-center">
      Вы пока еще не добавили ссылок
    </h2>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <LinkCard v-for="link in linksStore.links" :key="link.id" :link="link" />
    </div>
    <div class="flex justify-center mt-3">
      <Button
        v-if="linksStore.hasMoreLinks"
        label="Показать еще"
        :loading="linksStore.isLoading"
        @click="linksStore.fetchLinks()"
      />
    </div>
  </div>
</template>
