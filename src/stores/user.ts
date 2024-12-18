import { useLocalStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  const token = useLocalStorage('token', '', { initOnMounted: true })
  const userInfo = ref()
  const isAdmin = computed(() => true)

  return {
    token,
    userInfo,
    isAdmin,
  }
})
