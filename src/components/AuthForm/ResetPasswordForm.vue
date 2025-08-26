<script setup>
import { ref } from 'vue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Form } from '@primevue/forms'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'

const formData = ref({
  email: '',
})

const rules = z.object({
  email: z.email({ message: 'Введите корректный email' }),
})

const resolver = ref(zodResolver(rules))
</script>

<template>
  <Form
    v-slot="$form"
    :resolver="resolver"
    :initial-values="formData"
    :validate-on-blur="true"
    :validate-on-value-update="false"
    @submit="handleSubmit"
  >
    <div class="mb-3">
      <InputText
        name="email"
        type="text"
        placeholder="Введите email"
        v-model="formData.email"
        class="w-full"
      />
      <Message v-if="$form.email?.invalid" severity="error" variant="simple" size="small">{{
        $form.email.error.message
      }}</Message>
    </div>
    <div class="grid">
      <Button type="submit" label="Сброс пароля" class="w-full" />
    </div>
  </Form>
</template>
