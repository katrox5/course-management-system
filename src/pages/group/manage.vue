<script setup lang="ts"></script>

<template>
  <div class="group-management">
    <div class="search-bar">
      <label>学号</label>
      <input v-model="studentId" placeholder="请输入学号" />
      <label>姓名</label>
      <input v-model="name" placeholder="请输入姓名" />
      <button @click="searchGroups">查询</button>
    </div>
    <div class="group-list">
      <table>
        <thead>
          <tr>
            <th>组别</th>
            <th>组名</th>
            <th>组长</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in groups" :key="group.id">
            <td>{{ group.groupNumber }}</td>
            <td>{{ group.name }}</td>
            <td>{{ group.leader }}</td>
            <td>{{ group.status }}</td>
            <td>
              <button @click="viewGroup(group)">查看</button>
              <button @click="deleteGroup(group)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">‹</button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="gotoPage(page)"
          :class="{ active: currentPage === page }"
          >{{ page }}</button
        >
        <button @click="nextPage" :disabled="currentPage === totalPages">›</button>
      </div>
    </div>
    <button @click="addGroup" class="add-group-button">+ 新建</button>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  // 示例数据
  const groups = ref([
    {
      id: 1,
      groupNumber: '一号',
      name: '第一组',
      leader: '吴彦祖',
      status: '5/8',
    },
    {
      id: 2,
      groupNumber: '二号',
      name: '第二组',
      leader: '李二',
      status: '7/8',
    },
    {
      id: 3,
      groupNumber: '三号',
      name: '第三组',
      leader: '李三',
      status: '7/8',
    },
    {
      id: 4,
      groupNumber: '四号',
      name: '第四组',
      leader: '李四',
      status: '8/8',
    },
    {
      id: 5,
      groupNumber: '五号',
      name: '第五组',
      leader: '李五',
      status: '3/8',
    },
  ])

  const studentId = ref('')
  const name = ref('')

  const searchGroups = () => {
    // 模拟搜索逻辑
    console.log('Search:', studentId.value, name.value)
  }

  const viewGroup = (group) => {
    alert(`查看 ${group.name}`)
  }

  const deleteGroup = (group) => {
    alert(`删除 ${group.name}`)
  }

  const addGroup = () => {
    alert('新建分组')
  }

  const currentPage = ref(1)
  const itemsPerPage = 5
  const totalPages = computed(() => Math.ceil(groups.value.length / itemsPerPage))

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const gotoPage = (page) => {
    currentPage.value = page
  }
</script>

<style scoped>
  .group-management {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .search-bar input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .search-bar button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .group-list {
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  td {
    text-align: center;
  }

  td button {
    padding: 5px 10px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  td button:first-child {
    background-color: #007bff;
    color: white;
  }

  td button:last-child {
    background-color: #dc3545;
    color: white;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .pagination button {
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
  }

  .pagination .active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  .add-group-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
