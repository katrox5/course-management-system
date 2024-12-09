<template>
  <div class="w-full h-full flex flex-col">
    <!-- 顶部导航栏 -->
    <nav class="flex items-center b-b-solid b-b-gray-3 b-b-[1px] h-18 px-4">
      <div class="flex items-center">
        <img src="../assets/logo.png" width="48" />
        <h1 class="ml-4 font-semibold">课程管理系统</h1>
      </div>
      <div class="ml-auto flex items-center">
        <span class="mr-4 text-xl font-medium">黄某</span>
        <el-avatar />
      </div>
    </nav>

    <div class="flex-grow-1 flex">
      <!-- 侧边导航栏 -->
      <aside class="b-r-solid b-r-gray-3 b-r-[1px] w-200px">
        <el-menu :default-active="$route.fullPath" @select="handleSelect">
          <!-- 用户视图 -->
          <!-- TODO 识别用户权限 -->
          <template v-if="true" v-for="item in itemsUser">
            <el-menu-item :index="item.route">
              <span>{{ item.label }}</span>
            </el-menu-item>
          </template>

          <!-- 管理员视图 -->
          <template v-else v-for="item in itemsAdmin">
            <el-sub-menu v-if="item.children?.length" :index="item.route">
              <template #title>
                <span>{{ item.label }}</span>
              </template>
              <template v-for="subItem in item.children">
                <el-menu-item :index="item.route + subItem.route">
                  <span>{{ subItem.label }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>

            <el-menu-item v-else :index="item.route">
              <span>{{ item.label }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </aside>

      <!-- 内容 -->
      <div class="flex-grow-1 bg-[#f4f3f3] overflow-y-auto relative">
        <div class="absolute">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  type Item = {
    label: string
    route: string
    children?: Item[]
  }

  const router = useRouter()

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
        {
          label: '批量导入',
          route: '/import',
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
      label: '分组管理',
      route: '/group',
    },
    {
      label: '分享报告管理',
      route: '/report',
    },
    {
      label: '项目管理',
      route: '/project',
    },
  ]
</script>

<style>
  .el-menu .is-active {
    background-color: var(--el-menu-hover-bg-color);
  }
</style>
