<template>
    <div class="tags-nav">
        <div class="close-con">
            <Dropdown transfer trigger="click" @on-click="handleTagsOption">
                <Button size="small" type="text">
                    <Icon :size="18" type="ios-close-circle-outline"/>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="close-all">关闭所有</DropdownItem>
                    <DropdownItem name="close-others">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div class="btn-con left-btn">
            <Button type="text" @click="handleScroll(240)">
                <Icon :size="18" type="ios-arrow-back"/>
            </Button>
        </div>
        <div class="btn-con right-btn">
            <Button type="text" @click="handleScroll(-240)">
                <Icon :size="18" type="ios-arrow-forward"/>
            </Button>
        </div>
        <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
            <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
                <!--顶部Tag列表-->
                <ul class="tags-nav-menu">
                    <li v-for="item in list"
                        ref="tagsPageOpened"
                        :class="item.name === value.name? 'active': ''"
                        :key="`tag-nav-${item.path}`">
                        <a href="#" @click.prevent="handleClick(item)">
                            <Icon v-if="item.meta && item.meta.icon" :type="item.meta.icon"></Icon>
                            {{ showTitleInside(item) }}
                            <Icon type="md-close-circle"
                                  size="16"
                                  v-if="!item.meta || !item.meta.notClose"
                                  class="icon-close"
                                  @click.prevent.stop="handleClose($event, item)"/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {showTitle} from '@/libs/util'

    export default {
        name: 'TagsNav',
        props: {
            value: Object,
            list: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                tagBodyLeft: 0
            }
        },
        watch: {},
        methods: {
            handlescroll(e) {
                let type = e.type
                let delta = 0
                if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                    delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
                }
                this.handleScroll(delta)
            },
            handleScroll(offset) {
                if (offset > 0) {
                    this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
                } else {
                    if (this.$refs.scrollOuter.offsetWidth < this.$refs.scrollBody.offsetWidth) {
                        if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollOuter.offsetWidth)) {
                            this.tagBodyLeft = this.tagBodyLeft
                        } else {
                            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, this.$refs.scrollOuter.offsetWidth - this.$refs.scrollBody.offsetWidth)
                        }
                    } else {
                        this.tagBodyLeft = 0
                    }
                }
            },
            handleTagsOption(type) {
                if (type === 'close-all') {
                    // 关闭所有，除了home
                    let res = this.list.filter(item => item.meta.notClose)
                    this.$emit('on-close', res, null, 'all')
                } else {
                    // 关闭除当前页和home页的其他页
                    console.log(this.value.name)
                    let res = this.list.filter(item => item.name === this.value.name || item.name === 'Home')
                    this.$emit('on-close', res, this.$route, 'others')
                }
            },
            handleClose(e, route) {
                let res = this.list.filter(item => {
                    if (route.meta.matchByPath) {
                        return item.path !== route.path
                    } else {
                        return item.name !== route.name
                    }

                })
                this.$emit('on-close', res, route)
            },
            handleClick(item) {
                console.log('item click', item);
                this.$emit('input', item)
            },
            showTitleInside(item) {
                return showTitle(item, this)
            }
        }
    }
</script>

<style lang="less">
    @import './tags-nav.less';
</style>
