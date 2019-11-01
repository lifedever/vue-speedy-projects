<template>
    <page-layout :menus="config.menus" :current-menu="currentMenu" fixed-menu>
        <span slot="brand">我爱中国</span>
        <a-menu slot="topRight" theme="dark" mode="horizontal" :value="[]">
            <a-menu-item>
                <router-link to="login">
                    登录
                </router-link>
            </a-menu-item>
            <a-menu-item>
                <router-link to="login">
                    注册
                </router-link>
            </a-menu-item>
        </a-menu>
        <router-view></router-view>
    </page-layout>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Home",
        computed: {
            ...mapGetters('indexApp', {
                'config': 'configGet'
            }),
            currentMenu(){
                return [this.$route.name || '']
            }
        }
    }
</script>

<style scoped>

</style>