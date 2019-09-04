<template>
    <admin-layout :menus="menus">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </admin-layout>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Main",
        data() {
            return {

            }
        },
        computed:{
            ...mapGetters('menu', {
                menus: 'menusGet'
            })
        }
    }
</script>

<style scoped>

</style>