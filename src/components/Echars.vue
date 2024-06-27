<template>
  <div ref="chartContainer" style="width: 600px; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartType: {
      type: String,
      default: 'bar'
    },
    chartTitle: {
      type: String,
      required: true
    },
    xAxisType: {
      type: String,
      default: 'category'
    }
  },
  watch: {
    chartData: {
      handler() {
        this.renderChart();
      },
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.renderChart();
    });
  },
  methods: {
    renderChart() {
      if (this.$refs.chartContainer) {
        const chartDom = this.$refs.chartContainer;
        const myChart = echarts.init(chartDom);
        const option = {
          title: {
            text: this.chartTitle
          },
          tooltip: {},
          xAxis: {
            type: this.xAxisType,
            data: this.chartData.xData
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.chartData.seriesData,
            type: this.chartType
          }]
        };
        myChart.setOption(option);
      } else {
        console.error('Chart container DOM element does not exist');
      }
    }
  }
};
</script>
