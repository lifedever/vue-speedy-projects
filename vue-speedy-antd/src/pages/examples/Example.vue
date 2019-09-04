<template>
    <base-container>
        <div slot="headerRight">
            <a-button type="primary">添加按钮</a-button>
        </div>
        这是容器的内容
    </base-container>
</template>

<script>
    import BaseContainer from "../../components/container/BaseContainer";

    export default {
        name: "Example",
        components: {
            BaseContainer,
        }
    }
</script>

<style scoped>

</style>