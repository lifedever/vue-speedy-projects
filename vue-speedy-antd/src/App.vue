<template>
    <div id="app">
        <router-view></router-view>
        <s-modal></s-modal>
    </div>
</template>

<script>
    import SModal from "./components/global/SModal";
    export default {
        name: 'app',
        components: {SModal},
    }
</script>

<style>

</style>
