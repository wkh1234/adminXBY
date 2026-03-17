<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const searchForm = reactive({
  name: '',
  industry: '',
  status: ''
})

const tableData = ref([
  { id: '1', name: '北京科技有限公司', industry: '教育', contact: '张经理', phone: '13800138000', address: '北京市朝阳区', status: 1, bd: '张三', createTime: '2024-01-01' },
  { id: '2', name: '上海餐饮连锁', industry: '餐饮', contact: '李经理', phone: '13800138001', address: '上海市浦东新区', status: 2, bd: '李四', createTime: '2024-01-02' },
  { id: '3', name: '广州零售集团', industry: '零售', contact: '王经理', phone: '13800138002', address: '广州市天河区', status: 3, bd: '王五', createTime: '2024-01-03' }
])

const statusOptions = [
  { label: '潜在客户', value: 1 },
  { label: '意向客户', value: 2 },
  { label: '签约客户', value: 3 },
  { label: '流失客户', value: 4 }
]

const dialogVisible = ref(false)
const form = ref({ name: '', industry: '', contact: '', phone: '', address: '', status: 1, bd: '' })

function handleSearch() {
  ElMessage.success('搜索成功')
}

function handleReset() {
  searchForm.name = ''
  searchForm.industry = ''
  searchForm.status = ''
}

function handleAdd() {
  form.value = { name: '', industry: '', contact: '', phone: '', address: '', status: 1, bd: '' }
  dialogVisible.value = true
}

function handleEdit(row: any) {
  form.value = { ...row }
  dialogVisible.value = true
}

function handleView(row: any) {
  ElMessage.info('查看详情: ' + row.name)
}

function handleSubmit() {
  ElMessage.success('保存成功')
  dialogVisible.value = false
}
</script>

<template>
  <div class="customer-list-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>客户搜索</span>
        </div>
      </template>
      <el-form :model="searchForm" inline>
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.name" placeholder="请输入客户名称" clearable />
        </el-form-item>
        <el-form-item label="行业">
          <el-select v-model="searchForm.industry" placeholder="请选择" clearable>
            <el-option label="教育" value="教育" />
            <el-option label="餐饮" value="餐饮" />
            <el-option label="零售" value="零售" />
            <el-option label="医疗" value="医疗" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
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
          <span>客户列表</span>
          <el-button type="primary" @click="handleAdd">新增客户</el-button>
        </div>
      </template>
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="客户名称" width="200" />
        <el-table-column prop="industry" label="行业" width="100" />
        <el-table-column prop="contact" label="联系人" width="100" />
        <el-table-column prop="phone" label="联系电话" width="130" />
        <el-table-column prop="address" label="地址" width="200" />
        <el-table-column prop="bd" label="负责BD" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'info' : row.status === 2 ? 'warning' : row.status === 3 ? 'success' : 'danger'" size="small">
              {{ statusOptions.find(s => s.value === row.status)?.label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="120" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleView(row)">详情</el-button>
            <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="客户信息" width="600px">
      <el-form :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户名称">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行业">
              <el-select v-model="form.industry" style="width: 100%">
                <el-option label="教育" value="教育" />
                <el-option label="餐饮" value="餐饮" />
                <el-option label="零售" value="零售" />
                <el-option label="医疗" value="医疗" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系人">
              <el-input v-model="form.contact" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="地址">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="负责BD">
              <el-input v-model="form.bd" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="form.status" style="width: 100%">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
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
.customer-list-page {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
