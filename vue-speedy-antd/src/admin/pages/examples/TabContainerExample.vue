<template>
    <tab-container default-tab="2" hide-header>
        <a-tab-pane tab="Tab 1" key="1">Content of Tab Pane 1</a-tab-pane>
        <a-tab-pane tab="Tab 2" key="2" forceRender>
            <p>Content of Tab Pane 2</p>
            <p style="height: 300px; background: #444;">Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
        </a-tab-pane>
        <a-tab-pane tab="Tab 3" key="3">Content of Tab Pane 3</a-tab-pane>
    </tab-container>
</template>

<script>
    import TabContainer from "../../../layout/admin-layout/container/TabContainer";
    import {Tabs} from 'ant-design-vue'

    export default {
        name: "TabContainerExample",
        components: {
            TabContainer,
            [Tabs.TabPane.name]: Tabs.TabPane
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>