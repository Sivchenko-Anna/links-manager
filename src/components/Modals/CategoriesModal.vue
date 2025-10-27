<script setup>
import { ref, watch } from 'vue'
import { supabase } from '@/supabase.js'
import { useToastNofitications } from '@/composables/useToastNofitications.js'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { Form } from '@primevue/forms'
import Skeleton from 'primevue/skeleton'

const modelValue = defineModel()
const { showToast } = useToastNofitications()

const categoryName = ref('')
const categoriesList = ref([])
const isLoading = ref(false)
const isLoadingModal = ref(true)

const getCategories = async () => {
  isLoadingModal.value = true
  try {
    const { data, error } = await supabase.from('categories').select()
    if (error) {
      throw error
    }
    categoriesList.value = data
    isLoadingModal.value = false
  } catch {
    showToast('error', 'Ошибка', 'Не удалось получить категории')
  }
}

watch(modelValue, async (newValue) => {
  if (newValue) await getCategories()
})

const saveCategory = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert({ name: categoryName.value })
      .select()
    if (error) {
      throw error
    }
    categoriesList.value.push(data[0])
    categoryName.value = ''
    showToast('success', 'Успех', 'Категория успешно добавлена')
  } catch {
    showToast('error', 'Ошибка', 'При добавлении категории произошла ошибка')
  } finally {
    isLoading.value = false
  }
}

const deleteCategory = async (id) => {
  isLoadingModal.value = true
  try {
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) {
      throw error
    }
    categoriesList.value = categoriesList.value.filter((category) => category.id !== id)
    showToast('success', 'Успех', 'Категория успешно удалена')
    isLoadingModal.value = false
  } catch {
    showToast('error', 'Ошибка', 'При удалении категории произошла ошибка')
  }
}
</script>

<template>
  <Toast />
  <Dialog modal header="Категории" v-model:visible="modelValue" class="w-[25rem]">
    <template v-if="isLoadingModal">
      <div class="grid mt-3 grid-cols-[1fr_32px] mb-1 items-center gap-5">
        <Skeleton width="100%" />
        <Skeleton shape="circle" size="2rem" />
      </div>
    </template>
    <template v-else>
      <Form @submit="saveCategory">
        <InputText
          v-model="categoryName"
          class="flex-auto w-full"
          autocomplete="off"
          placeholder="Название новой категории"
        />
        <div class="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            label="Добавить категорию"
            @click="saveCategory"
            :loading="isLoading"
          />
        </div>
        <div
          class="grid mt-3 grid-cols-[1fr_32px] mb-1 gap-5"
          v-for="category in categoriesList"
          :key="category.id"
        >
          {{ category.name }}
          <Button
            type="button"
            rounded
            size="small"
            variant="text"
            icon="pi pi-times"
            @click="deleteCategory(category.id)"
          />
        </div>
      </Form>
    </template>
  </Dialog>
</template>
