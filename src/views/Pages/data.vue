<template>
    <div class="echart" id="mychart" :style="myChartStyle"></div>
</template>

<script>
import * as echarts from "echarts";
import axios from 'axios'
export default {
    data() {
        return {
            myChart: {},
            myChartStyle: { float: "left", width: "100%", height: "100%" },
            data: [],
        };
    },
    mounted() {
        this.getData();
        this.initDate();
    },
    methods: {
        getData() {

                this.data.push({ 'value': 86, 'name': '蝗虫' })
                this.data.push({ 'value': 2, 'name': '印度谷螟' })
                this.data.push({ 'value': 0, 'name': '鹿纹天蚕蛾' })
                this.data.push({ 'value': 13, 'name': '玉米螟' })
                this.data.push({ 'value': 25, 'name': '棉铃虫' })
                this.initDate()
        },
        initDate() {
            this.initEcharts()
        },
        initEcharts() {
            const option = {
                title: {
                    top: "10%",
                    text: '统计情况统计',
                    subtext: '一号机位',
                    left: 'center'
                },

                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '10%',
                    orient: 'vertical',
                    left: 'right'
                },
                series: [
                    {
                        name: '检测统计',
                        type: 'pie',
                        radius: '60%',
                        data: this.data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            const optionFree = {
                xAxis: {},
                yAxis: {},
                series: [
                    {
                        data: this.seriesData,
                        type: "line",
                        smooth: true
                    }
                ]
            };
            this.myChart = echarts.init(document.getElementById("mychart"));
            this.myChart.setOption(option);
            window.addEventListener("resize", () => {
                this.myChart.resize();
            });
        }
    }
};
</script>
<style>

</style>
