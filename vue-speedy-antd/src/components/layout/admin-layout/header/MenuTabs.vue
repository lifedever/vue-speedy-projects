<template>
    <a-menu v-model="current"
            class="menu-tab"
            mode="horizontal" @select="menuSelect">
        <a-menu-item v-for="menu in menus" :key="menu.id">
            <a href="#" v-if="!menu.fixed" class="menu-tab-close" @click.prevent.stop="removeTab(menu)">
                <a-icon type="close-circle" theme="filled"/>
            </a>
            <menu-name :menu="menu"/>
        </a-menu-item>
    </a-menu>
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
            ...mapActions('menu', {
                removeTab: 'removeTabAction'
            })
        }
    }
</script>

<style scoped>

</style>