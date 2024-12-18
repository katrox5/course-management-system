<template>
    <el-card>
      <h2>信息列表</h2>
      <el-table :data="infoList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="date" label="发布时间" width="200" />
      </el-table>
    </el-card>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const infoList = ref([
    { id: 1, title: '通知1', date: '2024-05-01' },
    { id: 2, title: '通知2', date: '2024-05-02' },
  ]);
  </script>
