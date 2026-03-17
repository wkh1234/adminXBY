<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface OrgNode {
  id: string
  name: string
  leader: string
  phone: string
  status: number
  children?: OrgNode[]
}

const treeData = ref<OrgNode[]>([
  {
    id: '1',
    name: '总公司',
    leader: '张三',
    phone: '13800138000',
    status: 1,
    children: [
      {
        id: '1-1',
        name: '北京分公司',
        leader: '李四',
        phone: '13800138001',
        status: 1,
        children: [
          { id: '1-1-1', name: '销售部', leader: '王五', phone: '13800138002', status: 1 },
          { id: '1-1-2', name: '市场部', leader: '赵六', phone: '13800138003', status: 1 }
        ]
      },
      {
        id: '1-2',
        name: '上海分公司',
        leader: '孙七',
        phone: '13800138004',
        status: 1
      }
    ]
  }
])

const defaultProps = {
  children: 'children',
  label: 'name'
}

const dialogVisible = ref(false)
const form = ref({ name: '', leader: '', phone: '', status: 1 })

function handleAdd(node: OrgNode) {
  form.value = { name: '', leader: '', phone: '', status: 1 }
  dialogVisible.value = true
}

function handleEdit(node: OrgNode) {
  form.value = { ...node }
  dialogVisible.value = true
}

function handleDelete(node: OrgNode) {
  ElMessageBox.confirm(`确定删除 "${node.name}" 吗？`, '提示', {
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
  })
}

function handleSubmit() {
  ElMessage.success('保存成功')
  dialogVisible.value = false
}
</script>

<template>
  <div class="organization-page">
    <div class="toolbar">
      <el-button type="primary">新增顶级部门</el-button>
    </div>
    <div class="tree-container">
      <el-table :data="treeData" row-key="id" :tree-props="defaultProps">
        <el-table-column prop="name" label="部门名称" width="200" />
        <el-table-column prop="leader" label="负责人" width="120" />
        <el-table-column prop="phone" label="联系电话" width="150" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleAdd(row)">新增</el-button>
            <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="dialogVisible" title="部门信息" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="部门名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="form.leader" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone" />
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
.organization-page {
  .toolbar {
    margin-bottom: 16px;
  }

  .tree-container {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
  }
}
</style>
