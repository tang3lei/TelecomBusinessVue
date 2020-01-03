<template>
<el-container style="height: 500px; border: 1px solid #eee">
    <el-header style="text-align: right; font-size: 12px ;margin-right: 15px">
        <el-tabs v-model="activeName" @tab-click="handleClick" id="top_tabs">
            <el-tab-pane label="账户管理" name="/account"><span slot="label"><i class="el-icon-user-solid"></i> 账户管理</span>
            </el-tab-pane>
            <el-tab-pane label="缴费充值" name="/make_deal"><span slot="label"><i class="el-icon-s-check"></i> 缴费充值</span>
            </el-tab-pane>
            <el-tab-pane label="套餐管理" name="/package"><span slot="label"><i class="el-icon-s-goods"></i> 套餐管理</span>
            </el-tab-pane>
            <el-tab-pane label="交易记录" name="/deal"><span slot="label"><i class="el-icon-s-operation"></i> 交易记录</span>
            </el-tab-pane>
        </el-tabs>
        <span style="color:#ffffff;">
            <el-dropdown id="dropdown" @command="handleCommand">
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="exit">登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            {{eName}}
        </span>
    </el-header>
    <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '3']" @select="handleSelect">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>数据统计</template>
                    <el-menu-item index="1-1">月级收费统计</el-menu-item>
                    <el-menu-item index="1-2">天级营业数据</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>数据可视化</template>
                    <el-menu-item index="2-1">用户消费</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>快捷导航</template>
                    <el-menu-item index="3-1">新建账户</el-menu-item>
                    <el-menu-item index="3-2">新建套餐</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view />
        </el-main>
    </el-container>
</el-container>
</template>

<style>
.el-header {
    background-color: #303133;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}

.el-tabs__item {
    color: #ffffff;
}

.el-dropdown {
    color: #ffffff;
}

#top_tabs {
    position: absolute;
    left: 1000px;
}
</style>

<script>
export default {
    name: "tie",
    data() {
        return {
            activeName: '/account',
            eName: '',
        }
    },
    created() {
        this.eName = localStorage.getItem("xl_e_name")
    },
    methods: {
        handleClick(tab, event) {
            switch (tab.index) {
                case "0":
                    this.$router.push({
                        path: "/account"
                    })
                    break
                case "1":
                    this.$router.push({
                        path: "/make_deal"
                    })
                    break
                case "2":
                    this.$router.push({
                        path: "/package"
                    })
                    break
                case "3":
                    this.$router.push({
                        path: "/deal"
                    })
                    break
            }
        },
        handleCommand(command) {
            localStorage.removeItem('xl_ck')
            this.$emit('tie_update', true)

        },
        handleSelect(key, keyPath) {
            console.log(keyPath[1])
            switch (keyPath[1]) {
                case "1-1":
                    this.$router.push({
                        path: "/month"
                    })
                    break
                case "1-2":
                    this.$router.push({
                        path: "/daily"
                    })
                    break
                case "2-1":
                    this.$router.push({
                        path: "/echarts"
                    })
                    break
                case "3-1":
                    this.$router.push({
                        path: "/account/create"
                    })
                    break
                case "3-2":
                    this.$router.push({
                        path: "/package/create"
                    })
                    break
            }
        }
    },
    watch: {
        $route(to, from) {
            this.activeName = to.path
        }
    }
}
</script>
