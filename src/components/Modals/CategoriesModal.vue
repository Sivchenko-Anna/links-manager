<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase.js'
import { useToastNofitications } from '@/composables/useToastNofitications.js'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { Form } from '@primevue/forms'

const modelValue = defineModel()
const categoryName = ref('')
const categoriesList = ref([])

const { showToast } = useToastNofitications()
const isLoading = ref(false)

const saveCategory = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase.from('categories').insert({ name: categoryName.value }).select()
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

const deleteCategory = (id) => {
  console.log('deleteCategory', id)
  showToast('success', 'Успех', 'Категория успешно удалена')
}
</script>

<template>
  <Toast />
  <Dialog header="Категории" v-model:visible="modelValue" class="w-[25rem]">
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
  </Dialog>
</template>
