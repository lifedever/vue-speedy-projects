<template functional>
    <a-sub-menu v-if="props.item[props.replaceFields['children']]"
                :key="props.item[props.replaceFields['key']]">
        <span slot="title">
            {{props.item[props.replaceFields['title']]}}
        </span>
        <template v-for="child in props.item.children">
            <a-menu-item v-if="!child.children" :key="child[props.replaceFields['key']]">
                <span>{{child[props.replaceFields['title']]}}</span>
            </a-menu-item>
            <s-dropdown-menu-item v-else :item="child" :replace-fields="props.replaceFields"></s-dropdown-menu-item>
        </template>
    </a-sub-menu>
</template>

<script>
    export default {
        name: "SDropdownMenuItem",
        props: {
            item: Object,
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