<template>
    <error-common code="500" description="抱歉，服务器出错了" :con-style="{
    backgroundImage: 'url('+backgroundImage+')',
    backgroundSize: '422px 193px'
    }"></error-common>
</template>

<script>
    import ErrorCommon from "./ErrorCommon";
    import e500 from '../../assets/imgs/500.png'

    export default {
        name: "Error500",
        components: {ErrorCommon},
        computed: {
            backgroundImage() {
                return e500
            }
        }
    }
</script>

<style scoped>
</style>