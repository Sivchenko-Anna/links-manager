<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const formData = ref({
    email: '',
});
</script>

<template>
    <form>
      <div class="mb-3">
        <InputText name="email" type="text" placeholder="Введите email" v-model="formData.email" class="w-full" />
      </div>
      <div class="grid">
        <Button type="submit" label="Сброс пароля" class="w-full" />
      </div>
    </form>
</template>