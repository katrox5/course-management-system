<template>
  <div class="app-container">
    <!-- 侧边导航栏 -->
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#f8f8f9"
        text-color="#000"
        active-text-color="#409EFF"
        :router="true"
    >
      <!-- 系统标题和 Logo 水平排列 -->
      <div class="logo-container">
        <img src="../src/assets/logo.png" alt="Logo" class="logo-img" />
        <span class="logo-title">课程管理系统</span>
      </div>

      <!-- 菜单项 -->
      <el-sub-menu index="1">
        <template #title>学生管理</template>
        <el-menu-item index="/student-list">学生列表</el-menu-item>
        <el-menu-item index="/batch-import">批量导入</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title>信息管理</template>
        <el-menu-item index="/info-list">信息列表</el-menu-item>
        <el-menu-item index="/info-publish">信息发布</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="/resource-management">
        <span>资源管理</span>
      </el-menu-item>

      <el-menu-item index="/group-management">
        <span>分组管理</span>
      </el-menu-item>

      <el-menu-item index="/group-management">
        <span>分享报告管理</span>
      </el-menu-item>

      <el-menu-item index="/group-management">
        <span>项目管理页面</span>
      </el-menu-item>
    </el-menu>

    <!-- 主体内容 -->
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}
/* 侧边导航栏 */
.el-menu-vertical-demo {
  width: 379px;
  min-height: 100vh;
  border-right: 1px solid #e6e6e6;
  background-color: #f8f8f9;
}
/* Logo 和标题水平放置 */
.logo-container {
  display: flex;              /* 使用 Flex 布局 */
  align-items: center;        /* 垂直居中 */
  justify-content: flex-start; /* 水平左对齐 */
  padding: 10px 0;            /* 上下间距 */
}
.logo-img {
  width: 58px;                /* Logo 图片大小 */
  height: 67px;
  margin-right: 15px;         /* 图片和标题之间的间距 */
  margin-top: 21px;
  margin-left: 20px;
}
.logo-title {
  font-size: 36px;            /* 字体大小 */
  font-weight: bold;          /* 字体加粗 */
  color: #333;                /* 字体颜色 */
  white-space: nowrap;        /* 防止换行 */
}
/* 主体内容 */
.main-content {
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
}</style>
