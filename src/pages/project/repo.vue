<script setup lang="ts">
  import { useLocalStorage } from '@vueuse/core'
  import { ElMessage } from 'element-plus'

  const gitRepoSrc = useLocalStorage('gitRepoSrc', '', { initOnMounted: true })
  const gitRepoHtml = ref('')

  watch(gitRepoSrc, () => {
    if (!gitRepoSrc.value) return
    fetch(gitRepoSrc.value.replace('https://github.com', '/git'), {
      method: 'GET',
    })
      .then((res) => res.text())
      .then((data) => {
        const blob = new Blob([data], { type: 'text/html;charset=UTF-8' })
        gitRepoHtml.value = URL.createObjectURL(blob)
      })
  })

  function copyGitRepoSrc() {
    navigator.clipboard.writeText(gitRepoSrc.value)
    ElMessage.success('复制成功')
  }
</script>

<template>
  <div class="flex mb-4">
    <h3>Git仓库</h3>
    <div class="flex ml-auto">
      <el-input v-model="gitRepoSrc" />
      <el-button icon="ElIconDocument" type="info" @click="copyGitRepoSrc" />
    </div>
  </div>
  <iframe class="h-75vh" width="100%" :src="gitRepoHtml" />
</template>
