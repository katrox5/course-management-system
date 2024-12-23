<template>
  <div class="b-b-solid b-b-[#f4f3f3]">
    <h3 class="mb-4">学生列表</h3>
    <el-form :model="form">
      <div class="grid gap-3" style="grid-template-columns: repeat(2, 1fr) auto">
        <el-form-item label="学号">
          <el-input v-model="form.userId" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.username" placeholder="请输入姓名" />
        </el-form-item>
        <div />
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <div />
        <el-button @click="resetForm">重置</el-button>
      </div>
    </el-form>
  </div>

  <div class="mt-4">
    <el-table
      :data="tableDataFilter.slice(pageIndex * PageSize, (pageIndex + 1) * PageSize)"
      stripe
      border
    >
      <el-table-column prop="userId" label="学号" width="100" />
      <el-table-column prop="username" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="职位" width="120">
        <template #default="{ row }">
          {{ row.role == 0 ? '组员' : '组长' }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :page-size="PageSize"
      :total="tableDataFilter.length"
      class="mt-4 flex flex-justify-end"
      @current-change="(page) => (pageIndex = page - 1)"
    />
  </div>
</template>

<script setup lang="ts">
  const PageSize = 10
  const pageIndex = ref(0)

  type ModelData = {
    userId: number | undefined
    username: string
    email: string
    role: number | undefined
  }

  function requestData() {
    fetch('/dev/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => (tableData.value = result.userGroupDtoList))
      .catch((error) => console.warn(error))
  }
  onMounted(requestData)

  const form = reactive({
    userId: undefined,
    username: '',
    email: '',
  })

  const tableData = ref<ModelData[]>([])
  const tableDataFilter = computed(() => {
    return tableData.value.filter((item) => {
      return (
        (!form.userId || String(item.userId).includes(String(form.userId))) &&
        (!form.username || item.username.includes(form.username)) &&
        (!form.email || item.email.includes(form.email))
      )
    })
  })

  function resetForm() {
    form.userId = undefined
    form.username = ''
    form.email = ''
  }
</script>
