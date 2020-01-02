<template>
<div>
    <el-button type="primary" plain @click="createRoute" id="package_create_button">新建套餐</el-button>
    <router-view :vform="vobj"></router-view>
    <el-row v-if="this.$route.path=='/package'">
        <el-col :span="6" v-for="(obj, index) in tableData" :key="obj" :offset="index>0?1:1">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>{{obj.name}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="updateCard(obj)">调整</el-button>
                </div>
                <div class="text item">
                    {{'套餐类型：'+obj.type == 0 ? '基本套餐' : '附加套餐'}}
                </div>
                <div class="text item">
                    {{'每月资费：'+obj.monthly_cost}}
                </div>
                <div class="text item">
                    {{'每日资费：'+obj.daily_cost}}
                </div>
                <el-divider></el-divider>
                <div class="text item">
                    {{'描述：'+obj.desc2}}
                </div>
            </el-card>
            <br />
        </el-col>
    </el-row>
</div>
</template>

<style>
#package_create_button {
    position: relative;
    left: 1200px;
    top: 10px;
}

#package_cards {
    position: relative;
    top: 20px;
}

.item {
    margin-bottom: 18px;
}
</style>

<script>
import axios from 'axios'
import * as util from './common'

export default {
    methods: {
        createRoute() {
            this.$router.push({
                path: `/package/create?update=true`,
            })
        },
        updateCard(cardObj) {
            this.vobj = cardObj
            this.$router.push({
                path: "/package/create"
            })
        }
    },
    data() {
        return {
            tableData: [],
            vindex: 0,
            vobj:{}
        }
    },
    created() {
        this.$store.dispatch('setPackageListData')
    },
    watch: {
        '$store.state.packageListData': function (newV, oldV) {
            this.tableData = this.$store.state.packageListData
        }
    }
}
</script>
