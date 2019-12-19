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
            <router-view v-if="!iframeShow" :key="key"></router-view>
        </keep-alive>
        <i-frame-view v-if="iFrames && iFrames.length > 0"
                      :key="item.id"
                      v-show="iframeShow && currentMenu.id === item.id"
                      v-for="item in iFrames"
                      :menu="item">
        </i-frame-view>
    </admin-layout>
</template>

<script>
    import {mapGetters} from "vuex";
    import IFrameView from "../../components/global/iframe";

    export default {
        name: "Main",
        components: {IFrameView},
        data() {
            return {

            }
        },
        computed:{
            ...mapGetters('menu', {
                menus: 'menusGet',
                currentMenu: 'currentGet',
                iFrames: 'iFrameTabsGet'
            }),
            ...mapGetters('app', {
                config: 'configGet'
            }),
            ...mapGetters('holder', {
                holder: 'currentGet'
            }),
            iframeShow() {
                return this.currentMenu && this.currentMenu.iframe
            },
            key() {
                return this.$route.fullPath
            }
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