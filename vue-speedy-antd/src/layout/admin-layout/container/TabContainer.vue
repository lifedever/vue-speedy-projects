<template>
    <base-container
        :hide-header="hideHeader"
        :class="['tab-container', hideHeader? 'tab-container-hide-header': '']"
    >
        <a-tabs v-model="current" :animated="false" @change="tabChange" :tabPosition="tabPosition">
            <template>
                <slot></slot>
            </template>

            <template slot="tabBarExtraContent">
                <slot name="tabBarExtraContent"></slot>
            </template>
        </a-tabs>
    </base-container>
</template>

<script>
import { Tabs } from 'ant-design-vue'
import './less/tab-container.less'
export default {
    name: "TabContainer",
    components: {
        [Tabs.name]: Tabs
    },
    data() {
        return {
            current: null,
            routeName: null
        }
    },
    mounted() {
        this.routeName = this.$route.name
        this.current = this.$route.query._t || this.defaultTab
        this.routeTab()
    },
    props: {
        defaultTab: [String, Number],
        hideHeader: Boolean,
        tabPosition: {
            type: String,
            default: 'top'
        }
    },
    watch: {
        '$route'(value) {
            if (value.name === this.routeName && this.$route.query._t) {
                this.current = this.$route.query._t
            }
        }
    },
    methods: {
        routeTab() {
            let query = Object.assign({}, this.$route.query)
            query._t = this.current
            this.$router.push({
                query
            })
        },
        tabChange() {
            console.log('tab container, tab change', this.routeName)
            this.routeTab()
        }
    }
}
</script>

<style>
</style>