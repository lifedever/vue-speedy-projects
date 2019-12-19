<template>
    <div id="app">
            <router-view></router-view>
        <s-modal></s-modal>
    </div>
</template>

<script>
    import SModal from "../components/global/s-modal/SModal";

    export default {
        name: 'app',
        components: {SModal},
        computed: {

        }
    }
</script>

<style>

</style>
