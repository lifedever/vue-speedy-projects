<template>
    <div class="page-lading">
        <a-spin size="large" tip="Loading...">
        </a-spin>
    </div>
</template>

<script>
    export default {
        name: "PageLoading"
    }
</script>

<style lang="less">
    .page-lading {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #f0f2f5;

        .ant-spin-lg .ant-spin-dot {
            width: 48px;
            height: 48px;
            font-size: 64px;
            i {
                width: 20px;
                height: 20px;
            }
        }
    }
</style>