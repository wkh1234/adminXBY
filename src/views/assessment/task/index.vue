<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const tableData = ref([
  { id: '1', name: '1月考核', type: '月度考核', target: '签约5单', startDate: '2024-01-01', endDate: '2024-01-31', status: 2 },
  { id: '2', name: 'Q1季度考核', type: '季度考核', target: '签约20单', startDate: '2024-01-01', endDate: '2024-03-31', status: 2 },
  { id: '3', name: '2月考核', type: '月度考核', target: '签约6单', startDate: '2024-02-01', endDate: '2024-02-29', status: 1 }
])

const statusOptions = [
  { label: '未开始', value: 1 },
  { label: '进行中', value: 2 },
  { label: '已结束', value: 3 }
]

function handleAdd() {
  ElMessage.info('新增考核任务')
}

function handleEdit(row: any) {
  ElMessage.info('编辑考核任务')
}
</script>

<template>
  <div class="assessment-task-page">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">新增考核任务</el-button>
    </div>
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="考核名称" width="150" />
      <el-table-column prop="type" label="考核类型" width="120" />
      <el-table-column prop="target" label="考核目标" width="200" />
      <el-table-column prop="startDate" label="开始日期" width="120" />
      <el-table-column prop="endDate" label="结束日期" width="120" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'info' : row.status === 2 ? 'primary' : 'success'" size="small">
            {{ statusOptions.find(s => s.value === row.status)?.label }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.assessment-task-page {
  .toolbar {
    margin-bottom: 16px;
  }
}
</style>
