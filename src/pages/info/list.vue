<template>
    <el-card>
      <h2>公告列表</h2>
      <el-table :data="announcements" style="width: 100%">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="created_at" label="发布时间" width="200" />
      </el-table>
    </el-card>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const announcements = ref([]);
  
  const fetchAnnouncements = async () => {
    const response = await axios.get('/api/announcements');
    announcements.value = response.data;
  };
  
  onMounted(() => {
    fetchAnnouncements();
  });
  </script>
