<template>
    <a-menu v-model="current"
            class="menu-tab"
            mode="horizontal">
        <a-menu-item v-for="menu in tabs">
            <menu-name :menu="menu" />
        </a-menu-item>
    </a-menu>
</template>

<script>
    import {Menu} from 'ant-design-vue';
    import {mapGetters} from "vuex";
    import MenuName from "./MenuName";

    export default {
        components: {
            MenuName,
            AMenu: Menu,
            AMenuItem: Menu.Item,
        },
        name: "MenuTabs",
        data() {
            return {
                current: null
            }
        },
        computed: {
            ...mapGetters('menuTab', {
                tabs: 'menuTabsGet'
            })
        }
    }
</script>

<style scoped>

</style>