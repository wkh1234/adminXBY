<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const searchForm = reactive({
  customerName: '',
  status: ''
})

const tableData = ref([
  { id: '1', customerName: '北京科技有限公司', contractNo: 'CT2024010001', amount: 50000, period: 12, signDate: '2024-01-10', expireDate: '2025-01-10', bd: '张三', status: 1 },
  { id: '2', customerName: '上海餐饮连锁', contractNo: 'CT2024010002', amount: 30000, period: 6, signDate: '2024-01-12', expireDate: '2024-07-12', bd: '李四', status: 2 },
  { id: '3', customerName: '广州零售集团', contractNo: 'CT2024010003', amount: 80000, period: 24, signDate: '2024-01-15', expireDate: '2026-01-15', bd: '王五', status: 1 }
])

const statusOptions = [
  { label: '待签约', value: 1 },
  { label: '已签约', value: 2 },
  { label: '已到期', value: 3 },
  { label: '已终止', value: 4 }
]

const dialogVisible = ref(false)
const form = ref({ customerName: '', contractNo: '', amount: 0, period: 12, signDate: '', bd: '', status: 1 })

function handleSearch() {
  ElMessage.success('搜索成功')
}

function handleReset() {
  searchForm.customerName = ''
  searchForm.status = ''
}

function handleAdd() {
  form.value = { customerName: '', contractNo: '', amount: 0, period: 12, signDate: '', bd: '', status: 1 }
  dialogVisible.value = true
}

function handleEdit(row: any) {
  form.value = { ...row }
  dialogVisible.value = true
}

function handleView(row: any) {
  ElMessage.info('查看合同详情: ' + row.contractNo)
}

function handleSubmit() {
  ElMessage.success('保存成功')
  dialogVisible.value = false
}
</script>

<template>
  <div class="sign-page">
    <el-card>
      <template #header>
        <span>签约搜索</span>
      </template>
      <el-form :model="searchForm" inline>
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.customerName" placeholder="请输入客户名称" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable>
            <el-option v-for="s in statusOptions" :key="s.value" :label="s.label" :value="s.value" />
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
          <span>签约列表</span>
          <el-button type="primary" @click="handleAdd">新增签约</el-button>
        </div>
      </template>
      <el-table :data="tableData" border>
        <el-table-column prop="contractNo" label="合同编号" width="150" />
        <el-table-column prop="customerName" label="客户名称" width="150" />
        <el-table-column prop="amount" label="合同金额" width="120">
          <template #default="{ row }">¥{{ row.amount.toLocaleString() }}</template>
        </el-table-column>
        <el-table-column prop="period" label="合同期限" width="100">
          <template #default="{ row }">{{ row.period }}个月</template>
        </el-table-column>
        <el-table-column prop="signDate" label="签约日期" width="120" />
        <el-table-column prop="expireDate" label="到期日期" width="120" />
        <el-table-column prop="bd" label="负责人" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'info' : row.status === 2 ? 'success' : row.status === 3 ? 'warning' : 'danger'" size="small">
              {{ statusOptions.find(s => s.value === row.status)?.label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleView(row)">详情</el-button>
            <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="签约信息" width="600px">
      <el-form :model="form" label-width="90px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户名称">
              <el-input v-model="form.customerName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号">
              <el-input v-model="form.contractNo" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同金额">
              <el-input-number v-model="form.amount" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同期限">
              <el-input-number v-model="form.period" :min="1" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="签约日期">
              <el-date-picker v-model="form.signDate" type="date" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人">
              <el-input v-model="form.bd" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio v-for="s in statusOptions" :key="s.value" :value="s.value">{{ s.label }}</el-radio>
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
.sign-page {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
