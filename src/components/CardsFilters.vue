<script setup>
import Checkbox from 'primevue/checkbox'
import { useLinksStore } from '@/stores/linksStore.js'

const linksStore = useLinksStore()

const updateFilters = () => {
  linksStore.fetchLinks()
}
</script>

<template>
  <div class="md:flex gap-5 justify-center block">
    <div class="mb-3 flex items-center gap-2">
      <Checkbox inputId="sortByPopular" name="sortByPopular" binary />
      <label for="sortByPopular">Сначала популярные</label>
    </div>
    <div class="mb-3 flex items-center gap-2">
      <Checkbox
        v-model="linksStore.onlyFavorites"
        inputId="onlyFavorites"
        name="onlyFavorites"
        binary
        @change="updateFilters"
      />
      <label for="onlyFavorites">Только избранные</label>
    </div>
  </div>
</template>
