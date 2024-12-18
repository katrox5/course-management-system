<template>
  <div class="grid gap-2 group__cards">
    <template v-for="item, index in groups">
      <el-card shadow="hover" class="w-[250px] h-[180px] !bg-[#f4f3f3]" body-class="!p-3">
        <div class="flex items-center gap-x-2">
          <el-icon :color="item ? '#67c23a' : '#409eff'">
            <el-icon-success-filled v-if="item" />
            <el-icon-info-filled v-else />
          </el-icon>
          <span class="text-sm font-medium"> {{ item ? '已' : '可' }}选择 </span>
        </div>
        <div class="flex flex-col text-sm text-gray-5 pl-6 py-3">
          <span>组号：第一组</span>
          <span>组名：吴彦祖</span>
          <span>组长：李一</span>
          <span>已选人数：7/8</span>
        </div>
        <div class="flex flex-row-reverse">
          <el-button
            :type="item ? 'danger' : 'primary'"
            class="flex ml-auto"
            @click="selectGroup(item, index)"
          >
            {{ item ? '取消' : '确认' }}选择
          </el-button>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script setup lang="ts">
  // 示例数据
  const groups = ref([
    {
      id: 1,
      name: '第一组',
      groupNumber: '一号',
      leader: '吴彦祖',
      selectedCount: 7,
      totalCount: 8,
    },
    {
      id: 2,
      name: '第二组',
      groupNumber: '二号',
      leader: '李二',
      selectedCount: 7,
      totalCount: 8,
    },
    {
      id: 3,
      name: '第三组',
      groupNumber: '三号',
      leader: '王五',
      selectedCount: 6,
      totalCount: 8,
    },
    {
      id: 4,
      name: '第四组',
      groupNumber: '四号',
      leader: '赵六',
      selectedCount: 5,
      totalCount: 8,
    },
  ])

  function selectGroup(group: any, index: number) {
    alert(`选择了 ${group.name}`)
  }
</script>

<style scoped>
  .group__cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
</style>
