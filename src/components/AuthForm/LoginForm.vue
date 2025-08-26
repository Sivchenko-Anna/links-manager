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
  password: '',
})

const emit = defineEmits(['reset-password'])

const rules = z.object({
  email: z.email({ message: 'Введите корректный email' }),
  password: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
})

const resolver = ref(zodResolver(rules))

const handleSubmit = async ({ valid }) => {
  console.log('Form submitted:', valid)
}
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
    <div class="mb-3">
      <InputText
        name="password"
        type="password"
        placeholder="Введите пароль"
        v-model="formData.password"
        class="w-full"
      />
      <Message v-if="$form.password?.invalid" severity="error" variant="simple" size="small">{{
        $form.password.error.message
      }}</Message>
    </div>
    <span class="cursor-pointer mb-3 block" @click="emit('reset-password')">Забыли пароль?</span>
    <div class="grid grid-cols-2 gap-3">
      <Button type="submit" label="Войти" class="w-full" />
      <Button type="submit" label="GitHub" class="w-full" icon="pi pi-github" severity="contrast" />
    </div>
  </Form>
</template>
