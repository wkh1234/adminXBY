<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const searchForm = reactive({
  name: '',
  phone: '',
  status: ''
})

const tableData = ref([
  { id: '1', name: '张三', username: 'zhangsan', phone: '13800138000', dept: '销售部', role: '管理员', status: 1, createTime: '2024-01-01' },
  { id: '2', name: '李四', username: 'lisi', phone: '13800138001', dept: '市场部', role: '普通用户', status: 1, createTime: '2024-01-02' },
  { id: '3', name: '王五', username: 'wangwu', phone: '13800138002', dept: '销售部', role: 'BD', status: 1, createTime: '2024-01-03' },
  { id: '4', name: '赵六', username: 'zhaoliu', phone: '13800138003', dept: '市场部', role: 'BDM', status: 0, createTime: '2024-01-04' }
])

const dialogVisible = ref(false)
const form = ref({ name: '', username: '', phone: '', dept: '', role: '', status: 1 })

function handleSearch() {
  ElMessage.success('搜索成功')
}

function handleReset() {
  searchForm.name = ''
  searchForm.phone = ''
  searchForm.status = ''
}

function handleAdd() {
  form.value = { name: '', username: '', phone: '', dept: '', role: '', status: 1 }
  dialogVisible.value = true
}

function handleEdit(row: any) {
  form.value = { ...row }
  dialogVisible.value = true
}

function handleDelete(row: any) {
  ElMessage.success('删除成功')
}

function handleSubmit() {
  ElMessage.success('保存成功')
  dialogVisible.value = false
}
</script>

<template>
  <div class="user-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户搜索</span>
        </div>
      </template>
      <el-form :model="searchForm" inline>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.phone" placeholder="请输入手机号" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 16px">
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
          <el-button type="primary" @click="handleAdd">新增用户</el-button>
        </div>
      </template>
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="phone" label="手机号" width="130" />
        <el-table-column prop="dept" label="部门" width="120" />
        <el-table-column prop="role" label="角色" width="100" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="120" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="用户信息" width="600px">
      <el-form :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="form.username" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门">
              <el-input v-model="form.dept" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="角色">
              <el-select v-model="form.role" style="width: 100%">
                <el-option label="管理员" value="管理员" />
                <el-option label="BDM" value="BDM" />
                <el-option label="BD" value="BD" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio :value="1">启用</el-radio>
                <el-radio :value="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.user-page {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
