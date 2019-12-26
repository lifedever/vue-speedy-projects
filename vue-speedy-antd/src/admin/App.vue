<template>
    <a-locale-provider :locale="locale">
        <div id="app">
            <router-view></router-view>
            <s-modal></s-modal>
        </div>
    </a-locale-provider>
</template>

<script>
    import SModal from "../components/global/s-modal/SModal";
    import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

    export default {
        name: 'app',
        components: {SModal},
        computed: {},
        data() {
            return {
                locale: zhCN,
            }
        }
    }
</script>

<style>

</style>
