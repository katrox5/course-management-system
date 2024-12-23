<template>
  <router-view />
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/user'

  const router = useRouter()

  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)

  router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      next()
    } else {
      if (!userInfo.value || !Object.keys(userInfo.value).length) {
        next('/login')
      } else {
        next()
      }
    }
  })
</script>
