<template>
<div>
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <el-form ref="form" :model="form" label-width="80px" id="pacakge_create_form" v-bind:vform="vobj" >
        <el-form-item label="套餐名" required>
            <el-input v-model="form.name" :disabled="$route.query.update != 'true'"></el-input>
        </el-form-item>
        <el-form-item label="类型" required>
            <el-input v-model.number="form.type" :disabled="$route.query.update != 'true'"></el-input>
        </el-form-item>
        <el-form-item label="每月资费" required>
            <el-input v-model.number="form.monthly_cost"></el-input>
        </el-form-item>
        <el-form-item label="每天资费">
            <el-input v-model.number="form.daily_cost" ></el-input>
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
#pacakge_create_form {
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
                name: '',
                type: 0,
                monthly_cost: 0,
                daily_cost: 0,
                desc2: '',
                id: 0,
            }
        }
    },
    created() {
        console.log(this.vform)
        const vobj = this.vform
        if (vobj != null && this.$route.query.update != 'true') {
            this.form.name = vobj.name
            this.form.monthly_cost = vobj.monthly_cost
            this.form.daily_cost = vobj.daily_cost
            this.form.type = vobj.type
            this.form.desc2 = vobj.desc2
            this.form.id = vobj.id
        }
    },
    methods: {
        goBack() {
            this.$router.push({
                path: '/package'
            });
        },
        onSubmit() {
            axios.post('http://62.234.149.71:8080/api/package/update', this.form)
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
                        this.$store.dispatch('setPackageListData')
                        this.$router.push({
                            path: '/package'
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
