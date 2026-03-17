<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const tableData = ref([
  { id: '1', title: '春节放假通知', type: '放假通知', status: 1, createTime: '2024-01-20', createUser: '管理员' },
  { id: '2', title: '新增功能上线', type: '系统公告', status: 1, createTime: '2024-01-18', createUser: '管理员' },
  { id: '3', title: '考核规则调整', type: '业务通知', status: 2, createTime: '2024-01-15', createUser: '管理员' }
])

const dialogVisible = ref(false)
const form = ref({ title: '', type: '', content: '', status: 1 })

function handleAdd() {
  form.value = { title: '', type: '', content: '', status: 1 }
  dialogVisible.value = true
}

function handleEdit(row: any) {
  form.value = { ...row }
  dialogVisible.value = true
}

function handleSubmit() {
  ElMessage.success('保存成功')
  dialogVisible.value = false
}
</script>

<template>
  <div class="notice-page">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">发布公告</el-button>
    </div>
    <el-table :data="tableData" border>
      <el-table-column prop="title" label="公告标题" width="250" />
      <el-table-column prop="type" label="公告类型" width="120" />
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">
            {{ row.status === 1 ? '已发布' : '草稿' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createUser" label="发布人" width="100" />
      <el-table-column prop="createTime" label="发布时间" width="120" />
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="公告信息" width="600px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" style="width: 100%">
            <el-option label="系统公告" value="系统公告" />
            <el-option label="业务通知" value="业务通知" />
            <el-option label="放假通知" value="放假通知" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.content" type="textarea" :rows="5" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :value="1">发布</el-radio>
            <el-radio :value="0">草稿</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.notice-page {
  .toolbar {
    margin-bottom: 16px;
  }
}
</style>
