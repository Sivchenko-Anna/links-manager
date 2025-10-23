<script setup>
import Dialog from 'primevue/dialog'

const modelValue = defineModel()
</script>

<template>
  <Dialog header="Категории" v-model:visible="modelValue">
    <p>Modal</p>
  </Dialog>
</template>

<style scoped></style>
