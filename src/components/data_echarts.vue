<template>
<div class="block">
        <el-col :span="12">
        <h2>选择日期后进行统计</h2>
    </el-col>
    <el-col :span="24">
        <span class="demonstration">选择日期</span>
        <el-date-picker v-model="dailyV" value-format="yyyy-MM-dd" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
        <el-button type="primary" plain @click="test" id="test">查询</el-button>
    </el-col>
    <el-col :span="24">
        <div id="employeeChart" :style="{width: '1200px', height: '400px', marginTop:'20px'}"></div>
    </el-col>
</div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            dailyV: '',
            tableData: [],
            needTable: false,
            caL: [],
            srL: [],
        }
    },
    created() {},
    methods: {
        test() {
            const url = 'http://62.234.149.71:8080/api/deal/user?begin_daily=' + this.dailyV[0] + '&end_daily=' + this.dailyV[1]
            axios.get(url)
                .then((response) => {
                    console.log(response);
                    if (response.data.msg != 'success') {
                        this.$notify.error({
                            title: 'server response error',
                            message: response.data.data,
                        });
                    } else {
                        this.$notify({
                            title: '成功',
                            message: '请求成功',
                            type: 'success'
                        });
                        this.caL = response.data.data.ca
                        this.srL = response.data.data.srls
                        this.drawEmployeeLine()
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        drawEmployeeLine() {
            let employeeChart = this.$echarts.init(document.getElementById('employeeChart'))
            employeeChart.setOption({
                title: {
                    text: '用户余额变化'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.caL
                },
                yAxis: {
                    type: 'value'
                },
                series: this.srL
            });
        }
    }
}
</script>
