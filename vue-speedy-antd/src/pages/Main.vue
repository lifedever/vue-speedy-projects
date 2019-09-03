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
                        url: '/home',
                        fixed: true         // 不能删除
                    },
                    {
                        id: 'setting',
                        name: '系统管理',
                        icon: 'setting',
                        children: [
                            {
                                id: 'setting-users',
                                name: '用户管理',
                                url: '/home'
                            }, {
                                id: 'setting-roles',
                                name: '角色管理',
                                url: '/home'
                            }
                        ]
                    },
                    {
                        id: 'setting2',
                        name: '系统管理',
                        icon: 'setting',
                        children: [
                            {
                                id: 'setting-users2',
                                name: '用户管理',
                                url: '/home'
                            }, {
                                id: 'setting-roles2',
                                name: '角色管理',
                                url: '/home'
                            }
                        ]
                    },
                    {
                        id: 'setting3',
                        name: '系统管理',
                        icon: 'setting',
                        children: [
                            {
                                id: 'setting-users3',
                                name: '用户管理',
                                url: '/home'
                            }, {
                                id: 'setting-roles3',
                                name: '角色管理',
                                url: '/home'
                            }
                        ]
                    },
                    {
                        id: 'setting4',
                        name: '系统管理',
                        icon: 'setting',
                        children: [
                            {
                                id: 'setting-users4',
                                name: '用户管理',
                                url: '/home'
                            }, {
                                id: 'setting-roles4',
                                name: '角色管理',
                                url: '/home'
                            }
                        ]
                    },
                    {
                        id: 'setting5',
                        name: '系统管理',
                        icon: 'setting',
                        children: [
                            {
                                id: 'setting-users5',
                                name: '用户管理',
                                url: '/home'
                            }, {
                                id: 'setting-roles5',
                                name: '角色管理',
                                url: '/home'
                            }
                        ]
                    },
                    {
                        id: 'setting6',
                        name: '系统管理',
                        icon: 'setting',
                        children: [
                            {
                                id: 'setting-users6',
                                name: '用户管理',
                                url: '/home'
                            }, {
                                id: 'setting-roles6',
                                name: '角色管理',
                                url: '/home'
                            }
                        ]
                    },
                    {
                        id: 'setting7',
                        name: '系统管理',
                        icon: 'setting',
                        children: [
                            {
                                id: 'setting-users7',
                                name: '用户管理',
                                url: '/home'
                            }, {
                                id: 'setting-roles7',
                                name: '角色管理',
                                url: '/home'
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