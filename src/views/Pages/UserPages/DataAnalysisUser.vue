// src/App.vue
<template>
  <div id="app">
    <el-button type="success" @click="loadChartData('monthlySmoking')">按月吸烟统计</el-button>
    <el-button type="success" @click="loadChartData('mostTerritories')">用户辖区数量统计</el-button>
    <el-button type="success" @click="loadChartData('mostUsers')">辖区用户数量统计</el-button>

    <universal-chart :chart-data="chartData" :chart-title="chartTitle" :chart-type="chartType" />
  </div>
</template>

<script>
import UniversalChart from '@/components/Echars.vue'
import { get } from '@/utils/request'

export default {
  name: 'App',
  components: {
    UniversalChart
  },
  data() {
    return {
      chartData: {
        xData: [],
        seriesData: []
      },
      chartTitle: '',
      chartType: 'bar'
    };
  },
  methods: {
    loadChartData(chartType) {
      let url = '';
      switch (chartType) {
        case 'monthlySmoking':
          url = '/DataAnalysis/smoking/monthly';
          this.chartTitle = '按月吸烟统计';
          break;
        case 'mostTerritories':
          url = '/DataAnalysis/user/territories';
          this.chartTitle = '用户辖区数量统计';
          break;
        case 'mostUsers':
          url = '/DataAnalysis/user/smoking';
          this.chartTitle = '辖区用户数量统计';
          break;
        default:
          return;
      }

      get(url, {}, true).then(response => {
        if (response.data) {
          const { data } = response;
          this.chartData = {
            xData: data.map(item => chartType === 'monthlySmoking' ? `${item.year}-${item.month}` : item.Username || item.TerritoryName),
            seriesData: data.map(item => item.count || item.territoryCount || item.userCount)
          };
        }
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    }
  }
};
</script>
