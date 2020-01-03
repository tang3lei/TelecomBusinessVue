<template>
<div class="block">
    <el-col :span="12">
        <h2>天级营业数据</h2>
    </el-col>
    <el-col :span="24">
        <span class="demonstration">选择日期</span>
        <el-date-picker v-model="dailyV" value-format="yyyy-MM-dd" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
        <el-button type="primary" plain @click="test" id="test">查询</el-button>
    </el-col>
    <el-table show-summary v-if='needTable' :data="tableData" border style="width: 100%">
        <el-table-column prop="employee" label="营业员" width="180">
        </el-table-column>
        <el-table-column prop="arr.length" label="数量" width="180">
        </el-table-column>
        <el-table-column prop="cost" label="金额" width="180">
        </el-table-column>
    </el-table>
    <el-col :span="12">
        <div id="numChart" :style="{width: '400px', height: '400px', marginTop:'20px'}"></div>
    </el-col>
    <el-col :span="12">
        <div id="costChart" :style="{width: '400px', height: '400px', marginTop:'20px'}"></div>
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
        }
    },
    created() {},
    methods: {
        test() {
            const url = 'http://62.234.149.71:8080/api/deal/daily?begin_daily=' + this.dailyV[0] + '&end_daily=' + this.dailyV[1]
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
                        this.needTable = true
                        var arr = []
                        for (var i in response.data.data) {
                            var cost = 0
                            for (var j = 0, len = response.data.data[i].length; j < len; j++) {
                                cost = cost + response.data.data[i][j].cost
                            }
                            arr.push({
                                employee: i,
                                arr: response.data.data[i],
                                cost: cost,
                            })
                        }
                        this.tableData = arr
                        this.drawNumPie()
                        this.drawCostPie()
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        drawNumPie() {
            let numChart = this.$echarts.init(document.getElementById('numChart'))
            let ls = []
            for (var j = 0, len = this.tableData.length; j < len; j++) {
                ls.push({
                    name: this.tableData[j].employee,
                    value: this.tableData[j].arr.length
                })
            }
            numChart.setOption({
                title: {
                    text: '营业员日数量'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                series: [{
                    type: 'pie',
                    data: ls,
                    left: 20,
                    label: {
                        position: 'inside',
                        alignTo: 'none',
                        bleedMargin: 5
                    },
                }]
            });
        },
        drawCostPie() {
            let costChart = this.$echarts.init(document.getElementById('costChart'))
            let ls = []
            for (var j = 0, len = this.tableData.length; j < len; j++) {
                ls.push({
                    name: this.tableData[j].employee,
                    value: this.tableData[j].cost
                })
            }
            costChart.setOption({
                title: {
                    text: '营业员日业绩'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                series: [{
                    type: 'pie',
                    data: ls,
                    left: 20,
                    label: {
                        position: 'inside',
                        alignTo: 'none',
                        bleedMargin: 5
                    },
                }]
            });
        }
    }
}
</script>
