<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, PieChart, LineChart, BarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const statCards = ref([
  { title: '客户总数', value: '1,234', icon: 'User', color: '#409eff', trend: '+12%' },
  { title: '商机数量', value: '567', icon: 'TrendCharts', color: '#67c23a', trend: '+8%' },
  { title: '勘察中', value: '89', icon: 'View', color: '#e6a23c', trend: '+5%' },
  { title: '已签约', value: '234', icon: 'EditPen', color: '#f56c6c', trend: '+15%' }
])

const pieOption = ref({
  tooltip: { trigger: 'item' },
  legend: { bottom: '0%' },
  series: [{
    name: '客户分布',
    type: 'pie',
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
    label: { show: false },
    emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
    data: [
      { value: 335, name: '教育' },
      { value: 310, name: '餐饮' },
      { value: 234, name: '零售' },
      { value: 135, name: '医疗' },
      { value: 154, name: '其他' }
    ]
  }]
})

const lineOption = ref({
  tooltip: { trigger: 'axis' },
  legend: { data: ['新增客户', '签约数'] },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: { type: 'category', boundaryGap: false, data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: '新增客户',
      type: 'line',
      smooth: true,
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '签约数',
      type: 'line',
      smooth: true,
      data: [22, 18, 19, 23, 29, 33, 31]
    }
  ]
})

const barOption = ref({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { data: ['已完成', '进行中'] },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: { type: 'category', data: ['北京', '上海', '广州', '深圳', '成都', '杭州'] },
  yAxis: { type: 'value' },
  series: [
    { name: '已完成', type: 'bar', data: [320, 302, 341, 374, 390, 450] },
    { name: '进行中', type: 'bar', stack: 'total', data: [120, 132, 101, 134, 90, 230] }
  ]
})
</script>

<template>
  <div class="dashboard">
    <el-row :gutter="20" class="stat-row">
      <el-col v-for="item in statCards" :key="item.title" :span="6">
        <div class="stat-card">
          <div class="stat-icon" :style="{ background: item.color }">
            <el-icon size="24"><component :is="item.icon" /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ item.value }}</div>
            <div class="stat-title">{{ item.title }}</div>
          </div>
          <div class="stat-trend" :style="{ color: item.color }">{{ item.trend }}</div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <div class="chart-card">
          <h3>客户行业分布</h3>
          <v-chart :option="pieOption" style="height: 300px" autoresize />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-card">
          <h3>趋势分析</h3>
          <v-chart :option="lineOption" style="height: 300px" autoresize />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="24">
        <div class="chart-card">
          <h3>城市业绩排行</h3>
          <v-chart :option="barOption" style="height: 300px" autoresize />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  .stat-card {
    display: flex;
    align-items: center;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .stat-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 8px;
      color: #fff;
    }

    .stat-content {
      flex: 1;
      margin-left: 16px;

      .stat-value {
        font-size: 24px;
        font-weight: 600;
        color: #333;
      }

      .stat-title {
        font-size: 14px;
        color: #999;
        margin-top: 4px;
      }
    }

    .stat-trend {
      font-size: 14px;
      font-weight: 500;
    }
  }

  .chart-card {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }
  }
}
</style>
