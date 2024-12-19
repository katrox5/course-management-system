<template>
  <div class="b-b-solid b-b-[#f4f3f3]">
    <h3 class="mb-4">学生信息列表</h3>
    <el-form :model="form">
      <div class="grid gap-4" style="grid-template-columns: repeat(3, 1fr) auto">
        <el-form-item label="编号">
          <el-input v-model="form.userId" placeholder="请输入编号" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.nickname" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="form.class" placeholder="请输入班级" />
        </el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-form-item label="组别">
          <el-input v-model="form.group" placeholder="请输入组别" />
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="form.username" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.role" placeholder="请选择状态">
            <el-option label="已发送" value="已发送" />
            <el-option label="过期" value="过期" />
            <el-option label="标签" value="标签" />
          </el-select>
        </el-form-item>
        <el-button @click="onReset">重置</el-button>
      </div>
    </el-form>
  </div>

  <div class="mt-4">
    <div class="flex mb-4">
      <el-button type="primary" icon="ElIconPlus" @click="openDialog">新建</el-button>
      <el-button type="info" plain>批量导入</el-button>
    </div>
    <el-table stripe :data="tableData">
      <el-table-column prop="userId" label="编号" />
      <el-table-column prop="username" label="学号" />
      <el-table-column prop="nickname" label="姓名" />
      <el-table-column prop="class" label="班级" />
      <el-table-column prop="group" label="组别" />
      <el-table-column prop="role" label="职位" />
      <el-table-column label="操作">
        <template #default>
          <el-button type="primary" link>编辑</el-button>
          <el-button type="danger" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="创建学生" width="600px" @close="closeDialog">
      <el-form label-position="top">
        <el-form-item label="学生">
          <el-input placeholder="学生姓名" />
        </el-form-item>
        <el-form-item label="学号">
          <el-input placeholder="学生学号" />
        </el-form-item>
        <el-form-item label="班级">
          <el-input placeholder="学生所在班级" />
        </el-form-item>
        <el-form-item label="职位">
          <el-input placeholder="学生职位" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="closeDialog">保存资料</el-button>
      </template>
    </el-dialog>

    <el-pagination
      layout="prev, pager, next"
      :total="50"
      class="mt-5 flex flex-justify-end"
      @current-change="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
  const form = ref({
    userId: '',
    nickname: '',
    class: '',
    group: '',
    username: '',
    role: '',
  })

  const tableData = ref(
    Array(5).fill({
      userId: '001',
      username: '2021150001',
      nickname: '小明',
      class: '一班',
      group: '第3组',
      role: '组员',
    }),
  )

  const onSearch = () => {
    console.log('查询表单:', form.value)
  }

  const onReset = () => {
    form.value = { userId: '', nickname: '', class: '', group: '', username: '', role: '' }
  }

  const onAdd = () => {
    console.log('新增一条记录')
  }

  const onPageChange = (page: number) => {
    console.log('当前页:', page)
  }

  const dialogVisible = ref(false)
  const openDialog = () => (dialogVisible.value = true)
  const closeDialog = () => (dialogVisible.value = false)
</script>
