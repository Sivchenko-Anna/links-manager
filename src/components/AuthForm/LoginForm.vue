<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const formData = ref({
    email: '',
    password: ''
});
</script>

<template>
    <form>
      <div class="mb-3">
        <InputText name="email" type="text" placeholder="Введите email" v-model="formData.email" class="w-full" />
      </div>
      <div class="mb-3">
        <InputText name="password" type="password" placeholder="Введите пароль" v-model="formData.password" class="w-full" />
      </div>
    </form>
</template>