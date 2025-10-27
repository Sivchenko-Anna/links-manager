import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'

const LIMIT = 2

export const useLinksStore = defineStore('links', () => {
  const isLoading = ref(false)
  const links = ref([])
  const onlyFavorites = ref(false)
  const sortByPopular = ref(false)
  const totalLinks = ref(0)
  const hasMoreLinks = ref(true)
  const offset = ref(0)

  const fetchLinks = async () => {
    isLoading.value = true
    try {
      let query = supabase
        .from('links')
        .select(
          'id, name, url, description, is_favorite, preview_image, categories (id, name), click_count',
          { count: 'exact' },
        )
        .range(offset.value, offset.value + LIMIT - 1)

      if (onlyFavorites.value) query = query.eq('is_favorite', true)
      if (sortByPopular.value) {
        query = query.order('click_count', { ascending: false })
      } else {
        query = query.order('created_at', { ascending: false })
      }

      const { data, error, count } = await query
      if (error) throw error

      totalLinks.value = count
      offset.value += data.length
      links.value.push(...data)
      hasMoreLinks.value = offset.value < totalLinks.value
    } catch (e) {
      console.error('Ошибка загрузки', e)
    } finally {
      isLoading.value = false
    }
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

  const removeLink = async (id) => {
    const { error } = await supabase.from('links').delete().eq('id', id)
    if (error) throw error
    links.value = links.value.filter((link) => link.id !== id)
  }

  const addClickCount = async (id) => {
    const index = links.value.findIndex((link) => link.id === id)
    if (index !== -1) {
      const newClickCount = links.value[index].click_count + 1

      const { error } = await supabase
        .from('links')
        .update({ click_count: newClickCount })
        .eq('id', id)
      if (error) throw error
      links.value[index].click_count = newClickCount
    }
  }

  return {
    isLoading,
    links,
    fetchLinks,
    changeIsFavorite,
    removeLink,
    addClickCount,
    onlyFavorites,
    sortByPopular,
    hasMoreLinks,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLinksStore, import.meta.hot))
}
