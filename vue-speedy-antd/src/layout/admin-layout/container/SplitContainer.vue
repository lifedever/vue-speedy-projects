<template>
    <base-container class="split-container">
        <template v-slot:headerRight>
            <slot name="headerRight"></slot>
        </template>
        <split v-model="split" mode="horizontal">
            <div slot="left">
                <slot name="left" />
            </div>
            <div slot="right">
                <slot name="right" />
            </div>
        </split>
    </base-container>
</template>

<script>
    import {Layout, Breadcrumb} from 'ant-design-vue'
    import Split from "../../../components/partial/split/split";
    import './less/split-container.less'
    export default {
        name: "SplitContainer",
        components: {
            Split,
            ALayout: Layout,
            ALayoutContent: Layout.Content,
            ALayoutHeader: Layout.Header,
            ABreadcrumb: Breadcrumb,
            ABreadcrumbItem: Breadcrumb.Item,
        },
        data(){
            return {
                split: '300px'
            }
        }
    }
</script>

<style scoped>

</style>