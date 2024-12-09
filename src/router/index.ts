import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../pages/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login.vue'),
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('../pages/info/index.vue'),
      children: [
        {
          path: 'list',
          name: 'info-list',
          component: () => import('../pages/info/list.vue'),
        },
        {
          path: 'post',
          name: 'info-post',
          component: () => import('../pages/info/post.vue'),
        },
      ],
    },
    {
      path: '/res',
      name: 'res',
      component: () => import('../pages/res/index.vue'),
    },
    {
      path: '/group',
      name: 'group',
      component: () => import('../pages/group/index.vue'),
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../pages/report/index.vue'),
    },
    {
      path: '/project',
      name: 'project',
      component: () => import('../pages/project/index.vue'),
    },
    {
      path: '/stu',
      children: [
        {
          path: 'list',
          name: 'stu-list',
          component: () => import('../pages/stu/list.vue'),
        },
        {
          path: 'import',
          name: 'stu-import',
          component: () => import('../pages/stu/import.vue'),
        },
      ],
    },
  ],
})

export default router
