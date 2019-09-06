<template>
    <a-layout class="base-container">
        <a-layout-header v-if="!hideHeader">
            <div class="base-container-header-left">
                <a-breadcrumb>
                    <a-breadcrumb-item v-if="parentMenu">
                        <a-icon :type="parentMenu.icon" v-if="parentMenu.icon"/>
                        <span>{{parentMenu.name}}</span>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item v-if="currentMenu">
                        <a-icon :type="currentMenu.icon" v-if="currentMenu.icon"/>
                        <span>{{currentMenu.name}}</span>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </div>
            <div class="base-container-header-right">
                <slot name="headerRight"></slot>
            </div>
        </a-layout-header>
        <a-layout-content ref="contentRef">
            <slot></slot>
        </a-layout-content>
    </a-layout>
</template>

<script>
    import {Layout, Breadcrumb} from 'ant-design-vue'
    import './less/base-container.less'
    import {mapGetters} from "vuex";

    export default {
        name: "BaseContainer",
        components: {
            ALayout: Layout,
            ALayoutContent: Layout.Content,
            ALayoutHeader: Layout.Header,
            ABreadcrumb: Breadcrumb,
            ABreadcrumbItem: Breadcrumb.Item,
        },
        props: {
            hideHeader: Boolean
        },
        computed: {
            ...mapGetters('menu', {
                currentMenu: 'currentGet',
                parentMenu: 'parentGet'
            }),

        }
    }
</script>
<style>
</style>