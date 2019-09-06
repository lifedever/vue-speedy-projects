<template>
    <a-popover trigger="hover" placement="bottomRight">
        <template slot="content">
            <a-list
                    itemLayout="horizontal"
                    :dataSource="data"
            >
                <a-list-item slot="renderItem" slot-scope="item, index">
                    <a-list-item-meta
                            description="2019年9月14日 14:32"
                    >
                        <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
                        <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
        </template>
        <a-badge dot class="admin-top-notice">
            <a-icon type="bell" style="font-size: 20px;"/>
        </a-badge>
    </a-popover>
</template>

<script>
    const data = [
        {
            title: 'Vue Speedy By Ant Design Title 1',
        },
        {
            title: 'Vue Speedy By Ant Design Title 2',
        },
        {
            title: 'Vue Speedy By Ant Design Title 3',
        },
        {
            title: 'Vue Speedy By Ant Design Title 4',
        },
    ]
    import {Popover, Badge} from 'ant-design-vue'

    export default {
        name: "TopNotice",
        components: {
            APopover: Popover,
            ABadge: Badge
        },
        data(){
            return {
                data
            }
        }
    }
</script>

<style scoped>
    .admin-top-notice {
        margin-bottom: -5px;
        cursor: pointer;
    }
</style>