<template>
    <div class="ul-container">
        <div class="ul-container-header" v-if="$slots['header'] && !hideHeader">
            <slot name="header"></slot>
        </div>
        <div class="ul-container-header" v-else-if="!hideHeader">
            <Breadcrumb class="pull-left">
                <BreadcrumbItem v-if="getTabTitle(item)"
                                v-for="(item, index) in breadcrumbItems"
                                :key="`getTabTitle(item)_${index}`">
                    <Icon v-if="item.meta && item.meta.icon" :type="item.meta.icon"></Icon>
                    {{getTabTitle(item)}}
                </BreadcrumbItem>
            </Breadcrumb>
            <div class="pull-right" v-if="$slots['headerRight']">
                <slot name="headerRight"></slot>
            </div>
        </div>

        <div class="ul-container-main"
             v-if="!hideMain"
             ref="containerMainRef">
            <slot :mainHeight="mainHeight"></slot>
        </div>
        <div class="ul-container-footer" v-if="$slots['footer']">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Container",
        data() {
            return {
                mainHeight: 0
            }
        },
        props: {
            hideHeader: {
                type: Boolean,
                default: false
            },
            hideMain: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            window.addEventListener('resize', this.getMainHeight)
        },
        computed: {
            breadcrumbItems() {
                return this.$route.matched
            }
        },
        updated() {
            this.getMainHeight();
        },
        methods: {
            getTabTitle(item) {
                return item.meta.title || (item.params ? item.params.tabTitle : '')
            },
            getMainHeight() {
                let dom = this.$refs['containerMainRef']
                this.mainHeight = dom ? dom.clientHeight - 12 * 2 : 0;
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.updateEmit)
        }
    }
</script>

<style scoped lang="less">

    @import "./container";
</style>
