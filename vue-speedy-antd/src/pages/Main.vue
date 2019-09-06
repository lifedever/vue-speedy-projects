<template>
    <admin-layout :menus="menus">
        <template v-slot:logo="{data}">
            <span v-if="data">
                {{config.shortTitle}}
            </span>
            <span v-else>
                <span v-if="holder">
                    {{holder.name}}
                </span>
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
                menus: 'menusGet',
                currentMenu: 'currentGet'
            }),
            ...mapGetters('app', {
                config: 'configGet'
            }),
            ...mapGetters('holder', {
                holder: 'currentGet'
            })
        }
    }
</script>

<style scoped>
    .view-with-frame iframe {
        position: absolute;
        border: none;
        left: 0px;
        right: 0px;
        top: 0;
        bottom: 0;
    }
</style>