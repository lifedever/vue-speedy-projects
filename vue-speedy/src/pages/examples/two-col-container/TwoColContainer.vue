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
            <Button type="primary" @click="closeTab">关闭当前标签</Button>
            <div style="height: 20000px;">
                dsfsdfds
            </div>
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
        },
        methods: {
            closeTab(){
                this.$closeTag()
            }
        }
    }
</script>

<style scoped>

</style>
