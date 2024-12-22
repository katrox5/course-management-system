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
      component: Navigation,
      children: [
        {
          path: '',
          name: 'res',
          components: {
            main: () => import('../pages/res/index.vue'),
          },
        },
        {
          path: 'post',
          name: 'res-post',
          components: {
            main: () => import('../pages/res/post.vue'),
          },
        },
        {
          path: 'list',
          name: 'res-list',
          components: {
            main: () => import('../pages/res/list.vue'),
          },
        },
      ],
    },
    {
      path: '/group',
      component: Navigation,
      children: [
        {
          path: '',
          name: 'group',
          components: {
            main: () => import('../pages/group/index.vue'),
          },
        },
        {
          path: 'manage',
          name: 'group-manage',
          components: {
            main: () => import('../pages/group/manage.vue'),
          },
        },
      ],
    },
    {
      path: '/report',
      component: Navigation,
      children: [
        {
          path: '',
          name: 'report',
          components: {
            main: () => import('../pages/report/index.vue'),
          },
        },
        {
          path: 'manage',
          name: 'report-manage',
          components: {
            main: () => import('../pages/report/manage.vue'),
          },
        },
      ],
    },
    {
      path: '/project',
      component: Navigation,
      children: [
        {
          path: '',
          name: 'project',
          components: {
            main: () => import('../pages/project/index.vue'),
          },
        },
        {
          path: 'task',
          name: 'project-task',
          components: {
            main: () => import('../pages/project/task.vue'),
          },
        },
        {
          path: 'repo',
          name: 'project-repo',
          components: {
            main: () => import('../pages/project/repo.vue'),
          },
        },
      ],
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
      ],
    },
  ],
})

export default router
