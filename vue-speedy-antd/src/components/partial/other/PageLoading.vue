<template>
    <div class="page-lading">
        <a-spin size="large" tip="加载中...">
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
            width: 42px;
            height: 42px;
            font-size: 64px;
            i {
                width: 18px;
                height: 18px;
            }
        }
    }
</style>