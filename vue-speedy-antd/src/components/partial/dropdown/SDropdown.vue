<template>
    <a-dropdown v-bind="config" v-on="$listeners">
        <slot></slot>
        <a-menu slot="overlay">
            <template v-for="item in data">
                <a-menu-item v-if="!item[replaceFields['children']]" :key="item[replaceFields['key']]">
                    <span>{{item[replaceFields['title']]}}</span>
                </a-menu-item>
                <s-dropdown-menu-item v-else :item="item" :key="item[replaceFields['key']]" />
            </template>
        </a-menu>
    </a-dropdown>
</template>

<script>
    import SDropdownMenuItem from "./SDropdownMenuItem";
    export default {
        name: "SDropdown",
        components: {SDropdownMenuItem},
        props: {
            data: Array,
            config: Object,
            replaceFields: {
                type: Object,
                default() {
                    return {children: 'children', title: 'title', key: 'id'}
                }
            }
        }
    }
</script>

<style scoped>

</style>