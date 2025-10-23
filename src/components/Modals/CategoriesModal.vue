<script setup>
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import { Form } from '@primevue/forms'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const modelValue = defineModel()
const categoryName = ref('')
const categories = ref([
  {
    id: 1,
    name: 'Category 1',
  },
  {
    id: 2,
    name: 'Category 2',
  },
])

const saveCategory = () => {
  console.log('saveCategory')
}

const deleteCategory = (id) => {
  console.log('deleteCategory', id)
}
</script>

<template>
  <Dialog header="Категории" v-model:visible="modelValue" class="w-[25rem]">
    <Form @submit="saveCategory">
      <InputText
        v-model="categoryName"
        class="flex-auto w-full"
        autocomplete="off"
        placeholder="Название новой категории"
      />
      <div class="flex justify-end gap-2 mt-4">
        <Button type="button" label="Добавить категорию" @click="saveCategory" />
      </div>
      <div
        class="grid mt-3 grid-cols-[1fr_32px] mb-1 gap-5"
        v-for="category in categories"
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
