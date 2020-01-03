<template>
<div id="back">
    <div id="d1"></div>
    <div id="d2"></div>
    <el-card class="card-content">
        <h2>请登录。</h2>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="name">
                <el-input type="input" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="btn">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-divider id='divider'></el-divider>
</div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        return {
            ruleForm: {
                password: '',
                name: ''
            },
            rules: {
                password: [{
                    validator: validatePass,
                    trigger: 'blur',
                }],
                name: [{
                    required: true,
                    message: '账户号不能为空',
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post('http://62.234.149.71:8080/api/employee/login', this.ruleForm, {
                            withCredentials: true
                        })
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
                                const ck = response.headers.xl_ck
                                localStorage.setItem("xl_ck", ck)
                                localStorage.setItem('xl_e_name', response.headers.xl_e_name)
                                const redirect = this.$route.query.redirect
                                if (redirect != null) {
                                    this.$router.push({
                                        path: redirect
                                    })
                                } else {
                                    this.$router.push({
                                        path: "/account"
                                    })
                                }
                                this.$emit('login_update', false)
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            this.$notify.error({
                                title: 'server response error',
                                message: response.data.data,
                            });
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>
.card-content {
    width: 30%;
    height: 50%;
    position: absolute;
    left: 35vw;
    top: 25vh;
    transform: translate3d(-50%, -50%);
}

#divider {
    position: absolute;
    top: 90vh;
}

#d1 {
    width: 100vw;
    height: 5vh;
    background-color: #444444;
    margin: 0;
}
#d2 {
    width: 100vw;
    height: 5vh;
    background-color: #333333;
    margin: 0;
}
</style>
