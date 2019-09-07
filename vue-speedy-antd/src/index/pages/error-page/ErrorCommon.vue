<template>
    <div class="error">
        <div class="error-container" :style="conStyle">
            <div class="error-code">{{code}}</div>
            <div class="error-description">
                {{description}}
            </div>
            <a-button type="primary" style="width: 100px;" @click="() => {$router.push('/')}">返回首页</a-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ErrorCommon",
        props: {
            code: String,
            description: String,
            conStyle: Object
        }
    }
</script>

<style scoped lang="less">
    .error {
        height: 100%;
        display: flex;
        justify-content: center;
        padding-right: 100px;
        align-items: center;
        .error-container {
            width: 800px;
            height: 350px;
            background-repeat: no-repeat;
            background-position: left center;
            padding-left: 500px;
            text-align: left;
            display: flex;
            flex-direction: column;
            padding-top: 50px;
            .error-code {
                font-size: 80px;
            }
            .error-description {
                font-size: 18px;
                padding-bottom: 20px;
            }
        }
    }
</style>