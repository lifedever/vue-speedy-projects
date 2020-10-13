<template>
    <a-config-provider :locale="locale">
        <div id="app">
            <router-view></router-view>
            <s-modal></s-modal>
        </div>
    </a-config-provider>
</template>

<script>
    import SModal from "../components/global/s-modal/SModal";
    import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
    import {ConfigProvider} from 'ant-design-vue'

    export default {
        name: 'app',
        components: {
            SModal,
            [ConfigProvider.name]: ConfigProvider
        },
        data() {
            return {
                locale: zhCN,
            }
        }

    }
</script>

<style>

</style>
