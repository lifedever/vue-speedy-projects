<template>
    <div>
        <div v-for="holder in holders" class="holder-list flex-space-between">
            <span class="text-bold">
                {{holder.name}}
            </span>
            <span>
                <a-button size="small" type="primary" @click="selectHolder(holder)">进入</a-button>
            </span>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "HolderSelect",
        props: {
            holders: Array,
            selected: Function
        },
        methods: {
            selectHolder(holder) {
                this.$closeModal()
                this.selected(holder)
            }
        }
    }
</script>

<style scoped lang="less">
    .holder-list {
        border: 1px solid rgba(178, 220, 255, 0.9);
        padding: 10px 15px;
        border-radius: 3px;
        background-color: rgba(178, 220, 255, 0.5);
    }
</style>