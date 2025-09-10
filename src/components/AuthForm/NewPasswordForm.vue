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
const { updatePassword, loading, errorMessage } = useAuth()

const password = ref('')

const rules = z.object({
  password: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
})

const resolver = ref(zodResolver(rules))

const handleSubmit = async ({ valid }) => {
  if (!valid) return
  try {
    await updatePassword(password.value)
  } catch {
    showToast('error', 'Ошибка при создании нового пароля', errorMessage.value)
  }
}
</script>

<template>
  <Form
    v-slot="$form"
    :resolver="resolver"
    :initial-values="{ password }"
    :validate-on-blur="true"
    :validate-on-value-update="false"
    @submit="handleSubmit"
  >
    <div class="mb-3">
      <InputText
        name="password"
        type="password"
        placeholder="Введите новый пароль"
        v-model="password"
        class="w-full"
      />
      <Message v-if="$form.password?.invalid" severity="error" variant="simple" size="small">{{
        $form.password.error.message
      }}</Message>
    </div>
    <Button type="submit" label="Задать новый пароль" class="w-full" :loading="loading" />
  </Form>
</template>