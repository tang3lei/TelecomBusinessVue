import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui';

import router from './router'
import App from './components/App.vue'

import axios from 'axios'
import echarts from 'echarts'


import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueCookies)
Vue.prototype.$echarts = echarts


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

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        console.log("a", localStorage.getItem("xl_ck"))
        if (localStorage.getItem("xl_ck") != null) {
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next();
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")