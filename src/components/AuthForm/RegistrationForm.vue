<script setup>
import { ref } from 'vue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Form } from '@primevue/forms'
import { useToastNofitications } from '@/composables/useToastNofitications.js'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Toast from 'primevue/toast'
import { supabase } from '@/supabase.js'

const { showToast } = useToastNofitications()

const formData = ref({
  email: '',
  password: '',
  firstName: '',
})

const rules = z.object({
  email: z.email({ message: 'Введите корректный email' }),
  password: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
  firstName: z.string().min(1, { message: 'Имя не может быть пустым' }),
})

const resolver = ref(zodResolver(rules))

const submitForm = async ({ valid }) => {
  if (!valid) return

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
  })
  if (error) {
    showToast('error', 'Ошибка', error)
  } else {
    showToast('success', 'Регистрация', 'Вы успешно зарегистрированы')
  }

  console.log(data, error)}
</script>

<template>
  <Toast />
  <Form
    v-slot="$form"
    :resolver="resolver"
    :initial-values="formData"
    :validate-on-blur="true"
    :validate-on-value-update="false"
    @submit="submitForm"
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
    <div class="mb-3">
      <InputText
        name="firstName"
        type="text"
        placeholder="Введите имя"
        v-model="formData.firstName"
        class="w-full"
      />
      <Message v-if="$form.firstName?.invalid" severity="error" variant="simple" size="small">{{
        $form.firstName.error.message
      }}</Message>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <Button type="submit" label="Регистрация" class="w-full" />
      <Button type="submit" label="GitHub" class="w-full" icon="pi pi-github" severity="contrast" />
    </div>
  </Form>
</template>
