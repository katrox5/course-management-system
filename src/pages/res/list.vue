<template>
  <div class="b-b-solid b-b-[#f4f3f3]">
    <h3 class="mb-4">资源列表</h3>
    <el-form :model="form">
      <div class="grid gap-3" style="grid-template-columns: repeat(2, 1fr) auto">
        <el-form-item label="编号">
          <el-input v-model="form.file_id" placeholder="请输入编号" />
        </el-form-item>
        <el-form-item label="文件名">
          <el-input v-model="form.file_name" placeholder="请输入文件名" />
        </el-form-item>
        <div />
        <el-form-item label="上传者">
          <el-input v-model="form.uploader_id" placeholder="请输入上传者" />
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker v-model="form.uploaded_at" type="date" placeholder="请选择时间" />
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
      <el-table-column prop="file_id" label="编号" width="60" />
      <el-table-column prop="file_name" label="文件名" />
      <el-table-column prop="file_path" label="文件路径" />
      <el-table-column label="上传者" width="150">
        <template #default="{ row }">{{ getUserName(row.uploader_id) }}</template>
      </el-table-column>
      <el-table-column prop="uploaded_at" label="上传时间" width="120">
        <template #default="{ row }">
          {{ new Date(row.uploaded_at).toLocaleDateString() }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="{ row }">
          <el-button icon="ElIconDelete" type="danger" link @click="deleteItem(row)" title="删除" />
          <el-button
            icon="ElIconDownload"
            type="primary"
            link
            @click="downloadFile(row)"
            title="下载"
          />
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
  import { useUserStore } from '@/stores/user'

  const PageSize = 10
  const pageIndex = ref(0)

  const { getUserName } = useUserStore()

  type ModelData = {
    file_id: number | undefined
    file_name: string
    file_path: string
    uploader_id: number | undefined
    uploaded_at: string
  }

  function requestData() {
    fetch('/dev/file-storage/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => (tableData.value = result))
      .catch((error) => console.warn(error))
  }
  onMounted(requestData)

  const form = reactive<ModelData>({
    file_id: undefined,
    file_name: '',
    file_path: '',
    uploader_id: undefined,
    uploaded_at: '',
  })

  const tableData = ref<ModelData[]>([])
  const tableDataFilter = computed(() => {
    return tableData.value.filter((item) => {
      return (
        (!form.file_id || String(item.file_id).includes(String(form.file_id))) &&
        (!form.file_name || item.file_name.includes(form.file_name)) &&
        (!form.uploader_id || String(item.uploader_id).includes(String(form.uploader_id))) &&
        (!form.uploaded_at ||
          new Date(item.uploaded_at)
            .toLocaleDateString()
            // @ts-ignore
            .includes(form.uploaded_at.toLocaleDateString()))
      )
    })
  })

  function resetForm() {
    form.file_id = undefined
    form.file_name = ''
    form.file_path = ''
    form.uploader_id = undefined
    form.uploaded_at = ''
  }

  function deleteItem(item: ModelData) {
    fetch(`/dev/file-storage/delete/${item.file_id}`, {
      method: 'DELETE',
      redirect: 'follow',
    })
      .then(() => {
        ElMessage.success('删除成功')
        requestData()
      })
      .catch((error) => console.warn(error))
  }

  function downloadFile(file: ModelData) {
    fetch(`/dev/file-storage/download/${file.file_id}`, {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = file.file_name
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      })
      .catch((error) => console.log('error', error))
  }
</script>
