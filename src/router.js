import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Account from './components/account';
import AccountCreate from './components/account_create';

import Package from './components/package'
import PackageCreate from './components/package_create'

import Deal from './components/deal'
import DealCreate from './components/deal_create'

import Employee from './components/employee'
import EmployeeCreate from './components/employee_create'

import MakeDeal from './components/make_deal'

import MonthDeals from './components/month_deals'
import DailyDeals from './components/daily_deals'

import DataEcharts from './components/data_echarts'

const routes = [{
        path: '/account',
        component: Account,
        meta: { requireAuth: true },
        children: [
            { path: 'create', component: AccountCreate },
        ]
    },
    {
        path: '/make_deal',
        component: MakeDeal,
        meta: { requireAuth: true }
    },
    {
        path: '/package',
        component: Package,
        children: [
            { path: 'create', component: PackageCreate }
        ],
        meta: { requireAuth: true }
    },
    {
        path: '/deal',
        component: Deal,
        children: [
            { path: 'create', component: DealCreate }
        ],
        meta: { requireAuth: true }
    },
    {
        path: '/employee',
        component: Employee,
        children: [
            { path: 'create', component: EmployeeCreate }
        ],
        meta: { requireAuth: true }
    },
    {
        path: '/month',
        component: MonthDeals,
        meta: { requireAuth: true }
    },
    {
        path: '/daily',
        component: DailyDeals,
        meta: { requireAuth: true }
    },
    {
        path: '/echarts',
        component: DataEcharts,
        meta: { requireAuth: true }
    }
]

export default new Router({
    routes
})