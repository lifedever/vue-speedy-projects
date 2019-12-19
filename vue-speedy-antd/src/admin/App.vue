<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <s-modal></s-modal>
    </div>
</template>

<script>
    import SModal from "../components/global/s-modal/SModal";
    export default {
        name: 'app',
        components: {SModal},
    }
</script>

<style>

</style>
