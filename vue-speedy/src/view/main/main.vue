<template>
    <Layout style="height: 100%" class="main">
        <Sider hide-trigger collapsible :width="220" :collapsed-width="64" v-model="collapsed">
            <side-menu accordion
                       :active-name="$route.name"
                       :collapsed="collapsed"
                       @on-select="turnToPage"
                       :menu-list="menuList">
                <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
                <div class="logo-con">
                    <a href="#" class="logo-title" v-if="!collapsed" @click.prevent="selectHolder">
                        <span v-if="currentHolder">{{currentHolder.name}}</span>
                    </a>
                    <div class="logo-title" v-else>{{$site.shortTitle}}</div>
                </div>
            </side-menu>
        </Sider>
        <Layout>
            <Header class="header-con" style="height: 48px; line-height: 0;">
                <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
                    <user :user-avator="userAvator"/>
<!--                    <language @on-lang-change="handleSetLocale" style="margin-right: 10px;" :lang="local"/>-->
<!--                    <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>-->
                    <div class="tag-nav-wrapper" slot="breadcrumb">
                        <tags-nav @toggleFullscreen="toggleFullscreen" :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
                    </div>
                </header-bar>
            </Header>
            <Content style="overflow-y: auto; height: 100%;" class="content-wrapper">
                <keep-alive :include="cacheList">
                    <error_403 class="error" v-if="forbiddenGet"></error_403>
                    <router-view v-else-if="!$route.meta.iframe"/>
                </keep-alive>
                <div class="view-with-frame"
                     v-if="iframes">
                    <iframe v-show="f.name === $route.name"
                            v-for="f in iframes"
                            frameborder="0"
                            width="100%"
                            height="100%"
                            style="height: 100%; width: 100%;"
                            :src="f.href"></iframe>
                </div>
            </Content>
        </Layout>
    </Layout>
</template>
<script>
    import _find from 'lodash/find'
    import SideMenu from './components/side-menu'
    import HeaderBar from './components/header-bar'
    import TagsNav from './components/tags-nav'
    import User from './components/user'
    import Fullscreen from './components/fullscreen'
    import Language from './components/language'
    import { mapActions, mapMutations, mapGetters } from 'vuex'
    import { getNewTagList } from '../../libs/util'
    import minLogo from '@/assets/images/logo-min.jpg'
    import maxLogo from '@/assets/images/logo.jpg'
    import './main.less'
    import Error_403 from '../error-page/403'
    import { getNextByPath, getNextByName } from '../../libs/util'

    export default {
        name: 'Main',
        components: {
            Error_403,
            SideMenu,
            HeaderBar,
            Language,
            TagsNav,
            Fullscreen,
            User
        },
        data () {
            return {
                collapsed: false,
                minLogo,
                maxLogo,
                isFullscreen: false,
                iframes: []
            }
        },
        computed: {
            ...mapGetters([
                'forbiddenGet',
                'holdersGet'
            ]),
            currentHolder() {
                return this.holdersGet? this.holdersGet.find(o => o.id === this.$route.params.holder): null
            },
            tagNavList () {
                return this.$store.state.app.tagNavList
            },
            tagRouter () {
                return this.$store.state.app.tagRouter
            },
            userAvator () {
                return this.$store.state.user.avatorImgPath
            },
            cacheList () {
                return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
            },
            menuList () {
                return this.$store.getters.menuList
            },
            local () {
                return this.$store.state.app.local
            }
        },
        methods: {
            ...mapMutations([
                'setBreadCrumb',
                'setTagNavList',
                'addTag',
                'setLocal'
            ]),
            ...mapActions([
                'handleLogin',
                'forbid'
            ]),
            selectHolder() {
                this.$mountModal({
                    title: '选择租户',
                    footerHide: true,
                    component: () => import('./SelectHolderModal')
                });
            },
            /**
             * 匹配当前是否为iframe，如果是iframe，则不走router，走缓存。
             */
            matchIframes () {
                if (this.$route.meta.iframe) {
                    let name = this.$route.name
                    let currentFrame = _find(this.iframes, { name: name })
                    if (this.$route.meta.iframe && !currentFrame) {
                        this.iframes.push({
                            href: this.$route.meta.iframe,
                            name: name
                        })
                    }
                }
            },
            turnToPage (item) {
                if (item.name.indexOf('isTurnByHref_') > -1) {
                    window.open(item.name.split('_')[1])
                    return
                }
                this.$router.push(item)
            },
            handleCollapsedChange (state) {
                this.collapsed = state
            },
            handleCloseTag (res, item, type) {
                let nextRoute
                if (item) {
                    if (item.meta && item.meta.matchByPath) {
                        nextRoute = getNextByPath(this.tagNavList, item.path)
                    } else {
                        nextRoute = getNextByName(this.tagNavList, item.name)
                    }
                }

                this.setTagNavList(res)

                if (type === 'all') {
                    this.turnToPage({
                        name: 'Home'
                    })
                    return
                }
                if (type === 'others') {
                    return
                }
                console.log('nextRoute', nextRoute)
                this.$router.push(nextRoute)
            },
            handleClick (item) {
                this.forbid(false)
                this.turnToPage(item)
            },
            handleSetLocale (locale) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '系统将刷新以改变当前的语言，确认继续吗？',
                    onOk: () => {
                        this.setLocal(locale)
                        this.$nextTick(() => {
                            location.reload()
                        })
                    }
                })
            },
            toggleFullscreen(full) {
                this.isFullscreen = full
            }
        },
        watch: {
            '$route' (newRoute) {
                console.log('main watch router', newRoute)
                if (!newRoute.meta || !newRoute.meta.ignoreTab) {
                    this.setBreadCrumb(newRoute.matched)
                    this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
                }
                this.matchIframes()
            }
        },
        mounted () {
            /**
             * @description 初始化设置面包屑导航和标签导航
             */
            this.setTagNavList()
            this.addTag(this.$store.state.app.homeRoute)
            this.setBreadCrumb(this.$route.matched)
            // 设置初始语言
            this.setLocal(this.$i18n.locale)
            this.matchIframes()
        }
    }
</script>
<style scoped lang="less">
    .view-with-frame iframe {
        position: absolute;
        border: none;
        left: 0px;
        right: 0px;
        top: 0;
        bottom: 0;
    }

</style>
