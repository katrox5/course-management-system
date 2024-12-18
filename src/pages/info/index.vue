<template>
    <el-card>
      <h2>信息管理</h2>
      <el-button type="primary" @click="$router.push('/info/list')">查看信息列表</el-button>
      <el-button type="success" @click="$router.push('/info/post')">发布信息</el-button>
    </el-card>
  </template>
  
  <script setup lang="ts"></script>
