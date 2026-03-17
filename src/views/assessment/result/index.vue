<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: '1', userName: '张三', taskName: '1月考核', score: 95, rank: 1, assessDate: '2024-02-01' },
  { id: '2', userName: '李四', taskName: '1月考核', score: 88, rank: 2, assessDate: '2024-02-01' },
  { id: '3', userName: '王五', taskName: '1月考核', score: 82, rank: 3, assessDate: '2024-02-01' }
])
</script>

<template>
  <div class="assessment-result-page">
    <el-table :data="tableData" border>
      <el-table-column prop="userName" label="员工姓名" width="120" />
      <el-table-column prop="taskName" label="考核任务" width="150" />
      <el-table-column prop="score" label="考核得分" width="100" />
      <el-table-column prop="rank" label="排名" width="80" />
      <el-table-column prop="assessDate" label="考核日期" width="120" />
    </el-table>
  </div>
</template>
