<template>
    <div class="view-with-frame">
        <iframe
            frameborder="0"
            ref="frameRef"
            width="100%"
            height="100%"
            style="height: 100%; width: 100%;"
            :src="menu.url"
        ></iframe>
        <page-loading v-if="loading"></page-loading>
        <div class="frame-refresh-btn">
            <a-button type="primary" @click="reloadIframe" shape="circle" icon="reload"></a-button>
        </div>
    </div>
</template>

<script>
import PageLoading from "../../partial/other/PageLoading";
export default {
    name: "iFrameView",
    components: { PageLoading },
    mounted() {},
    data() {
        return {
            loading: false
        };
    },
    props: {
        menu: Object
    },
    computed: {},
    methods: {
        reloadIframe() {
            this.loading = true;
            let iframe = this.$refs["frameRef"];
            let url = this.menu.url;
            iframe.src = "";
            setTimeout(() => {
                this.loading = false;
            }, 500);
            setTimeout(() => {
                iframe.src = url;
            }, 300);
        }
    }
};
</script>

<style scoped lang="less">
.view-with-frame {
    height: 100%;

    iframe {
        position: absolute;
        border: none;
        left: 0px;
        right: 0px;
        top: 0;
        bottom: 0;
    }

    .frame-refresh-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
    }
}
</style>