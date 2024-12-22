<style>
  .block:not(:first-child) {
    padding-top: 16px;
    border-top: 1px solid lightgray;
  }
</style>

<template>
  <div class="flex flex-col gap-y-4">
    <template v-for="item in listData">
      <div class="flex gap-x-8 block">
        <el-icon size="48" color="gray">
          <el-icon-document />
        </el-icon>
        <div>
          <h3 class="mb-2 font-bold">{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  type ModelData = {
    announcement_id: string
    title: string
    content: string
    created_by: string | null
    created_at: Date | null
  }
  const listData = ref<ModelData[]>([])

  function requestData() {
    fetch('/dev/info/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => (listData.value = result))
      .catch((error) => console.log('error', error))
  }
  onMounted(requestData)
</script>
