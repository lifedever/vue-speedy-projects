<template>
    <base-container class="split-container">
        <template v-slot:headerRight>
            <slot name="headerRight"></slot>
        </template>
        <split v-model="split" mode="horizontal">
            <div slot="left" class="height100">
                <slot name="left" />
            </div>
            <div slot="right" class="height100">
                <slot name="right" />
            </div>
        </split>

        <div slot="footer" v-if="$slots['footer']">
            <slot name="footer"></slot>
        </div>
    </base-container>
</template>

<script>
    import './less/split-container.less'
    import {Layout, Breadcrumb} from 'ant-design-vue'
    import Split from "../../../components/partial/split/split";

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
                split: 0.5
            }
        }
    }
</script>

<style scoped>

</style>