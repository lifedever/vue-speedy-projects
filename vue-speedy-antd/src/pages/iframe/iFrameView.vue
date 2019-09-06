<template>
    <div class="view-with-frame">
        <iframe frameborder="0"
                width="100%"
                height="100%"
                style="height: 100%; width: 100%;"
                :src="$route.query.url"></iframe>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "iFrameView",
        computed: {
            ...mapGetters('menu', {
                menus: 'menusGet',
                currentMenu: 'currentGet'
            }),
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