<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const tableData = ref([
  { id: '1', name: '管理员', code: 'admin', status: 1, sort: 1, createTime: '2024-01-01' },
  { id: '2', name: 'BDM', code: 'bdm', status: 1, sort: 2, createTime: '2024-01-02' },
  { id: '3', name: 'BD', code: 'bd', status: 1, sort: 3, createTime: '2024-01-03' }
])

const dialogVisible = ref(false)
const form = ref({ name: '', code: '', sort: 1, status: 1, menuIds: [] as string[] })

const menuTreeData = ref([
  { id: '1', label: '系统管理', children: [
    { id: '1-1', label: '组织机构' },
    { id: '1-2', label: '用户管理' },
    { id: '1-3', label: '角色管理' },
    { id: '1-4', label: '菜单管理' }
  ]},
  { id: '2', label: '客户管理', children: [
    { id: '2-1', label: '客户列表' },
    { id: '2-2', label: '商机管理' }
  ]},
  { id: '3', label: '项目管理', children: [
    { id: '3-1', label: '勘察管理' },
    { id: '3-2', label: '签约管理' }
  ]}
])

function handleAdd() {
  form.value = { name: '', code: '', sort: 1, status: 1, menuIds: [] }
  dialogVisible.value = true
}

function handleEdit(row: any) {
  form.value = { ...row, menuIds: ['1', '1-1', '2', '2-1'] }
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
  <div class="role-page">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">新增角色</el-button>
    </div>

    <el-table :data="tableData" border>
      <el-table-column prop="name" label="角色名称" width="150" />
      <el-table-column prop="code" label="角色编码" width="150" />
      <el-table-column prop="sort" label="排序" width="80" />
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button link type="danger" size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="角色信息" width="600px">
      <el-form :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="角色名称">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色编码">
              <el-input v-model="form.code" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="排序">
              <el-input-number v-model="form.sort" :min="1" style="width: 100%" />
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
        <el-form-item label="菜单权限">
          <el-tree
            :data="menuTreeData"
            show-checkbox
            node-key="id"
            :props="{ label: 'label' }"
            :default-checked-keys="form.menuIds"
          />
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
.role-page {
  .toolbar {
    margin-bottom: 16px;
  }
}
</style>
