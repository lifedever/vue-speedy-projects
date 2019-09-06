<template>
    <div class="admin-top-control">
        <top-notice></top-notice>
        <top-user></top-user>
    </div>
</template>

<script>

    import TopUser from "./TopUser";
    import TopNotice from "./TopNotice";
    export default {
        name: "TopControl",
        components: {TopNotice, TopUser}
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