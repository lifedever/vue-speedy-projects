<template>
    <div id="app">
        <a-locale-provider :locale="locale">
            <router-view></router-view>
            <s-modal></s-modal>
        </a-locale-provider>
    </div>
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
