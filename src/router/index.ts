import { createRouter, createWebHistory } from 'vue-router'
import Navigation from '@/layouts/Navigation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
        default: Navigation,
        main: () => import('../pages/index.vue'),
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login.vue'),
    },
    {
      path: '/info',
      component: Navigation,
      children: [
        {
          path: '',
          name: 'info',
          components: {
            main: () => import('../pages/info/index.vue'),
          },
        },
        {
          path: 'list',
          name: 'info-list',
          components: {
            main: () => import('../pages/info/list.vue'),
          },
        },
        {
          path: 'post',
          name: 'info-post',
          components: {
            main: () => import('../pages/info/post.vue'),
          },
        },
      ],
    },
    {
      path: '/res',
      name: 'res',
      components: {
        default: Navigation,
        main: () => import('../pages/res/index.vue'),
      },
    },
    {
      path: '/group',
      name: 'group',
      components: {
        default: Navigation,
        main: () => import('../pages/group/index.vue'),
      },
    },
    {
      path: '/report',
      name: 'report',
      components: {
        default: Navigation,
        main: () => import('../pages/report/index.vue'),
      },
    },
    {
      path: '/project',
      name: 'project',
      components: {
        default: Navigation,
        main: () => import('../pages/project/index.vue'),
      },
    },
    {
      path: '/stu',
      component: Navigation,
      children: [
        {
          path: 'list',
          name: 'stu-list',
          components: {
            main: () => import('../pages/stu/list.vue'),
          },
        },
        {
          path: 'import',
          name: 'stu-import',
          components: {
            main: () => import('../pages/stu/import.vue'),
          },
        },
      ],
    },
  ],
})

export default router
