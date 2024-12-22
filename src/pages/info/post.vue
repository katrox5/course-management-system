<template>
  <div>
    <h3 class="mb-4">信息发布</h3>
    <el-form class="w-2/3" label-position="top">
      <el-form-item label="标题">
        <el-input v-model="form.title" maxlength="100" placeholder="请输入标题" />
      </el-form-item>

      <el-form-item label="内容">
        <el-input
          v-model="form.content"
          type="textarea"
          resize="none"
          :autosize="{ minRows: 3 }"
          placeholder="请输入内容"
          class="fixed-content-input"
        />
      </el-form-item>
    </el-form>
    <div class="flex flex-justify-end">
      <el-button type="primary" @click="submitForm">发布信息</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus'

  const form = reactive({
    title: '',
    content: '',
  })

  function submitForm() {
    fetch('/dev/info/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...form,
        createdBy: 1,
      }),
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then(() => {
        ElMessage.success('发布成功')
        form.title = ''
        form.content = ''
      })
      .catch((error) => console.warn(error))
  }
</script>
