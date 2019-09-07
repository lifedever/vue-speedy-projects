<template>
    <error-common code="403" description="抱歉，您无权访问该页面" :con-style="{
    backgroundImage: 'url('+backgroundImage+')',
    backgroundSize: '227px 269px',
    backgroundPosition: '100px center'
    }"></error-common>
</template>

<script>
    import ErrorCommon from "./ErrorCommon";
    import e403 from '../../../assets/imgs/403.png'

    export default {
        name: "Error403",
        components: {ErrorCommon},
        computed: {
            backgroundImage() {
                return e403
            }
        }
    }
</script>

<style scoped>
</style>