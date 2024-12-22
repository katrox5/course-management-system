<script setup lang="ts">
  const gitRepoSrc = ref('')

  fetch('/git/katrox5/course-management-system', {
    method: 'GET',
  })
    .then((res) => res.text())
    .then((data) => {
      const blob = new Blob([data], { type: 'text/html;charset=UTF-8' })
      gitRepoSrc.value = URL.createObjectURL(blob)
    })
</script>

<template>
  <iframe class="h-screen" width="100%" :src="gitRepoSrc" />
</template>
