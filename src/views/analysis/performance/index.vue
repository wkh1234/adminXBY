<script setup lang="ts">
import { ref } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent])

const barOption = ref({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { data: ['BD', 'BDM'] },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: { type: 'category', data: ['张三', '李四', '王五', '赵六', '孙七'] },
  yAxis: { type: 'value' },
  series: [
    { name: 'BD', type: 'bar', data: [15, 12, 18, 14, 16] },
    { name: 'BDM', type: 'bar', data: [5, 4, 6, 3, 5]
  }]
})
</script>

<template>
  <div class="performance-page">
    <el-card>
      <template #header>
        <span>人员绩效排行</span>
      </template>
      <v-chart :option="barOption" style="height: 400px" autoresize />
    </el-card>
  </div>
</template>
