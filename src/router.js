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

const routes = [{
        path: '/account',
        component: Account,
        children: [
            { path: 'create', component: AccountCreate },
        ]
    },
    {
        path: '/make_deal',
        component: MakeDeal
    },
    {
        path: '/package',
        component: Package,
        children: [
            { path: 'create', component: PackageCreate }
        ]
    },
    {
        path: '/deal',
        component: Deal,
        children: [
            { path: 'create', component: DealCreate }
        ]
    },
    {
        path: '/employee',
        component: Employee,
        children: [
            { path: 'create', component: EmployeeCreate }
        ]
    }
]

export default new Router({
    routes
})