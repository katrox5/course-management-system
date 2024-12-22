<template>
  <div>
    <h3 class="mb-4">资源发布</h3>
    <el-form class="w-2/3" label-position="top">
      <el-form-item label="标题">
        <el-input v-model="form.resourceName" maxlength="100" placeholder="请输入标题" />
      </el-form-item>

      <el-form-item label="文件">
        <input id="fileInput" type="file" />
      </el-form-item>
    </el-form>
    <div class="flex flex-justify-end">
      <el-button type="primary" @click="submitForm">发布资源</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus'

  const form = reactive({
    resourceName: '',
  })

  function submitForm() {
    const fileInput = document.getElementById('fileInput')
    if (!fileInput) return

    const reader = new FileReader()
    reader.onload = () => {
      const file = reader.result
      const blob = new Blob([file], { type: file.type })

      var formdata = new FormData()
      formdata.append('file', blob, fileInput.files[0].name)
      formdata.append('uploader_id', '1')

      fetch('/dev/file-storage/upload', {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      })
        .then(() => {
          ElMessage.success('发布成功')
          form.resourceName = ''
          fileInput.value = ''
        })
        .catch((error) => console.warn(error))
    }
    reader.readAsArrayBuffer(fileInput.files[0])
  }
</script>
