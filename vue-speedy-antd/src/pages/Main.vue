<template>
    <admin-layout :menus="menus">
        <template v-slot:logo="{data}">
            <span v-if="data">
                {{config.shortTitle}}
            </span>
            <span v-else>
                {{config.title}}
            </span>
        </template>
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
            }),
            ...mapGetters('app', {
                config: 'configGet'
            })
        }
    }
</script>

<style scoped>

</style>