<script setup>
import { ref } from 'vue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import Checkbox from 'primevue/checkbox'
import { Form } from '@primevue/forms'
import Message from 'primevue/message'

const modelValue = defineModel()

const rules = z.object({
  name: z.string().min(1, { message: 'Название обязательно для заполнение' }),
  url: z.url({ message: 'Некорректная ссылка' }),
})

const resolver = ref(zodResolver(rules))

const formInputs = ref({
  name: '',
  url: '',
  description: '',
  category: null,
  isFavorite: false,
})

const categoriesList = ref([{ id: 1, name: 'Test' }])

const addLink = () => {
  console.log('addLink')
}
</script>

<template>
  <Dialog modal header="Создание ссылки" v-model:visible="modelValue" class="w-[25rem]">
    <Form
      v-slot="$form"
      :initial-values="formInputs"
      :resolver="resolver"
      validateOnSubmit
      :validateOnValueUpdate="false"
      @submit="addLink"
    >
      <div class="mb-3">
        <InputText
          name="name"
          v-model="formInputs.name"
          class="w-full"
          autocomplete="off"
          placeholder="Название ссылки"
        />
        <Message v-if="$form.name?.invalid" severity="error" variant="simple" size="small">
          {{ $form.name.error.message }}
        </Message>
      </div>
      <div class="mb-3">
        <InputText
          name="url"
          v-model="formInputs.url"
          class="w-full"
          autocomplete="off"
          placeholder="Ссылка"
        />
        <Message v-if="$form.url?.invalid" severity="error" variant="simple" size="small">
          {{ $form.url.error.message }}
        </Message>
      </div>
      <div class="mb-3">
        <Select
          v-model="formInputs.category"
          :options="categoriesList"
          optionLabel="name"
          placeholder="Выберите категорию"
          class="w-full"
        />
      </div>
      <div class="mb-3">
        <Textarea
          v-model="formInputs.description"
          class="w-full resize-none"
          placeholder="Описание"
        />
      </div>
      <div class="mb-3 flex items-center gap-2">
        <Checkbox v-model="formInputs.isFavorite" inputId="isFavorite" binary />
        <label for="isFavorite">Добавить в избранное</label>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <Button label="Добавить" type="submit" />
      </div>
    </Form>
  </Dialog>
</template>
