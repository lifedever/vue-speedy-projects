<template>
    <div class="view-with-frame">
        <iframe frameborder="0"
                ref="iframe"
                width="100%"
                height="100%"
                style="height: 100%; width: 100%;"
                :src="menu.url"></iframe>
    </div>
</template>

<script>
    export default {
        name: "iFrameView",
        mounted() {

        },
        data() {
            return {
            }
        },
        props: {
            menu: Object
        },
        computed: {
        }
    }
</script>

<style scoped>
    .view-with-frame iframe {
        position: absolute;
        border: none;
        left: 0px;
        right: 0px;
        top: 0;
        bottom: 0;
    }
</style>