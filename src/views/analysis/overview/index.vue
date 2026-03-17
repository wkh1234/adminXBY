<script setup lang="ts">
import { ref } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, PieChart, BarChart, GridComponent, TooltipComponent, LegendComponent])

const pieOption = ref({
  tooltip: { trigger: 'item' },
  legend: { bottom: '0%' },
  series: [{
    name: '客户行业分布',
    type: 'pie',
    radius: ['40%', '70%'],
    data: [
      { value: 335, name: '教育' },
      { value: 310, name: '餐饮' },
      { value: 234, name: '零售' },
      { value: 135, name: '医疗' },
      { value: 154, name: '其他' }
    ]
  }]
})

const barOption = ref({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { data: ['签约数', '回款金额'] },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'] },
  yAxis: [{ type: 'value', name: '签约数' }, { type: 'value', name: '金额(万)' }],
  series: [
    { name: '签约数', type: 'bar', data: [12, 15, 18, 22, 19, 25] },
    { name: '回款金额', type: 'bar', yAxisIndex: 1, data: [50, 65, 78, 95, 82, 110]
  }]
})
</script>

<template>
  <div class="analysis-overview">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>客户行业分布</span>
          </template>
          <v-chart :option="pieOption" style="height: 350px" autoresize />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>月度签约趋势</span>
          </template>
          <v-chart :option="barOption" style="height: 350px" autoresize />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.analysis-overview {
  :deep(.el-card) {
    margin-bottom: 20px;
  }
}
</style>
