<template>
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
                <a-collapse active-key="1" accordion>
                    <a-collapse-panel header="main.js" key="1">
                        <main-j-s/>
                    </a-collapse-panel>
                    <a-collapse-panel header="vue.config.js" key="2">
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
                    </a-collapse-panel>
                    <a-collapse-panel header="多页面Nginx配置" key="3">
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
                    </a-collapse-panel>
                </a-collapse>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {Collapse} from 'ant-design-vue'
    import MainJS from "./MainJS";

    export default {
        components: {
            MainJS,
            [Collapse.name]: Collapse,
            [Collapse.Panel.name]: Collapse.Panel
        },
        name: "Index",
        data() {
            return {}
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