<script setup>
import { ref } from 'vue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Form } from '@primevue/forms'
import { useToastNofitications } from '@/composables/useToastNofitications.js'
import { useAuth } from '@/composables/useAuth'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'

const { showToast } = useToastNofitications()
const { resetPassword, loading, errorMessage } = useAuth()

const email = ref('')
const rules = z.object({
  email: z.email({ message: 'Введите корректный email' }),
})

const resolver = ref(zodResolver(rules))
const handleSubmit = async ({ valid }) => {
  if (!valid) return
  try {
    await resetPassword (email.value)
    showToast('success', 'Ссылка для сброса пароля уже на вашей почте')
  } catch {
    showToast('error', 'Ошибка входа', errorMessage.value)
  }
}
</script>

<template>
  <Form
    v-slot="$form"
    :resolver="resolver"
    :initial-values="{ email }"
    :validate-on-blur="true"
    :validate-on-value-update="false"
    @submit="handleSubmit"
  >
    <div class="mb-3">
      <InputText
        name="email"
        type="text"
        placeholder="Введите email"
        v-model="email"
        class="w-full"
      />
      <Message v-if="$form.email?.invalid" severity="error" variant="simple" size="small">{{
        $form.email.error.message
      }}</Message>
    </div>
    <div class="grid">
      <Button type="submit" label="Сброс пароля" class="w-full" :loading="loading" />
    </div>
  </Form>
</template>
