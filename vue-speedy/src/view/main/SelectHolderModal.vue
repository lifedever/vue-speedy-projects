<template>
    <div v-if="holdersGet">
        <a href="#" class="mar-left-sm mar-right-sm" v-for="holder in holdersGet" :key="holder.id" @click.prevent="selectHolder(holder)">{{holder.name}}</a>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {setLocalHolder} from "../../libs/util";

    export default {
        name: "SelectHolderModal",
        computed: {
            ...mapGetters([
                'holdersGet'
            ])
        },
        methods: {
            selectHolder(holder) {
                console.log('select', holder)
                this.$unmountModal()
                setLocalHolder(this.$route, holder)
                location.href = `/${holder.id}/home`
            }
        }
    }
</script>

<style scoped>

</style>
