<template>
    <div>
        这是内容啊
        <p>
            {{content}}
        </p>
    </div>
</template>

<script>
    export default {
        name: "HelloModal",
        props: ['content']
    }
</script>

<style scoped>

</style>