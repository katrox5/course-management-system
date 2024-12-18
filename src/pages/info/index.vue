<template>
  <el-card>
    <h2>信息管理</h2>
    <p>请选择要进行的操作：</p >
    <div style="margin-top: 20px;">
      <el-button type="primary" @click="$router.push('/info/list')">
        查看信息列表
      </el-button>
      <el-button type="success" @click="$router.push('/info/post')" style="margin-left: 10px;">
        发布信息
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts"></script>

<style scoped>
h2 {
  margin-bottom: 10px;
}

p {
  font-size: 14px;
  color: #606266;
}
</style>
