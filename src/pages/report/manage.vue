<template>
  <div class="b-b-solid b-b-[#f4f3f3]">
    <h3 class="mb-4">分享报告管理</h3>
    <el-form :model="form">
      <div class="grid gap-3" style="grid-template-columns: repeat(2, 1fr) auto">
        <el-form-item label="周次">
          <el-input v-model="form.weekNumber" placeholder="请输入周次" />
        </el-form-item>
        <el-form-item label="位次">
          <el-input v-model="form.weekPlace" placeholder="请输入位次" />
        </el-form-item>
        <el-button @click="resetForm">重置</el-button>
      </div>
    </el-form>
  </div>

  <div class="mt-4">
    <el-table
      :data="tableDataFilter.slice(pageIndex * PageSize, (pageIndex + 1) * PageSize)"
      stripe
      border
    >
      <el-table-column prop="weekNumber" label="周次" width="100" />
      <el-table-column prop="weekPlace" label="位次" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作" width="80">
        <template #default="{ row }">
          <el-button icon="ElIconDelete" type="danger" link @click="cancelItem(row)" title="删除" />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :page-size="PageSize"
      :total="tableDataFilter.length"
      class="mt-4 flex flex-justify-end"
      @current-change="(page) => (pageIndex = page - 1)"
    />
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus'

  const PageSize = 10
  const pageIndex = ref(0)

  type ModelData = {
    availableSlots: number | undefined
    maxCapacity: number | undefined
    status: number | undefined
    timeId: number | undefined
    weekNumber: number | undefined
    weekPlace: number | undefined
  }

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

  const form = reactive({
    availableSlots: undefined,
    maxCapacity: undefined,
    status: undefined,
    timeId: undefined,
    weekNumber: undefined,
    weekPlace: undefined,
  })

  const tableData = ref<ModelData[]>([])
  const tableDataFilter = computed(() => {
    return tableData.value.filter((item) => {
      return (
        (!form.weekNumber || String(item.weekNumber).includes(String(form.weekNumber))) &&
        (!form.weekPlace || String(item.weekPlace).includes(String(form.weekPlace)))
      )
    })
  })

  function resetForm() {
    form.weekNumber = undefined
    form.weekPlace = undefined
  }

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
</script>
