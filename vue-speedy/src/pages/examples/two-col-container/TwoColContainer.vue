<template>
    <SplitContainer v-model="split">
        <div slot="headerRight">
            这是一句测试的话语
        </div>
        <div slot="left">
            这是左边啊
        </div>
        <div slot="right">
            这是右边啊
        </div>
    </SplitContainer>
</template>

<script>
    export default {
        name: "TwoColContainerExample",
        data(){
            return {
                split: '300px'
            }
        }
    }
</script>

<style scoped>

</style>
