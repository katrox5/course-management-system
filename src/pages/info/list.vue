<template>
  <div class="b-b-solid b-b-[#f4f3f3]">
    <h3 class="mb-4">信息列表</h3>
    <el-form :model="form">
      <div class="grid gap-3" style="grid-template-columns: repeat(2, 1fr) auto">
        <el-form-item label="编号">
          <el-input v-model="form.announcement_id" placeholder="请输入编号" />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <div />
        <el-form-item label="内容">
          <el-input v-model="form.content" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker v-model="form.created_at" type="date" placeholder="请选择时间" />
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
      <el-table-column prop="announcement_id" label="编号" width="100" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="created_by" label="创建者" width="100" />
      <el-table-column prop="created_at" label="创建时间" width="120">
        <template #default="{ row }">
          {{ new Date(row.created_at).toLocaleDateString() }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="{ row }">
          <el-button icon="ElIconDelete" type="danger" link @click="deleteItem(row)" title="删除" />
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
    announcement_id: number | undefined
    title: string
    content: string
    created_by: string | null
    created_at: string
  }

  function requestData() {
    fetch('/dev/info/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => (tableData.value = result))
      .catch((error) => console.log('error', error))
  }
  onMounted(requestData)

  const form = reactive<ModelData>({
    announcement_id: undefined,
    title: '',
    content: '',
    created_by: null,
    created_at: '',
  })

  const tableData = ref<ModelData[]>([])
  const tableDataFilter = computed(() => {
    return tableData.value.filter((item) => {
      return (
        (!form.announcement_id ||
          String(item.announcement_id).includes(String(form.announcement_id))) &&
        (!form.title || item.title.includes(form.title)) &&
        (!form.content || item.content.includes(form.content)) &&
        (!form.created_at ||
          new Date(item.created_at)
            .toLocaleDateString()
            // @ts-ignore
            .includes(form.created_at.toLocaleDateString()))
      )
    })
  })

  function resetForm() {
    form.announcement_id = undefined
    form.title = ''
    form.content = ''
    form.created_by = null
    form.created_at = ''
  }

  function deleteItem(item: ModelData) {
    const id = item.announcement_id
    fetch(`/dev/info/${id}`, {
      method: 'DELETE',
      redirect: 'follow',
    })
      .then(() => {
        ElMessage.success('删除成功')
        requestData()
      })
      .catch((error) => console.warn(error))
  }
</script>
