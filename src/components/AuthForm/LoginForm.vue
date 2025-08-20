<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const formData = ref({
    email: '',
    password: ''
});

const emit = defineEmits(['reset-password']);
</script>

<template>
    <form>
      <div class="mb-3">
        <InputText name="email" type="text" placeholder="Введите email" v-model="formData.email" class="w-full" />
      </div>
      <div class="mb-3">
        <InputText name="password" type="password" placeholder="Введите пароль" v-model="formData.password" class="w-full" />
      </div>
      <span class="cursor-pointer mb-3 block" @click="emit('reset-password')">Забыли пароль?</span>
      <div class="grid grid-cols-2 gap-3">
        <Button type="submit" label="Войти" class="w-full" />
        <Button type="submit" label="GitHub" class="w-full" icon="pi pi-github" severity="contrast" />
      </div>
    </form>
</template>