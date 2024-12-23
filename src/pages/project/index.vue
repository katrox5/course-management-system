<template>
  <div class="flex items-start">
    <h3>任务列表</h3>
    <el-button
      icon="ElIconPlus"
      type="primary"
      class="ml-auto"
      round
      @click="drawerVisible = true"
      v-if="userInfo.role == 1 || userInfo.role == 2"
    />
  </div>
  <div class="mt-4">
    <el-table
      :data="tableData.slice(pageIndex * PageSize, (pageIndex + 1) * PageSize)"
      stripe
      border
    >
      <el-table-column prop="task_id" label="编号" width="60" />
      <el-table-column prop="task_name" label="任务" width="200" />
      <el-table-column prop="description" label="详情" />
      <el-table-column prop="creator_id" label="创建者" width="150">
        <template #default="{ row }">{{ getUserName(row.creator_id) }}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">
          <el-tag v-if="row.status === 'todo'" type="danger">待处理</el-tag>
          <el-tag v-else-if="row.status === 'in_progress'" type="warning">进行中</el-tag>
          <el-tag v-else-if="row.status === 'done'" type="success">已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="{ row }">
          <el-button icon="ElIconEdit" type="primary" link @click="editItem(row)" title="编辑" />
          <el-button icon="ElIconDelete" type="danger" link @click="deleteItem(row)" title="删除" />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :page-size="PageSize"
      :total="tableData.length"
      class="mt-4 flex flex-justify-end"
      @current-change="(page) => (pageIndex = page - 1)"
    />
  </div>
  <el-drawer v-model="drawerVisible" :show-close="false" @closed="clearForm">
    <div class="h-full flex flex-col">
      <h2 class="mb-4">{{ editTaskId ? '编辑任务' : '创建任务' }}</h2>
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.task_name" placeholder="任务名称" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.description"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 5 }"
            placeholder="任务描述"
          />
        </el-form-item>
        <div class="grid grid-cols-2 gap-x-4">
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="任务状态">
              <el-option label="待处理" value="todo" />
              <el-option label="进行中" value="in_progress" />
              <el-option label="已完成" value="done" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="!editTaskId" label="负责人">
            <el-input v-model="form.creator_id" placeholder="负责人ID" resize="none" />
          </el-form-item>
        </div>
      </el-form>
      <div class="mt-auto">
        <el-button
          icon="ElIconCheck"
          type="success"
          @click="editTaskId ? updateTask() : createTask()"
          >保存</el-button
        >
        <el-button icon="ElIconClose" @click="drawerVisible = false">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus'
  import { useUserStore } from '@/stores/user'

  const PageSize = 10
  const pageIndex = ref(0)

  const userStore = useUserStore()
  const { getUserName } = userStore
  const { userInfo } = storeToRefs(userStore)

  const drawerVisible = ref(false)

  type ModelData = {
    creator_id: number
    description: string
    status: 'todo' | 'in_progress' | 'done'
    task_id: number
    task_name: string
  }

  const tableData = ref<ModelData[]>([])
  const editTaskId = ref<number>()

  function editItem(item: ModelData) {
    form.task_name = item.task_name
    form.description = item.description
    form.status = item.status
    editTaskId.value = item.task_id
    drawerVisible.value = true
  }

  function clearForm() {
    editTaskId.value = undefined
    form.task_name = ''
    form.description = ''
    form.status = 'todo'
    form.creator_id = undefined
  }

  const form = reactive<{
    task_name: string
    description: string
    status: 'todo' | 'in_progress' | 'done'
    creator_id: number | undefined
  }>({
    task_name: '',
    description: '',
    status: 'todo',
    creator_id: undefined,
  })

  function requestData() {
    fetch('/dev/tasks', {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => (tableData.value = result))
      .catch((error) => console.warn(error))
  }
  onMounted(requestData)

  function deleteItem(item: ModelData) {
    fetch(`/dev/tasks/${item.task_id}`, {
      method: 'DELETE',
      redirect: 'follow',
    })
      .then(() => {
        ElMessage.success('删除成功')
        requestData()
      })
      .catch((error) => console.warn(error))
  }

  function createTask() {
    fetch('/dev/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        ElMessage.success('创建成功')
        tableData.value.push(result)
        drawerVisible.value = false
      })
      .catch((error) => console.warn(error))
  }

  function updateTask() {
    fetch(`/dev/tasks/${editTaskId.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        ElMessage.success('修改成功')
        const taskInde = tableData.value.findIndex((item) => item.task_id === editTaskId.value)
        tableData.value[taskInde] = result
        drawerVisible.value = false
      })
      .catch((error) => console.warn(error))
  }
</script>
