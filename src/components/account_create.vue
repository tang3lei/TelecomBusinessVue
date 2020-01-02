<template>
<div>
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <el-form ref="form" :model="form" label-width="80px" id="account_create_form" v-bind:vform="tableData" :vindex="vindex">
        <el-form-item label="手机号" required>
            <el-input v-model="form.phone_number"></el-input>
        </el-form-item>
        <el-form-item label="姓名" required>
            <el-input v-model="form.user_name"></el-input>
        </el-form-item>
        <el-form-item label="余额" required>
            <el-input v-model="form.balance"></el-input>
        </el-form-item>
        <el-form-item label="账号停用">
            <el-switch v-model="form.status" :on-value='1' :off-value='0'></el-switch>
        </el-form-item>
        <el-form-item label="套餐选项">
            <el-select v-model="form.package" placeholder="请选择套餐">
                <el-option  v-for="item in $store.state.packageListData" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="用户描述">
            <el-input type="textarea" v-model="form.desc2"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="goBack">取消</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<style>
#account_create_form {
    position: relative;
    left: 30px;
    top: 50px;
}
</style>

<script>
import axios from 'axios'

export default {
    props: ['vform', 'vindex'],
    data() {
        return {
            form: {
                phone_number: '',
                user_name: '',
                balance: 0,
                status: 0,
                package: '',
                desc2: '',
                id: 0,
            }
        }
    },
    created() {
        const vobj = this.vform[this.vindex]
        if (vobj != null && this.$route.query.update != 'true') {
            this.form.phone_number = vobj.phone_number
            this.form.user_name = vobj.user_name
            this.form.balance = vobj.balance
            this.form.status = vobj.status
            this.form.package = vobj.package
            this.form.desc2 = vobj.desc2
            this.form.id = vobj.id
        }
    },
    methods: {
        goBack() {
            this.$router.push({
                path: '/account'
            });
        },
        onSubmit() {
            if (this.form.status = false) {
                this.form.status = 0
            } else {
                this.form.status = 1
            }
            this.form.balance = parseFloat(this.form.balance)
            axios.post('http://62.234.149.71:8080/api/account/update', this.form)
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
                        this.$store.dispatch('setAccountListData')
                        this.$router.push({
                            path: '/account'
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.$notify.error({
                        title: 'server response error',
                        message: response.data.data,
                    });
                });
        }
    }
}
</script>
