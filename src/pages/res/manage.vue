<template>
  <el-card>
    <h2>资源管理</h2>
    <el-upload action="#" :on-success="handleSuccess" :on-preview="handlePreview" list-type="text">
      <el-button type="primary">上传资源</el-button>
    </el-upload>

    <el-table :data="resources" style="width: 100%; margin-top: 20px">
      <el-table-column prop="resource_name" label="资源名称" />
      <el-table-column prop="file_path" label="文件路径" />
      <el-table-column prop="uploaded_at" label="上传时间" width="200" />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import axios from 'axios'

  const resources = ref([])

  const fetchResources = async () => {
    const response = await axios.get('/api/resources') // 假设后端 API
    resources.value = response.data
  }

  const handleSuccess = () => {
    fetchResources()
  }

  const handlePreview = (file: any) => {
    window.open(file.url)
  }

  onMounted(() => {
    fetchResources()
  })
</script>
