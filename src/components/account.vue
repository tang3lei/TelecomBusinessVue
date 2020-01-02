<template>
<div>
    <el-button type="primary" plain @click="createRoute" id="account_create_button">新建账户</el-button>
    <router-view :vform="tableData" :vindex="vindex"></router-view>
    <el-table v-if="this.$route.path=='/account'" :data="tableData" v-loading="loading" stripe highlight-current-row style="width: 100%" max-height="800" id="account_table">
        <el-table-column fixed prop="phone_number" label="手机号" width="150">
        </el-table-column>
        <el-table-column prop="user_name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="balance" label="余额" width="120">
        </el-table-column>
        <el-table-column prop="package" label="套餐" width="150">
        </el-table-column>
        <el-table-column prop="create_at" label="创建时间" :formatter="dateFormat" width="180">
        </el-table-column>
        <el-table-column prop="update_at" label="更新时间" :formatter="dateFormat" width="180">
        </el-table-column>
        <el-table-column prop="desc2" label="描述" width="400">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="350">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <el-button size="mini" type='primary' @click="handleView(scope.$index, scope.row)">查看记录</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<style>
#account_create_button {
    position: relative;
    left: 1200px;
    top: 10px;
}

#account_table {
    position: relative;
    top: 50px;
}
</style>

<script>
import axios from 'axios'
import * as util from './common'

export default {
    methods: {
        createRoute() {
            this.$router.push({
                path: `/account/create?update=true`,

            })
        },
        handleEdit(index, row) {
            this.vindex = index
            this.$router.push({
                path: "/account/create"
            })
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const id = row.id
                axios.post('http://62.234.149.71:8080/api/account/delete?id=' + id)
                    .then((response) => {
                        console.log(response);
                        if (response.data.msg != 'success') {
                            this.$notify.error({
                                title: 'server response error',
                                message: response.data.data,
                            });
                        } else {
                            this.tableData.splice(index, 1)
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$notify.error({
                            title: 'server response error',
                            message: response.data.data,
                        });
                    });
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleView(index, row) {
            const query = util.convertObjUrl(row)
            this.$router.push({
                path: "/deal" + query
            })
        },
        dateFormat(row, column, cellValue, index) {
            const daterc = row[column.property]
            if (daterc != null) {
                const date = daterc.substring(0, 10)
                const time = daterc.substring(11, 19)
                return date + ' ' + time
            }
        }
    },
    data() {
        return {
            tableData: [],
            loading: true,
            vindex: 0,
        }
    },
    created() {
        this.$store.dispatch('setAccountListData')
        this.loading = false
    },
    watch: {
        '$store.state.accountListData': function (newV, oldV) {
            this.tableData = this.$store.state.accountListData
        }
    }
}
</script>
