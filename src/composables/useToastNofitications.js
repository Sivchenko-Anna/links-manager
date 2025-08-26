import { useToast } from 'primevue/usetoast'

export function useToastNofitications() {
  const toast = useToast()

  const showToast = (type, summary, detail = 'Что-то пошло не так') => {
    toast.add({ severity: type, summary, detail, life: 3000 })
  }

  return { showToast }
}