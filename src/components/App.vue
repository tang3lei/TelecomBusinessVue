<template>
<div>
    <Login v-if='needLogin' @login_update='login_update'>login</Login>
    <Tie v-else @tie_update='tie_update' />
</div>
</template>

<script>
import Tie from './tie'
import Login from './login'

export default {
    name: 'app',
    components: {
        Tie,
        Login
    },
    methods: {
        tie_update(need) {
            this.needLogin = need
        },
        login_update(need) {
            this.needLogin = need

        }
    },
    data() {
        return {
            needLogin: true
        }
    },
    created() {
        if (localStorage.getItem("xl_ck") != null) {
            this.needLogin = false
        } else {
            this.needLogin = true
        }
    }
}
</script>
<style>
body{
    margin:0;
}
</style>
