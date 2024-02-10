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
            axios({
                url: 'http://127.0.0.1:8000/getdatacar3/',
                method: 'get',
            }).then(res => {
                this.data.push({ 'value': res.data['ok'], 'name': '已标准佩戴口罩' })
                this.data.push({ 'value': res.data['half'], 'name': '未标准佩戴口罩' })
                this.data.push({ 'value': res.data['no'], 'name': '未佩戴口罩' })
                this.initDate()
            })
        },
        initDate() {
            this.initEcharts()
        },
        initEcharts() {
            const option = {

                title: {
                    top: "10%",
                    text: '口罩佩戴情况统计',
                    subtext: '三号机位',
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
                        name: '佩戴情况统计',
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
