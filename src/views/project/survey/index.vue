<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const searchForm = reactive({
  customerName: '',
  status: ''
})

const tableData = ref([
  { id: '1', customerName: '北京科技有限公司', address: '北京市朝阳区', area: 200, contact: '张经理', phone: '13800138000', bd: '张三', status: 1, surveyDate: '2024-01-05', createTime: '2024-01-01' },
  { id: '2', customerName: '上海餐饮连锁', address: '上海市浦东新区', area: 150, contact: '李经理', phone: '13800138001', bd: '李四', status: 2, surveyDate: '2024-01-08', createTime: '2024-01-03' },
  { id: '3', customerName: '广州零售集团', address: '广州市天河区', area: 300, contact: '王经理', phone: '13800138002', bd: '王五', status: 3, surveyDate: '', createTime: '2024-01-10' }
])

const statusOptions = [
  { label: '待勘察', value: 1 },
  { label: '勘察中', value: 2 },
  { label: '已完成', value: 3 },
  { label: '已取消', value: 4 }
]

const dialogVisible = ref(false)
const form = ref({ customerName: '', address: '', area: 0, contact: '', phone: '', bd: '', status: 1, remark: '' })

function handleSearch() {
  ElMessage.success('搜索成功')
}

function handleReset() {
  searchForm.customerName = ''
  searchForm.status = ''
}

function handleAdd() {
  form.value = { customerName: '', address: '', area: 0, contact: '', phone: '', bd: '', status: 1, remark: '' }
  dialogVisible.value = true
}

function handleEdit(row: any) {
  form.value = { ...row }
  dialogVisible.value = true
}

function handleView(row: any) {
  ElMessage.info('查看勘察详情: ' + row.customerName)
}

function handleSubmit() {
  ElMessage.success('保存成功')
  dialogVisible.value = false
}
</script>

<template>
  <div class="survey-page">
    <el-card>
      <template #header>
        <span>勘察搜索</span>
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
          <span>勘察列表</span>
          <el-button type="primary" @click="handleAdd">新增勘察</el-button>
        </div>
      </template>
      <el-table :data="tableData" border>
        <el-table-column prop="customerName" label="客户名称" width="150" />
        <el-table-column prop="address" label="勘察地址" width="200" />
        <el-table-column prop="area" label="面积(㎡)" width="100" />
        <el-table-column prop="contact" label="联系人" width="100" />
        <el-table-column prop="phone" label="联系电话" width="130" />
        <el-table-column prop="bd" label="负责人" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'info' : row.status === 2 ? 'warning' : row.status === 3 ? 'success' : 'danger'" size="small">
              {{ statusOptions.find(s => s.value === row.status)?.label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="surveyDate" label="勘察日期" width="120" />
        <el-table-column prop="createTime" label="创建时间" width="120" />
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleView(row)">详情</el-button>
            <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="勘察信息" width="600px">
      <el-form :model="form" label-width="90px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户名称">
              <el-input v-model="form.customerName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="勘察地址">
              <el-input v-model="form.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="面积(㎡)">
              <el-input-number v-model="form.area" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人">
              <el-input v-model="form.contact" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人">
              <el-input v-model="form.bd" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :rows="3" />
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
.survey-page {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
