<template>
  <!-- 表单区域 -->
  <div class="b-b-solid b-b-[#f4f3f3]">
    <h3 class="mb-4">信息列表</h3>
    <el-form :model="form">
      <div class="grid gap-4" style="grid-template-columns: repeat(3, 1fr) auto">
        <el-form-item label="编号">
          <el-input v-model="form.number" placeholder="请输入编号" />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="form.date" type="date" placeholder="请选择时间" />
        </el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-form-item label="班级">
          <el-input v-model="form.class" placeholder="请输入班级" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="已发送" value="已发送" />
            <el-option label="过期" value="过期" />
            <el-option label="标签" value="标签" />
          </el-select>
        </el-form-item>
        <!-- 占位 -->
        <div />
        <el-button @click="onReset">重置</el-button>
      </div>
    </el-form>
  </div>

  <!-- 表格区域 -->
  <div class="mt-4">
    <el-button class="mb-4" type="primary" icon="ElIconPlus" @click="openDialog">新建</el-button>
    <el-table :data="tableData" stripe border>
      <el-table-column prop="number" label="编号" width="100" />
      <el-table-column label="图片" width="120">
        <template #default>
          <el-image src="https://via.placeholder.com/40" alt="图片" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题">
        <template #default="{ row }">
          <span class="custom-title">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="时间" width="150" />
      <el-table-column prop="class" label="班级" width="100" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="{ row }">
          <el-tag v-if="row.status === '已发送'" type="success">已发送</el-tag>
          <el-tag v-else-if="row.status === '过期'" type="danger">过期</el-tag>
          <el-tag v-else type="info">标签</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default>
          <el-link type="primary">操作</el-link>
          <el-link type="danger" style="margin-left: 10px">删除</el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="编辑信息" width="600px" @close="closeDialog">
      <!-- 弹窗内容区域 -->
      <el-form label-width="100px">
        <el-form-item label="标题">
          <el-input placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="班级">
          <el-input placeholder="请输入班级名称" />
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="到"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload class="upload-demo" action="#" list-type="picture-card">
            <el-icon><el-icon-plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <!-- 弹窗底部按钮 -->
      <template #footer>
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="closeDialog">保存资料</el-button>
      </template>
    </el-dialog>
    <!-- 分页控件 -->
    <el-pagination
      layout="prev, pager, next"
      :total="50"
      class="pagination"
      @current-change="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
  const form = ref({
    number: '',
    title: '',
    class: '',
    status: '',
    date: null,
  })

  const tableData = ref([
    {
      number: '01',
      title: '班级群-微信邀请码',
      date: '2024-10-15',
      class: '一班',
      status: '已发送',
    },
    { number: '02', title: '班级群-微信邀请码', date: '2024-10-15', class: '一班', status: '过期' },
    { number: '03', title: '班级群-微信邀请码', date: '2024-10-15', class: '一班', status: '标签' },
    { number: '04', title: '班级群-微信邀请码', date: '2024-10-15', class: '一班', status: '标签' },
    { number: '06', title: '班级群-微信邀请码', date: '2024-10-15', class: '一班', status: '标签' },
  ])

  const onSearch = () => {
    console.log('查询表单:', form.value)
  }

  const onReset = () => {
    form.value = { number: '', title: '', class: '', status: '', date: null }
  }

  const onAdd = () => {
    console.log('新增一条记录')
  }

  const onPageChange = (page: number) => {
    console.log('当前页:', page)
  }

  // 控制弹窗显示/隐藏
  const dialogVisible = ref(false)

  // 打开弹窗
  const openDialog = () => {
    dialogVisible.value = true
  }

  // 关闭弹窗
  const closeDialog = () => {
    dialogVisible.value = false
  }
</script>

<style scoped>
  .custom-title {
    font-size: 11px;
    color: #333; /* 可选：设置文字颜色 */
  }

  .add-button {
    margin-bottom: 10px;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  /*使查询和重置按钮右对齐 */
  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }

  .el-dialog__body {
    padding: 20px;
  }

  .el-upload--picture-card {
    width: 100%;
    text-align: center;
  }

  .el-form-item {
    margin-bottom: 20px;
  }
</style>
