<template>
    <div class="admin-top-control">
        <top-user></top-user>
    </div>
</template>

<script>

    import TopUser from "./TopUser";
    export default {
        name: "TopControl",
        components: {TopUser}
    }
</script>

<style scoped lang="less">
    .admin-top-control {
        height: 48px;
        line-height: 48px;
        padding: 0 20px;
        float: right;
    }
</style>