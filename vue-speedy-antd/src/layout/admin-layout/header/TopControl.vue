<template>
    <div class="admin-top-control">
        <component v-if="config.top && config.top.rightControl" :is="config.top.rightControl"></component>
        <top-user></top-user>
    </div>
</template>

<script>

    import TopUser from "./TopUser";
    import TopNotice from "./TopNotice";
    import {mapGetters} from "vuex";

    export default {
        name: "TopControl",
        components: {TopNotice, TopUser},
        computed: {
            ...mapGetters('app', {
                config: 'configGet'
            })
        }
    }
</script>

<style scoped lang="less">
    .admin-top-control {
        height: 48px;
        line-height: 48px;
        padding: 0 20px;
        float: right;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>