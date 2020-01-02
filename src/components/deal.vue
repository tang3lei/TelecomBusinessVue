<template>
<div>
    <el-table :data="tableData" v-loading="loading" stripe highlight-current-row style="width: 100%" max-height="800" id="deal_table">
        <el-table-column fixed prop="deal_name" label="交易名称" width="300">
        </el-table-column>
        <el-table-column prop="deal_time" label="交易时间" :formatter="timestampFormat" width="120">
        </el-table-column>
        <el-table-column prop="phone_number" label="账号" width="120">
        </el-table-column>
        <el-table-column prop="job_number" label="操作人工号" width="120">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="150">
        </el-table-column>
        <el-table-column prop="cost" label="花费" width="150">
        </el-table-column>
        <el-table-column prop="create_at" label="创建时间" :formatter="dateFormat" width="180">
        </el-table-column>
        <el-table-column prop="update_at" label="更新时间" :formatter="dateFormat" width="180">
        </el-table-column>
    </el-table>
</div>
</template>

<style>
#deal_table {
    position: relative;
    top: 50px;
}
</style>

<script>
import axios from 'axios'
import * as util from './common'

export default {
    methods: {
        dateFormat(row, column, cellValue, index) {
            const daterc = row[column.property]
            if (daterc != null) {
                const date = daterc.substring(0, 10)
                const time = daterc.substring(11, 19)
                return date + ' ' + time
            }
        },
        timestampFormat(row, column, cellValue, index) {
            const time = row[column.property]
            const unixTimestamp = new Date(time * 1000);
            const commonTime = unixTimestamp.toLocaleString()
            return commonTime
        },
    },
    data() {
        return {
            tableData: [],
            loading: true,
        }
    },
    created() {
        console.log(this)

        axios.get('http://62.234.149.71:8080/api/deal/list' + util.convertObjUrl(this.$route.query))
            .then((response) => {
                console.log(response);
                if (response.data.msg != 'success') {
                    this.$notify.error({
                        title: 'server response error',
                        message: response.data.data,
                    });
                } else {
                    this.tableData = response.data.data
                    this.loading = false
                }
            })
            .catch((error) => {
                console.log(error);
                this.$notify.error({
                    title: 'server response error',
                    message: response.data.data,
                });
            });
    },
    computed: {

    }
}
</script>
