<template>
    <error-common code="404" description="抱歉，您访问的页面不存在" :con-style="{
    backgroundImage: 'url('+backgroundImage+')',
    backgroundSize: '350px 276px'
    }"></error-common>
</template>

<script>
    import ErrorCommon from "./ErrorCommon";
    import e404 from '../../assets/imgs/404.png'

    export default {
        name: "Error404",
        components: {ErrorCommon},
        computed: {
            backgroundImage() {
                return e404
            }
        }
    }
</script>

<style scoped>
</style>