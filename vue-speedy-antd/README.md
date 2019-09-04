# vue-speedy-antd
## Use
```bash
yarn add vue-speedy-antd@version
```
## vue.config.js
```javascript
module.exports = require('./conf')({
    lessModifyVars: {

    },
    title: '未设置站点标题',
    baseUrl: '/',
    devServer: {
        port: 6060,
        proxy: {
            '/api': {
                target: "http://yoyotrip.kanasinfo.com",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
})
```

## main.js 
```javascript
import Vue from "vue";
import Inject from 'vue-speedy-antd/conf/main-inject'
import pages from 'vue-speedy-antd/src/pages'
import adminLayout from "vue-speedy-antd/src/components/layout/admin-layout";

Vue.use(adminLayout)  // 使用 AdminLayout 构造网站
Vue.use(Inject, {
    config: {
    },
    menus: [
        {
            id: 'home',         // 唯一ID
            name: '首页',        // 显示的名称
            icon: 'home',       // 菜单图标
            url: '/home',       // 跳转地址
            fixed: true         // 不能删除
        },
        {
            id: 'example',
            name: '示例',
            icon: 'appstore',
            children: [
                {
                    id: 'exampleBase',
                    name: '基础示例',
                    url: '/example',
                }
            ]
        }
    ],
    pages: pages,       // 自定义路由
    modules: [          // Vuex
        {
            path: 'test',
            module: {
                namespaced: true,
                state: {
                    name: 'VueSpeedyAntD'
                },
                getters: {
                    nameGet: state => state.name
                }
            }
        }
    ]
})

```