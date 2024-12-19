<template>
  <div class="w-full h-full flex flex-col">
    <!-- 顶部导航栏 -->
    <nav class="flex items-center b-b-solid b-b-gray-3 b-b-[1px] h-18 px-4">
      <div class="flex items-center">
        <img class="select-none" src="../assets/logo.png" width="40" />
        <el-button class="ml-4" link @click="$router.push('/')">
          <h1 class="font-semibold text-2xl">课程管理系统</h1>
        </el-button>
      </div>
      <div class="ml-auto flex items-center">
        <div>
          <span class="mr-2 text-[#2678ff] text-xs">老师</span>
          <span class="mr-3 text-xl font-medium">黄某</span>
        </div>
        <div ref="avatarRef" class="relative">
          <el-avatar
            :class="[
              '!bg-[#2678ff] !text-xl select-none transition-all z-2 relative',
              isAvatarHovered && 'scale-125 translate-y-2',
            ]"
            >王</el-avatar
          >
          <transition name="pane-fade">
            <div
              v-if="isAvatarHovered"
              class="absolute flex flex-col items-center p-2 w-40 right-0 bg-white rounded-lg top-10 z-1 b-1px b-solid b-gray-2"
            >
              <el-button type="info" link icon="ElIconLock">退出登录</el-button>
            </div>
          </transition>
        </div>
      </div>
    </nav>

    <div class="flex-grow-1 flex">
      <!-- 侧边导航栏 -->
      <aside class="b-r-solid b-r-gray-3 b-r-[1px] w-240px">
        <el-menu :default-active="$route.fullPath" @select="handleSelect">
          <template v-for="item in items">
            <el-sub-menu v-if="item.children?.length" :index="item.route">
              <template #title>
                <span class="label">{{ item.label }}</span>
              </template>
              <template v-for="subItem in item.children">
                <el-menu-item :index="item.route + subItem.route">
                  <span class="label">{{ subItem.label }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>

            <el-menu-item v-else :index="item.route">
              <span class="label">{{ item.label }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </aside>

      <!-- 内容 -->
      <div class="flex-grow-1 bg-[#f4f3f3] relative overflow-y-auto">
        <div v-if="$route.fullPath !== '/'" class="w-full pt-4 px-4 absolute">
          <el-breadcrumb class="ml-2" separator="/">
            <template v-for="item in breadcrumb">
              <el-breadcrumb-item v-if="item">
                {{ item?.label }}
              </el-breadcrumb-item>
            </template>
          </el-breadcrumb>

          <div class="my-4 p-4 bg-white rounded-md">
            <router-view name="main" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/user'
  import { useElementHover } from '@vueuse/core'

  type Item = {
    label: string
    route: string
    children?: Item[]
  }

  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()
  const { isAdmin } = storeToRefs(userStore)

  const avatarRef = ref<HTMLElement>()
  const isAvatarHovered = useElementHover(avatarRef)

  function handleSelect(path: string) {
    router.push(path)
  }

  const itemsUser: Item[] = [
    {
      label: '信息查看',
      route: '/info',
    },
    {
      label: '资源查看',
      route: '/res',
    },
    {
      label: '分组选择',
      route: '/group',
    },
    {
      label: '分享报告选择',
      route: '/report',
    },
    {
      label: '项目管理',
      route: '/project',
    },
  ]

  const itemsAdmin = [
    {
      label: '学生管理',
      route: '/stu',
      children: [
        {
          label: '学生列表',
          route: '/list',
        },
      ],
    },
    {
      label: '信息管理',
      route: '/info',
      children: [
        {
          label: '信息列表',
          route: '/list',
        },
        {
          label: '信息发布',
          route: '/post',
        },
      ],
    },
    {
      label: '资源管理',
      route: '/res/manage',
    },
    {
      label: '分组管理',
      route: '/group/manage',
    },
    {
      label: '分享报告管理',
      route: '/report/manage',
    },
    {
      label: '项目管理',
      route: '/project/manage',
    },
  ]

  const breadcrumb = computed(() => {
    const firstItem = items.find((item) => route.fullPath.startsWith(item.route))
    const secondItem = firstItem?.children?.find((item) => route.fullPath.endsWith(item.route))
    return [firstItem, secondItem]
  })

  const items = isAdmin.value ? itemsAdmin : itemsUser
</script>

<style>
  .el-menu-item::before {
    content: '◼';
    font-size: 1.25rem;
    margin-right: 0.25rem;
  }
  .el-menu-item.is-active {
    background-color: var(--el-menu-hover-bg-color);
  }
</style>

<style scoped>
  .label {
    user-select: none;
    font-size: 1.125rem;
  }

  .pane-fade-enter-active,
  .pane-fade-leave-active {
    transition:
      opacity 0.5s,
      transform 0.3s;
  }

  .pane-fade-enter-from,
  .pane-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
</style>
