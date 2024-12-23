<template>
  <div class="grid gap-2 group__cards">
    <template v-for="item in tableData">
      <el-card shadow="hover" class="w-[250px] !bg-[#f4f3f3]" body-class="!p-3">
        <div class="flex items-center gap-x-2">
          <el-icon :color="item ? '#67c23a' : '#409eff'">
            <el-icon-success-filled v-if="item" />
            <el-icon-info-filled v-else />
          </el-icon>
          <span class="text-sm font-medium"> {{ item ? '已' : '可' }}选择 </span>
        </div>
        <div class="flex flex-col text-sm text-gray-5 pl-6 py-3">
          <span>组号：{{ item.groupId }}</span>
          <span>组名：{{ item.groupName }}</span>
          <span>组长：{{ item.groupLeaderId }}</span>
          <span>已选人数：{{ item.memberCount }} / 8</span>
        </div>
        <div class="flex flex-row-reverse">
          <el-button
            :type="item ? 'danger' : 'primary'"
            class="flex ml-auto"
            @click=""
          >
            {{ item ? '取消' : '确认' }}选择
          </el-button>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script setup lang="ts">
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
        const obj = []
        for (const item of result.data.userGroupDtoList) {
          obj.push({
            groupId: item.groupId,
            groupName: item.groupName,
            groupLeaderId: item.userId,
            memberCount: item.member_count,
          })
        }
        tableData.value = obj
      })
      .catch((error) => console.warn(error))
  }
  onMounted(requestData)

  const tableData = ref<ModelData[]>([])
</script>

<style scoped>
  .group__cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
</style>
