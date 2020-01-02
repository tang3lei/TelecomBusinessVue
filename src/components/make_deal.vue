<template>
<div>
    <div>
        <h2>选择要充值的用户~</h2>
        <el-select value-key="phone_number" v-model="account" placeholder="请选择" @change="changeSelectAccount">
            <el-option v-for="item in $store.state.accountListData" :key="item.phone_number" :label="item.phone_number" :value="item">
            </el-option>
        </el-select>
        <el-card class="box-card">
            <span>当前用户：{{account.phone_number ? account.phone_number  : '暂无'}}</span>
            <div class="text item">用户名：{{account.user_name}}</div>
            <div class="text item">余额：{{account.balance}}</div>
            <div class="text item">套餐：{{account.package}}</div>
        </el-card>
        <el-divider></el-divider>
        <br />
    </div>
    <div>
        <h2>余额充值</h2>
        <el-row>
            <el-button type="primary" plain @click="dialogFormVisible = true">现金支付</el-button>
            <el-button plain @click="qrPay" disabled>扫码支付</el-button>
            <el-button plain disabled>银行转账</el-button>
            <el-dialog title="现金支付" :visible.sync="dialogFormVisible">
                <el-form :model="crashPayForm">
                    <el-form-item label="账号主体" :label-width="formLabelWidth">
                        <el-input v-model="account.phone_number" :disabled='true' autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="金额" :label-width="formLabelWidth">
                        <el-input v-model="crashPayForm.number" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="crashPaySubmit">确 定</el-button>
                </div>
            </el-dialog>
        </el-row>
        <el-divider></el-divider>
        <br />
    </div>
    <div>
        <h2>余额缴费</h2>
        <el-tabs type="border-card">
            <el-tab-pane label="流量充值">
                <el-form ref="form" :model="xform" label-width="80px">
                    <el-form-item label="流量规格">
                        <el-radio-group v-model="xform.liuliang">
                            <el-radio-button label="1g-30天-5元"></el-radio-button>
                            <el-radio-button label="5g-30天-20元"></el-radio-button>
                            <el-radio-button label="20g-30天-50元"></el-radio-button>
                            <el-radio-button label="100g-30天-100元"></el-radio-button>
                            <el-radio-button label="3g-7天-5元"></el-radio-button>
                            <el-radio-button label="10g-1天-5元"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="xonSubmit">购买</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="宽带缴费">
                <el-form ref="form" :model="yform" label-width="80px">
                    <el-form-item label="宽带规格">
                        <el-radio-group v-model="yform.kuandai">
                            <el-radio-button label="10Mbps-1年-245元"></el-radio-button>
                            <el-radio-button label="100Mbps-1年-450元"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="yonSubmit">购买</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="增值服务" disabled>
            </el-tab-pane>
        </el-tabs>

        <el-divider></el-divider>
        <br />
    </div>
</div>
</template>

<style>
.box-card {
    width: 300px;
    margin-top: 20px;
}

.item {
    margin-bottom: 18px;
}
</style>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            dialogFormVisible: false,
            account: {},
            crashPayForm: {
                number: 0
            },
            formLabelWidth: '120px',
            radio: '',
            xform: {},
            yform: {}
        }
    },
    methods: {
        changeSelectAccount(event, item) {
            console.log(event, item)
        },
        crashPaySubmit() {
            this.dialogFormVisible = false
            const url = 'http://62.234.149.71:8080/api/account/change_balance?phone_number=' + this.account.phone_number + "&add_number=" + this.crashPayForm.number
            axios.post(url)
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
                        this.account.balance = parseInt(this.account.balance)+parseInt(this.crashPayForm.number)
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
        qrPay() {

        },
        xonSubmit() {
            const url = 'http://62.234.149.71:8080/api/account/use_balance?phone_number=' + this.account.phone_number + "&liuliang=" + this.xform.liuliang
            axios.post(url)
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
                        const ls = this.xform.liuliang.split('-')
                        const num = parseInt(ls[2])
                        this.account.balance = parseInt(this.account.balance)-num
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
        yonSubmit() {
            const url = 'http://62.234.149.71:8080/api/account/use_balance?phone_number=' + this.account.phone_number + "&kuandai=" + this.yform.kuandai
            axios.post(url)
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
                        const ls = this.yform.kuandai.split('-')
                        const num = parseInt(ls[2])
                        this.account.balance = parseInt(this.account.balance)-num
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
    },
}
</script>
