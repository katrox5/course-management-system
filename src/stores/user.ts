import { useLocalStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  const userInfo = useLocalStorage('userInfo', {}, { initOnMounted: true })
  const isAdmin = computed(() => userInfo.value.role == 2)
  const isLeader = computed(() => userInfo.value.role == 1)

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

  const userMapper = new Map()

  function getUserName(userId: string) {
    if (userMapper.has(userId)) {
      return userMapper.get(userId)
    }
    fetch(`/dev/username?userId=${userId}`, {
      method: 'GET',
    })
      .then((response) => response.text())
      .then((result) => {
        const username = result
        userMapper.set(userId, username)
        return username
      })
  }

  return {
    userInfo,
    isAdmin,
    isLeader,
    getUserName,
  }
})
