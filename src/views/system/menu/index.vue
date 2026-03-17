<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const tableData = ref([
  { id: '1', name: '系统管理', icon: 'Setting', path: '/system', sort: 1, status: 1 },
  { id: '1-1', name: '组织机构', icon: 'OfficeBuilding', path: '/system/organization', sort: 1, status: 1, pid: '1' },
  { id: '1-2', name: '用户管理', icon: 'User', path: '/system/user', sort: 2, status: 1, pid: '1' },
  { id: '2', name: '客户管理', icon: 'ShoppingCart', path: '/customer', sort: 2, status: 1 },
  { id: '2-1', name: '客户列表', icon: 'List', path: '/customer/list', sort: 1, status: 1, pid: '2' }
])

const dialogVisible = ref(false)
const form = ref({ name: '', icon: '', path: '', sort: 1, status: 1, pid: '' })

function handleAdd(pid = '') {
  form.value = { name: '', icon: '', path: '', sort: 1, status: 1, pid }
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
  <div class="menu-page">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd('')">新增菜单</el-button>
    </div>

    <el-table :data="tableData" row-key="id" border :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="name" label="菜单名称" width="180" />
      <el-table-column prop="icon" label="图标" width="100">
        <template #default="{ row }">
          <el-icon v-if="row.icon"><component :is="row.icon" /></el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="路由路径" width="200" />
      <el-table-column prop="sort" label="排序" width="80" />
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="handleAdd(row.id)">新增</el-button>
          <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button link type="danger" size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="菜单信息" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="上级菜单">
          <el-tree-select v-model="form.pid" :data="tableData" :props="{ label: 'name', value: 'id', children: 'children' }" placeholder="请选择" clearable style="width: 100%" />
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon" placeholder="请输入图标名称" />
        </el-form-item>
        <el-form-item label="路由路径">
          <el-input v-model="form.path" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort" :min="1" style="width: 100%" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
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
.menu-page {
  .toolbar {
    margin-bottom: 16px;
  }
}
</style>
