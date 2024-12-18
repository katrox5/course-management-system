<template>
  <!-- 背景矩形设置 -->
  <div class="background-container">
    <el-card>
      <el-form label-width="100px">
        <!-- 标题输入框 -->
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>

        <!-- 有效期输入框 -->
        <el-form-item label="有效期">
          <el-date-picker
              v-model="form.date"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          />
        </el-form-item>

        <!-- 固定大小的内容输入框 -->
        <el-form-item label="内容">
          <el-input
              v-model="form.content"
              type="textarea"
              placeholder="请输入内容"
              class="fixed-content-input"
          />
        </el-form-item>

        <!-- 图片上传 -->
        <el-form-item label="图片">
          <el-upload
              v-model:file-list="form.imageList"
              action="#"
              list-type="picture-card"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
          >
            <el-icon><plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <!-- 按钮容器 -->
      <div class="button-container">
        <el-button @click="cancelForm" class="cancel-button">取消</el-button>
        <el-button type="primary" @click="submitForm">发布信息</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const form = ref({
  title: '',
  date: [],
  content: '',
  imageList: []
})

const handlePreview = (file: any) => {
  console.log('预览文件', file)
}

const handleRemove = (file: any) => {
  console.log('删除文件', file)
}

const submitForm = () => {
  console.log('发布表单数据', form.value)
}

const cancelForm = () => {
  console.log('取消操作')
  // 清空表单数据
  form.value = {
    title: '',
    date: [],
    content: '',
    imageList: []
  }
}
</script>

<style scoped>
/* 背景容器样式 */
.background-container {
  width: 1000px;
  height: 847px;
  background-color: #f5f5f5;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 按钮容器靠右 */
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

/* 取消按钮样式 */
.cancel-button {
  background-color: #FFFFFF; /* 背景色为白色 */
  color: #000000; /* 文字颜色为黑色 */
  border: 1px solid #dcdfe6; /* 边框颜色 */
}
.cancel-button:hover {
  background-color: #f0f0f0; /* 鼠标悬停时的背景色 */
}
</style>
