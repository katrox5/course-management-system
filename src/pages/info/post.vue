<template>
    <el-card>
      <h2>发布公告</h2>
      <el-form :model="formData" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="formData.title" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="formData.content" type="textarea" rows="4" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue';
  import axios from 'axios';
  
  const formData = reactive({
    title: '',
    content: '',
  });
  
  const submitForm = async () => {
    await axios.post('/api/announcements', formData);
    alert('公告发布成功');
  };
  </script>
