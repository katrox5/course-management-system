import { useLocalStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  const userInfo = useLocalStorage('userInfo', {}, { initOnMounted: true })
  const isAdmin = computed(() => true)

  const router = useRouter()

  onMounted(() => {
    watch(
      userInfo,
      () => {
        if (router.currentRoute.value.path !== '/login') {
          if (!userInfo.value || !Object.keys(userInfo.value).length) {
            router.push('/login')
          }
        }
      },
      { immediate: true },
    )
  })

  return {
    userInfo,
    isAdmin,
  }
})
