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
        <el-dropdown id="dropdown">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span style="color:#ffffff;">王小虎</span>
    </el-header>
    <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '3']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>导航一</template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>导航二</template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>导航三</template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                    </el-submenu>
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

.el-tabs__item{color:#ffffff;}

.el-dropdown{
    color:#ffffff;
}

#dropdown {
    position: absolute;
    left: 1470px;
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
            activeName: '/account'
        }
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
    },
    watch: {
        $route(to, from) {
            this.activeName = to.path
        }
    }
}
</script>
