<template>
    <div class="group-management">
      <div v-for="group in groups" :key="group.id" class="group-card">
        <div class="group-header">
          <span>{{ group.name }}</span>
          <button @click="selectGroup(group)" class="select-button">选择</button>
        </div>
        <div class="group-details">
          <p>组号：{{ group.groupNumber }}</p>
          <p>组长：{{ group.leader }}</p>
          <p>已选人数：{{ group.selectedCount }}/{{ group.totalCount }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // 示例数据
  const groups = ref([
    {
      id: 1,
      name: '第一组',
      groupNumber: '一号',
      leader: '吴彦祖',
      selectedCount: 7,
      totalCount: 8,
    },
    {
      id: 2,
      name: '第二组',
      groupNumber: '二号',
      leader: '李二',
      selectedCount: 7,
      totalCount: 8,
    },
    {
      id: 3,
      name: '第三组',
      groupNumber: '三号',
      leader: '王五',
      selectedCount: 6,
      totalCount: 8,
    },
    {
      id: 4,
      name: '第四组',
      groupNumber: '四号',
      leader: '赵六',
      selectedCount: 5,
      totalCount: 8,
    },
  ]);
  
  function selectGroup(group) {
    alert(`选择了 ${group.name}`);
  }
  </script>
  
  <style scoped>
  .group-management {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .group-card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .group-details {
    margin-top: 1rem;
  }
  
  .select-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .select-button:hover {
    background-color: #0056b3;
  }
  </style>