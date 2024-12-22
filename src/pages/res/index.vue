<style>
  .block:not(:first-child) {
    border-top: 1px solid lightgray;
  }
</style>

<template>
  <div class="flex flex-col">
    <template v-for="item in listData">
      <div class="flex gap-x-8 pl-4 py-8 block">
        <el-icon size="48" color="gray">
          <el-icon-document />
        </el-icon>
        <el-link class="!text-xl" @click="downloadFile(item)">{{ item.file_name }}</el-link>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  type ModelData = {
    file_id: string
    file_name: string
    file_path: string
    uploader_id: number
    uploaded_at: Date | null
  }
  const listData = ref<ModelData[]>([])

  function requestData() {
    fetch('/dev/file-storage/list', {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => (listData.value = result))
      .catch((error) => console.log('error', error))
  }
  onMounted(requestData)

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
