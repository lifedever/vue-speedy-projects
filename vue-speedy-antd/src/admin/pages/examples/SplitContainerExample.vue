<template>
    <split-container>
        <template v-slot:headerRight>
            <a-button type="primary">添加按钮</a-button>
        </template>
        <template v-slot:left>
            左边的内容
        </template>
        <template v-slot:right>
            右边的内容
        </template>
    </split-container>
</template>

<script>
    export default {
        name: "SplitContainerExample",
    }
</script>

<style scoped>

</style>