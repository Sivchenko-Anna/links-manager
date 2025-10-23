<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'
import { useAuth } from '@/composables/useAuth'
import { useToastNofitications } from '@/composables/useToastNofitications.js'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Menubar from 'primevue/menubar'
import CategoriesModal from '@/components/Modals/CategoriesModal.vue'

const userStore = useUserStore()
const { signOut, errorMessage } = useAuth()
const { showToast } = useToastNofitications()
const router = useRouter()

const emailFirstLetter = computed(() => {
  return userStore.user?.email ? userStore.user?.email[0].toUpperCase() : ''
})

const singOutUser = async () => {
  try {
    await signOut()
    userStore.clearUser()
    await router.replace({ name: 'auth' })
  } catch {
    showToast('error', 'Ошибка выхода', errorMessage.value)
  }
}

const CategoriesDialogVisible = ref(false)
</script>

<template>
  <CategoriesModal v-model="CategoriesDialogVisible" />
  <div class="mb-5">
    <Menubar>
      <template #start>
        <div class="flex items-center gap-2">
          <span class="font-bold">Link Manager</span>
          <div class="flex items-center gap-2">
            <Button icon="pi pi-link" rounded />
            <Button icon="pi pi-folder" rounded @click="CategoriesDialogVisible = true" />
          </div>
        </div>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Avatar :label="emailFirstLetter" size="large" shape="circle" />
          <Button icon="pi pi-sign-out" rounded severity="secondary" @click="singOutUser" />
        </div>
      </template>
    </Menubar>
  </div>
</template>
