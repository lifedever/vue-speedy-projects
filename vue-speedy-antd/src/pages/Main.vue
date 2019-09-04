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
        name: "Main",
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
                        id: 'example',
                        name: '示例',
                        icon: 'appstore',
                        children: [
                            {
                                id: 'exampleBase',
                                name: '基础示例',
                                url: '/example',
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