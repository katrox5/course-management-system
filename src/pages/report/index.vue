<template>
  <!-- 主内容区域 -->
  <div class="flex flex-col gap-y-4">
    <template v-for="week in weeks">
      <h3>第{{ num2Cn(week[0]) }}周</h3>
      <div class="grid gap-2 report__cards">
        <template v-for="index in 8">
          <template v-if="!week[1].includes(index)">
            <el-card shadow="hover" class="w-[250px] !bg-[#f4f3f3]" body-class="!p-3">
              <div class="flex items-center gap-x-2">
                <el-icon color="#409eff">
                  <el-icon-info-filled />
                </el-icon>
                <span class="text-sm font-medium"> 可选择 </span>
              </div>
              <div class="py-4 flex justify-center">第{{ num2Cn(index) }}位</div>
              <div class="flex flex-row-reverse">
                <el-button type="primary" class="flex ml-auto" @click="selectItem(week[0], index)">
                  确认选择
                </el-button>
              </div>
            </el-card>
          </template>
        </template>
        <template v-for="item in tableData">
          <template v-if="week[0] == item.weekNumber">
            <el-card shadow="hover" class="w-[250px] !bg-[#f4f3f3]" body-class="!p-3">
              <div class="flex items-center gap-x-2">
                <el-icon :color="item.status == userInfo.userId ? '#67c23a' : '#f56c6c'">
                  <el-icon-success-filled v-if="item.status == userInfo.userId" />
                  <el-icon-circle-close-filled v-else />
                </el-icon>
                <span class="text-sm font-medium">
                  {{ item.status == userInfo.userId ? '已' : '已被' }}选择
                </span>
              </div>
              <div class="py-4 flex justify-center">第{{ num2Cn(item.weekPlace) }}位</div>
              <div class="flex flex-row-reverse">
                <el-button
                  v-if="item.status == userInfo.userId"
                  type="danger"
                  class="flex ml-auto"
                  @click="cancelItem(item)"
                >
                  取消选择
                </el-button>
              </div>
            </el-card>
          </template>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/user'
  import { num2Cn } from '@/utils/string.ts'
  import { ElMessage } from 'element-plus'

  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)

  type ModelData = {
    availableSlots: number | undefined
    maxCapacity: number | undefined
    status: number | undefined
    timeId: number | undefined
    weekNumber: number | undefined
    weekPlace: number | undefined
  }

  const tableData = ref<ModelData[]>([])
  const weeks = computed(() => {
    const map = new Map()
    for (const week of tableData.value) {
      if (map.get(week.weekNumber)) {
        map.get(week.weekNumber).push(week.weekPlace)
      } else {
        map.set(week.weekNumber, [week.weekPlace])
      }
    }
    return map
  })

  function requestData() {
    fetch('/dev/week/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((result) => (tableData.value = result.data.records))
      .catch((error) => console.log('error', error))
  }
  onMounted(requestData)

  function cancelItem(item: ModelData) {
    fetch(`/dev/week/deleteWeek?id=${item.timeId}`, {
      method: 'DELETE',
      redirect: 'follow',
    })
      .then(() => {
        ElMessage.success('取消成功')
        requestData()
      })
      .catch((error) => console.warn(error))
  }

  function selectItem(weekNumber: number, weekPlace: number) {
    fetch(`/dev/week/updateReport`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        weekNumber,
        weekPlace,
        status: userInfo.value.userId,
      }),
      redirect: 'follow',
    })
      .then(() => {
        ElMessage.success('选择成功')
        requestData()
      })
      .catch((error) => console.warn(error))
  }
</script>

<style scoped>
  .report__cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
</style>
