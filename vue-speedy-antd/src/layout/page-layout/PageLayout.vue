<template>
    <div :class="['page-layout', fixedMenu? 'page-layout-fixed-menu': '']">
        <top-menus v-if="menus && menus.length > 0"
                   :theme="theme" :menus="menus" v-model="currentMenu">
            <div slot="brand">
                <slot name="brand"></slot>
            </div>
            <slot name="topRight"></slot>
        </top-menus>
        <div class="page-layout-wrapper container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import './less/page-layout.less'
    import TopMenus from "@/layout/page-layout/menu/TopMenus";
    export default {
        name: "PageLayout",
        components: {
            TopMenus,
        },
        mounted() {
            this.loadUserInfo().then(res => {
            }).catch(err => {
                console.warn('openUser not login!')
            })
            console.log('currentMenus', this.currentMenu)
        },
        props: {
            menus: Array,
            currentMenu: Array,
            theme: {
                type: String,
                default: 'dark'
            },
            fixedMenu: Boolean,
        },
        methods: {
            ...mapActions('indexUser', {
                loadUserInfo: 'loadUserInfoAction'
            })
        }
    }
</script>

<style scoped>

</style>