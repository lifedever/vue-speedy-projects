<template>
    <a-dropdown v-bind="config" v-on="$listeners">
        <slot></slot>
        <a-menu slot="overlay" @click="handleClick">
            <template v-for="item in data">
                <a-menu-item v-if="!item[replaceFields['children']]"
                             :key="item[replaceFields['key']]">
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
        },
        data() {
            return {
                parallelData: []
            }
        },
        mounted() {
            this.toParallelData(this.data)
        },
        methods: {
            toParallelData(data) {
                data.forEach(o => {
                    let item = Object.assign({}, {}, o)
                    this.parallelData.push(item)
                    delete item[this.replaceFields.children]
                    let children = o[this.replaceFields.children]
                    if (children && children.length > 0) {
                        this.toParallelData(children)
                    }
                })
            },

            handleClick({key, keyPath}) {
                let arr = []
                let title = ''
                let item = this.parallelData.find(o => o[this.replaceFields.key] === key)
                keyPath.reverse().forEach(id => {
                    let it = this.parallelData.find(o => o[this.replaceFields.key] === id)
                    arr.push(
                        it
                    )
                    title += it[this.replaceFields.title] + '-'
                })
                title = title.substr(0, title.length - 1)

                let obj = {
                    item,
                    title,
                    paths: arr
                }
                this.$emit('select', obj)
            }
        }
    }
</script>

<style scoped>

</style>