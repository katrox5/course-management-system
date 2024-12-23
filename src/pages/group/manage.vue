<template>
  <div class="b-b-solid b-b-[#f4f3f3]">
    <h3 class="mb-4">分组管理</h3>
    <el-form :model="form">
      <div class="grid gap-3" style="grid-template-columns: repeat(2, 1fr) auto">
        <el-form-item label="组号">
          <el-input v-model="form.groupId" placeholder="请输入组号" />
        </el-form-item>
        <el-form-item label="组名">
          <el-input v-model="form.groupName" placeholder="请输入组名" />
        </el-form-item>
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
      <el-table-column prop="groupId" label="组号" />
      <el-table-column prop="groupName" label="组名" />
      <el-table-column prop="groupLeaderId" label="组长">
        <template #default="{ row }">{{ getUserName(row.groupLeaderId) }}</template>
      </el-table-column>
      <el-table-column label="成员数量" width="100">
        <template #default="{ row }">
          <el-tag round :type="row.memberCount != 8 ? 'success' : 'danger'"
            >{{ row.memberCount }} / 8</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="{ row }">
          <el-button icon="ElIconDelete" type="danger" link @click="deleteItem(row)" title="删除" />
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
  import { ElMessage } from 'element-plus'
  import { useUserStore } from '@/stores/user'

  const PageSize = 10
  const pageIndex = ref(0)

  const { getUserName } = useUserStore()

  type ModelData = {
    groupId: number | undefined
    groupName: string
    groupLeaderId: number | undefined
    memberCount: string
  }

  function requestData() {
    fetch('/dev/group/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        const tempArray = []
        for (const item of result.data.userGroupDtoList) {
          tempArray.push({
            groupId: item.groupId,
            groupName: item.groupName,
            groupLeaderId: item.userId,
            memberCount: item.member_count,
          })
        }
        tableData.value = tempArray
      })
      .catch((error) => console.warn(error))
  }
  onMounted(requestData)

  const form = reactive<ModelData>({
    groupId: undefined,
    groupName: '',
    groupLeaderId: undefined,
    memberCount: '',
  })

  const tableData = ref<ModelData[]>([])
  const tableDataFilter = computed(() => {
    return tableData.value.filter((item) => {
      return (
        (!form.groupId || String(item.groupId).includes(String(form.groupId))) &&
        (!form.groupName || item.groupName.includes(form.groupName))
      )
    })
  })

  function resetForm() {
    form.groupId = undefined
    form.groupName = ''
  }

  function deleteItem(item: ModelData) {
    fetch(`/dev/group/deleteGroup?groupsId=${item.groupId}`, {
      method: 'DELETE',
      redirect: 'follow',
    })
      .then(() => {
        ElMessage.success('删除成功')
        requestData()
      })
      .catch((error) => console.warn(error))
  }
</script>
