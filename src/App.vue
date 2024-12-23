<template>
  <router-view />
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/user'

  const router = useRouter()

  const adminViews = [
    '/stu/list',
    '/info/list',
    '/info/post',
    '/res/list',
    '/res/post',
    '/group/manage',
    '/report/manage',
  ]

  const userStore = useUserStore()
  const { isAdmin, userInfo } = storeToRefs(userStore)

  router.beforeEach((to, _, next) => {
    if (to.path === '/login') {
      next()
    } else {
      if (!userInfo.value || !Object.keys(userInfo.value).length) {
        next('/login')
      } else {
        if (adminViews.includes(to.path) && !isAdmin.value) {
          next('/')
        } else {
          next()
        }
      }
    }
  })
</script>
