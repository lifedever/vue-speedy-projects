<template>
    <admin-layout :menus="menus">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </admin-layout>
</template>

<script>
    import AdminLayout from "../components/layout/admin-layout";

    export default {
        name: "Main.vue",
        components: {AdminLayout},
        data() {
            return {
                menus: [
                    {
                        id: 'home',
                        name: '首页',
                        icon: 'home',
                        url: '/home'
                    },
                    {
                        id: 'setting',
                        name: '系统管理',
                        icon: 'setting',
                        children: [
                            {
                                id: 'setting-users',
                                name: '用户管理',
                                url: '/system/users'
                            }, {
                                id: 'setting-roles',
                                name: '角色管理',
                                url: '/system/roles'
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>