<template>
    <a-menu v-model="current"
            class="menu-tab"
            mode="horizontal" @select="menuSelect">
        <a-menu-item v-for="menu in tabs" :key="menu.url">
            <menu-name :menu="menu"/>
        </a-menu-item>
    </a-menu>
</template>

<script>
    import {Menu} from 'ant-design-vue';
    import {mapGetters} from "vuex";
    import MenuName from "./MenuName";
    import MenuMixin from './menu.mixin'

    export default {
        components: {
            MenuName,
            AMenu: Menu,
            AMenuItem: Menu.Item,
        },
        name: "MenuTabs",
        mixins: [MenuMixin],
        data() {
            return {
                current: null
            }
        },
        mounted() {
        },
        computed: {
            ...mapGetters('menuTab', {
                tabs: 'menuTabsGet',
                currentMenu: 'currentGet'
            })
        }
    }
</script>

<style scoped>

</style>