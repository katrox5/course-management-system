<template>
  <div class="w-full h-full">
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-4">
        {{ currentView === 'list' ? '资源列表' : '资源发布' }}
      </h2>

      <!-- 资源列表界面 -->
      <div v-if="currentView === 'list'">
        <el-form :model="form" label-width="80px">
          <div class="form-container">
            <el-form-item label="编号">
              <el-input v-model="form.number" placeholder="请输入编号" style="width: 200px" />
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="form.title" placeholder="请输入标题" style="width: 200px" />
            </el-form-item>
            <el-form-item label="班级">
              <el-input v-model="form.class" placeholder="请输入班级" style="width: 200px" />
            </el-form-item>
            <div class="button-container">
              <el-button type="primary" @click="onSearch" class="search-button">查询</el-button>
            </div>
            <el-form-item label="类型">
              <el-select v-model="form.type" placeholder="请选择类型" style="width: 200px">
                <el-option label="作业" value="homework"></el-option>
                <el-option label="学习资料" value="studyMaterial"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="请选择状态" style="width: 200px">
                <el-option label="已发送" value="sent"></el-option>
                <el-option label="已过期" value="expired"></el-option>
                <el-option label="标签" value="tagged"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker
                  v-model="form.date"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 200px"
              />
            </el-form-item>
            <div class="button-container">
              <el-button @click="onReset" class="reset-button">重置</el-button>
            </div>
          </div>
        </el-form>
        <el-button
            type="primary"
            icon="el-icon-plus"
            class="mt-4"
            @click="switchToCreate"
        >
          新建
        </el-button>
        <el-table :data="tableData" border style="width: 100%" class="mt-4">
          <el-table-column prop="number" label="编号" width="80" />
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="date" label="时间" width="150" />
          <el-table-column prop="class" label="班级" width="100" />
          <el-table-column prop="type" label="类型" width="120" />
          <el-table-column prop="status" label="状态" width="120">
            <template #default="{ row }">
              <el-tag v-if="row.status === '已发送'" type="success">已发送</el-tag>
              <el-tag v-else-if="row.status === '已过期'" type="danger">已过期</el-tag>
              <el-tag v-else type="info">标签</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="text" @click="onView(scope.row)">查看</el-button>
              <el-button type="text" @click="onDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <div class="button-container">
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </div>
        </el-table>
      </div>

      <!-- 资源发布界面 -->
      <div v-else-if="currentView === 'create'">
        <el-form :model="form" label-width="80px">
          <div class="form-container">
            <el-form-item label="编号">
              <el-input v-model="form.number" placeholder="请输入编号" style="width: 200px" />
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="form.title" placeholder="请输入标题" style="width: 200px" />
            </el-form-item>
            <el-form-item label="班级">
              <el-input v-model="form.class" placeholder="请输入班级" style="width: 200px" />
            </el-form-item>
            <div class="button-container">
              <el-button type="primary" @click="onSearch">查询</el-button>
            </div>
            <el-form-item label="类型">
              <el-select v-model="form.type" placeholder="请选择类型" style="width: 200px">
                <el-option label="作业" value="homework"></el-option>
                <el-option label="学习资料" value="studyMaterial"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="请选择状态" style="width: 200px">
                <el-option label="已发送" value="sent"></el-option>
                <el-option label="已过期" value="expired"></el-option>
                <el-option label="标签" value="tagged"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker
                  v-model="form.date"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 200px"
              />
            </el-form-item>
            <div class="button-container">
              <el-button @click="onReset">重置</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 当前视图：'list' 表示资源列表，'create' 表示资源发布
const currentView = ref("list");

const switchToCreate = () => {
  currentView.value = "create";
};

const switchToList = () => {
  currentView.value = "list";
};

// 表单数据
const form = ref({
  number: "",
  title: "",
  class: "",
  type: "",
  date: "",
  status: "",
  startDate: "",
  endDate: "",
  content: "",
});

const fileList = ref([]);

const tableData = ref([
  {number: "01", title: "班级群-微信邀请码", date: "2024-10-15", class: "一班", type: "作业", status: "已发送",},
  {number: "02", title: "班级群-微信邀请码", date: "2024-10-15", class: "一班", type: "学习资料", status: "已过期",},
  {number: "03", title: "班级群-微信邀请码", date: "2024-10-15", class: "一班", type: "学习资料", status: "标签",},
  {number: "04", title: "班级群-微信邀请码", date: "2024-10-15", class: "一班", type: "学习资料", status: "标签",},
  {number: "05", title: "班级群-微信邀请码", date: "2024-10-15", class: "一班", type: "学习资料", status: "标签",},
]);

const handlePreview = (file: any) => {
  console.log("预览文件", file);
};

const handleRemove = (file: any) => {
  console.log("删除文件", file);
};

const onSubmit = () => {
  console.log("提交表单", form.value);
};

const onSearch = () => {
  console.log("查询条件", form.value);
};

const onReset = () => {
  form.value = {
    number: "",
    title: "",
    class: "",
    type: "",
    date: "",
    status: "",
    startDate: "",
    endDate: "",
    content: "",
  };
  fileList.value = [];
};

const onView = (row: any) => {
  console.log("查看", row);
};

const onDelete = (row: any) => {
  console.log("删除", row);
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 控制输入框之间的间距 */
}

.search-button {
  background-color: #409eff; /* 按钮颜色，图片样式 */
  color: #fff;
}

.reset-button {
  background-color: #f5f5f5;
  color: #606266;
}
</style>
