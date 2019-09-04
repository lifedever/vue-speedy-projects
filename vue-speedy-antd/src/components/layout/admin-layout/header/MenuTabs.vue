<template>
    <div class="menu-tab">
        <a-menu v-model="current"
                mode="horizontal" @select="menuSelect">
            <a-menu-item v-for="menu in menus" :key="menu.id">
                <menu-name :menu="menu" closable/>
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script>
    import {Menu} from 'ant-design-vue';
    import {mapActions, mapGetters} from "vuex";
    import MenuName from "../menu/MenuName";
    import MenuMixin from '../menu/menu.mixin'

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
            ...mapGetters('menu', {
                menus: 'menuTabsGet',
                currentMenu: 'currentGet'
            })
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>