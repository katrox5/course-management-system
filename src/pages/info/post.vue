<template>
    <el-card>
      <h2>发布信息</h2>
      <el-form :model="formData" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="formData.title" placeholder="输入标题" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="formData.content" type="textarea" :rows="4" placeholder="输入内容" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue';
  
  const formData = reactive({
    title: '',
    content: '',
  });
  
  const submitForm = () => {
    console.log('发布内容:', formData);
    alert('发布成功！');
  };
  </script>
