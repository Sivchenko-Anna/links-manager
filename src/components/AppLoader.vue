<script setup>
import ProgressSpinner from 'primevue/progressspinner'
</script>

<template>
  <div class="flex justify-center">
    <ProgressSpinner
      class="w-[50px] h-[50px]"
      strokeWidth="4"
      fill="transparent"
      animationDuration=".5s"
    />
  </div>
</template>
