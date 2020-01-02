import Vue from 'vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router'
import router from './router'
import Vuex from 'vuex'


import 'element-ui/lib/theme-chalk/index.css'
import App from './components/App.vue'

import axios from 'axios'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        accountNeedReload: false,
        accountListData: [],
        packageListData: [],
    },
    mutations: {
        setAccountNeedReload(state, is) {
            state.accountNeedReload = is
        },
        setAccountListData(state, dataList) {
            state.accountListData = dataList
        },
        setPackageListData(state, dataList) {
            state.packageListData = dataList
        }
    },
    actions: {
        setAccountListData(context) {
            console.log("vuex set account data")
            let resData = []
            axios.post('http://62.234.149.71:8080/api/account/list')
                .then((response) => {
                    if (response.data.msg != 'success') {} else {
                        resData = response.data.data
                        context.commit('setAccountListData', resData)
                        console.log(this.state.accountListData)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        setPackageListData(context) {
            console.log("vuex set package data")
            let resData = []
            axios.post('http://62.234.149.71:8080/api/package/list')
                .then((response) => {
                    if (response.data.msg != 'success') {} else {
                        resData = response.data.data
                        context.commit('setPackageListData', resData)
                        console.log(this.state.packageListData)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
})



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")