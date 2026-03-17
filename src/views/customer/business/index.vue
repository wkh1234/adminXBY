<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const searchForm = reactive({
  name: '',
  stage: '',
  status: ''
})

const tableData = ref([
  { id: '1', name: '北京校区拓展', customer: '北京科技有限公司', amount: 50000, stage: '需求沟通', probability: 60, bd: '张三', createTime: '2024-01-01', expectDate: '2024-02-01' },
  { id: '2', name: '上海门店合作', customer: '上海餐饮连锁', amount: 30000, stage: '方案报价', probability: 80, bd: '李四', createTime: '2024-01-05', expectDate: '2024-01-20' },
  { id: '3', name: '广州商场入驻', customer: '广州零售集团', amount: 80000, stage: '谈判签约', probability: 90, bd: '王五', createTime: '2024-01-10', expectDate: '2024-01-25' }
])

const stageOptions = ['需求沟通', '方案报价', '谈判签约', '已签约']
const statusOptions = [
  { label: '跟进中', value: 1 },
  { label: '已成交', value: 2 },
  { label: '已失败', value: 3 }
]

const dialogVisible = ref(false)
const form = ref({ name: '', customer: '', amount: 0, stage: '', probability: 50, bd: '', expectDate: '' })

function handleSearch() {
  ElMessage.success('搜索成功')
}

function handleReset() {
  searchForm.name = ''
  searchForm.stage = ''
  searchForm.status = ''
}

function handleAdd() {
  form.value = { name: '', customer: '', amount: 0, stage: '', probability: 50, bd: '', expectDate: '' }
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
  <div class="business-page">
    <el-card>
      <template #header>
        <span>商机搜索</span>
      </template>
      <el-form :model="searchForm" inline>
        <el-form-item label="商机名称">
          <el-input v-model="searchForm.name" placeholder="请输入商机名称" clearable />
        </el-form-item>
        <el-form-item label="商机阶段">
          <el-select v-model="searchForm.stage" placeholder="请选择" clearable>
            <el-option v-for="s in stageOptions" :key="s" :label="s" :value="s" />
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
          <span>商机列表</span>
          <el-button type="primary" @click="handleAdd">新增商机</el-button>
        </div>
      </template>
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="商机名称" width="180" />
        <el-table-column prop="customer" label="客户名称" width="150" />
        <el-table-column prop="amount" label="预计金额" width="100">
          <template #default="{ row }">¥{{ row.amount.toLocaleString() }}</template>
        </el-table-column>
        <el-table-column prop="stage" label="商机阶段" width="100">
          <template #default="{ row }">
            <el-tag size="small">{{ row.stage }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="probability" label="成功率" width="80">
          <template #default="{ row }">{{ row.probability }}%</template>
        </el-table-column>
        <el-table-column prop="bd" label="负责人" width="100" />
        <el-table-column prop="expectDate" label="预计成交日期" width="120" />
        <el-table-column prop="createTime" label="创建时间" width="120" />
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="商机信息" width="600px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="商机名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="form.customer" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="预计金额">
              <el-input-number v-model="form.amount" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商机阶段">
              <el-select v-model="form.stage" style="width: 100%">
                <el-option v-for="s in stageOptions" :key="s" :label="s" :value="s" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="成功率">
              <el-slider v-model="form.probability" :marks="{ 0: '0%', 50: '50%', 100: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计成交日">
              <el-date-picker v-model="form.expectDate" type="date" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="负责人">
          <el-input v-model="form.bd" />
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
.business-page {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
