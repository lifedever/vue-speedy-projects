<template>
    <page-layout :menus="menus" :current-menu="['home']" fixed-menu>
        <a-menu slot="topRight" theme="dark" mode="horizontal" :value="[]">
            <a-menu-item>
                <router-link to="login">
                    登录
                </router-link>
            </a-menu-item>
            <a-menu-item>
                <router-link to="login">
                    注册
                </router-link>
            </a-menu-item>
        </a-menu>
        <div class="home">
            <a-row>
                <a-col :span="24" v-if="userInfo" class="margin-bottom-lg">
                    <h3>
                        登录用户信息如下：
                        <router-link to="/logout">退出</router-link>
                    </h3>
                    <div>{{userInfo}}</div>
                </a-col>
                <a-col :span="24">
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
                    <h1>
                        多页面Nginx配置
                    </h1>
                    <pre>
server {
    listen       80;
    server_name  localhost;
    #charset koi8-r;
    #access_log  /var/log/nginx/log/host.access.log  main;
    gzip  on;
    gzip_types text/plain application/x-javascript application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    location / {
        root   /usr/share/nginx/html;
        # rewrite ^.+(?<!js|css|png|jpg|jpeg|map|woff|ttf|svg|ico)$ /index.html break;
        try_files $uri $uri/ @router;
        index  index.html index.htm;
    }

    location @router {
        rewrite ^.*$ /index.html last;
    }

    location /admin {
        root   /usr/share/nginx/html;
        try_files $uri $uri/ @router_admin;
        index  admin.html admin.htm;
    }

    location @router_admin {
        rewrite ^.*$ /admin.html last;
    }
    error_page  404              /404.html;
    location = /404.html {
        root   /usr/share/nginx/html;
    }
    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
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
        data() {
            return {
                menus: [
                    {
                        id: 'home',
                        name: '首页',
                        url: '/'
                    },
                    {
                        id: 'menu1',
                        name: '文章列表',
                    },
                    {
                        id: 'menu2',
                        name: '用户列表'
                    },
                    {
                        id: 'admin',
                        name: '后台登录',
                        url: '/admin'
                    }
                ]
            }
        },
        computed: {
            ...mapGetters('indexUser', {
                'userInfo': 'userInfoGet'
            })
        }
    }
</script>

<style scoped>
    .home {
    }
</style>