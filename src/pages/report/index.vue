<template>
  <!-- 主内容区域 -->
  <div class="flex flex-col gap-y-4">
    <template v-for="(slot, week) in slots">
      <h3>第{{ num2Cn(week + 1) }}周</h3>
      <div class="grid gap-2 report__cards">
        <template v-for="(item, index) in slot">
          <el-card shadow="hover" class="w-[250px] h-[130px] !bg-[#f4f3f3]" body-class="!p-3">
            <div class="flex items-center gap-x-2">
              <el-icon :color="item ? '#67c23a' : '#409eff'">
                <el-icon-success-filled v-if="item" />
                <el-icon-info-filled v-else />
              </el-icon>
              <span class="text-sm font-medium"> {{ item ? '已' : '可' }}选择 </span>
            </div>
            <div class="py-4 flex justify-center">第{{ num2Cn(index + 1) }}位</div>
            <div class="flex flex-row-reverse">
              <el-button
                :type="item ? 'danger' : 'primary'"
                class="flex ml-auto"
                @click="selectSlot(week, index)"
              >
                {{ item ? '取消' : '确认' }}选择
              </el-button>
            </div>
          </el-card>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { num2Cn } from '@/utils/string.ts'

  const slots = ref([Array(5).fill(null), Array(7).fill(null)])

  async function selectSlot(week: number, index: number) {
    // FIXME: 以下改为发更新请求到服务器，再重新请求数据
    if (slots.value[week][index]) {
      slots.value[week][index] = null
    } else {
      slots.value[week][index] = '张三'
    }
  }
</script>

<style scoped>
  .report__cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
</style>
