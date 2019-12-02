<template>
    <base-container :hide-header="hideHeader" :class="['tab-container', hideHeader? 'tab-container-hide-header': '']">
        <a-tabs v-model="current" :animated="false" @change="tabChange">
           <template>
               <slot></slot>
           </template>
        </a-tabs>
    </base-container>
</template>

<script>
    import {Tabs} from 'ant-design-vue'
    import './less/tab-container.less'
    export default {
        name: "TabContainer",
        components: {
            [Tabs.name]: Tabs
        },
        data(){
            return {
                current: null
            }
        },
        mounted() {
            this.current = this.$route.query._t || this.defaultTab
            this.routeTab()
        },
        props: {
            defaultTab: [String, Number],
            hideHeader: Boolean,
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
                this.routeTab()
            }
        }
    }
</script>

<style>
</style>