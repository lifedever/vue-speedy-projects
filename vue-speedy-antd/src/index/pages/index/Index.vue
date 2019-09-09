<template>
    <page-layout>
        <div class="home">
            <a-row>
                <a-col :span="16" :offset="4" v-if="userInfo" class="margin-bottom-lg">
                    <h3>
                        登录用户信息如下：
                        <router-link to="/logout">退出</router-link>
                    </h3>
                    <div>{{userInfo}}</div>
                </a-col>
                <a-col :span="16" :offset="4">
                   <h3>
                       这是首页，需要自己实现功能，参考配置如下：
                   </h3>
                    <h1>
                        main.js:
                    </h1>
                    <pre>
import Vue from "vue";
import Inject from '../../conf/index-main-inject'

Vue.use(Inject, {
    config: {
        title: '业务前台页面',
    },
    pages: [
        {
            name: 'Index',
            path: '/',
            meta: {
                anonymous: true
            },
            component: () => import('./pages/index/Index')
        }
    ],
    modules: []
})
        </pre>
                    <h1>vue.config.js</h1>
                    <pre>
module.exports = require('./conf')({
    title: 'Vue Speedy Ant Design',
    admin: {
        name: 'boss',
        entry: 'src/admin/main.js',
        title: 'Boss 后台管理'
    },
    index: {
        entry: 'src/index/main.js',
        title: '业务前台'
    },
    devServer: {
        port: 6060,
        proxy: {
            '/api': {
                target: "http://localhost:18080",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
})

                </pre>
                </a-col>
            </a-row>
        </div>
    </page-layout>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Index",
        computed: {
            ...mapGetters('indexUser', {
                'userInfo': 'userInfoGet'
            })
        }
    }
</script>

<style scoped>
    .home {
        padding: 60px;
    }
</style>