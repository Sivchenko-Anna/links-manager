import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'

export const useLinksStore = defineStore('links', () => {
  const isLoading = ref(false)
  const links = ref([])

  const fetchLinks = async () => {
    isLoading.value = true
    console.log(isLoading.value)
    const { data, error } = await supabase
      .from('links')
      .select(
        'id, name, url, description, is_favorite, preview_image, categories (id, name), click_count',
      )
      .order('created_at', { ascending: false })

    if (error) throw error
    links.value = data
    isLoading.value = false
  }

  const changeIsFavorite = async (id) => {
    const index = links.value.findIndex((link) => link.id === id)
    if (index !== -1) {
      const newFavoriteState = !links.value[index].is_favorite
      const { error } = await supabase
        .from('links')
        .update({ is_favorite: newFavoriteState })
        .eq('id', id)
      if (error) throw error
      links.value[index].is_favorite = newFavoriteState
    }
  }

  return { isLoading, links, fetchLinks, changeIsFavorite }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLinksStore, import.meta.hot))
}
