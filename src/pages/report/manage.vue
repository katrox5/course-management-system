<template>
  <div class="report-management">
    <div class="search-bar">
      <label>学号</label>
      <input v-model="studentId" placeholder="请输入学号" />
      <label>姓名</label>
      <input v-model="name" placeholder="请输入姓名" />
      <button @click="searchReports">查询</button>
    </div>
    <div class="report-list">
      <table>
        <thead>
          <tr>
            <th>周数</th>
            <th>位次</th>
            <th>标签</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.id">
            <td>{{ report.week }}</td>
            <td>{{ report.position }}</td>
            <td>
              <span :class="{ selected: report.selected }">{{ report.label }}</span>
            </td>
            <td>
              <button @click="viewReport(report)">查看</button>
              <button @click="editReport(report)">编辑</button>
              <button @click="deleteReport(report)">删除</button>
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
    <el-dialog title="查看信息" v-model="showViewModal" width="30%">
      <div>
        <p><strong>学生姓名:</strong> {{ currentReport.name }}</p>
        <p><strong>学生学号:</strong> {{ currentReport.studentId }}</p>
      </div>

      <el-button @click="showViewModal = false">关闭</el-button>
    </el-dialog>
    <EditModal
      v-if="showEditModal"
      :report="currentReport"
      @close="showEditModal = false"
      @update="updateReport"
    ></EditModal>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  // 示例数据
  const reports = ref([
    {
      id: 1,
      week: '第一周',
      position: 1,
      label: '已选择',
      selected: true,
      name: '吴彦祖',
      studentId: '20222222',
      imageUrl: 'https://example.com/image1.jpg',
    },
    {
      id: 2,
      week: '第一周',
      position: 2,
      label: '未选择',
      selected: false,
      name: '李二',
      studentId: '20222223',
      imageUrl: 'https://example.com/image2.jpg',
    },
    // 更多数据...
  ])

  const showModal = ref(false)
  const showViewModal = ref(false)
  const showEditModal = ref(false)
  const currentReport = ref({})

  const studentId = ref('')
  const name = ref('')

  const searchReports = () => {
    // 模拟搜索逻辑
    console.log('Search:', studentId.value, name.value)
  }

  const viewReport = (report) => {
    console.log('dadada')
    showViewModal.value = true
    currentReport.value = report
  }

  const editReport = (report) => {
    currentReport.value = report
    showEditModal.value = true
  }

  const deleteReport = (report) => {
    alert(`删除 ${report.week} 第${report.position}位`)
  }

  const currentPage = ref(1)
  const itemsPerPage = 5
  const totalPages = computed(() => Math.ceil(reports.value.length / itemsPerPage))

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

  const updateReport = (updatedReport) => {
    const index = reports.value.findIndex((r) => r.id === updatedReport.id)
    if (index !== -1) {
      reports.value[index] = updatedReport
    }
  }
</script>

<style scoped>
  .report-management {
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

  .report-list {
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

  .selected {
    color: green;
    border: 1px solid green;
    border-radius: 20px;
    padding: 5px 10px;
  }
</style>
