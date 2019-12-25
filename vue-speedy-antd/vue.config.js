module.exports = require('./conf')({
    title: 'Vue Speedy Ant Design',
    lessModifyVars: {   // 用于覆盖主题配色，所有变量如下：https://github.com/vueComponent/ant-design-vue/blob/master/components/style/themes/default.less
        'primary-color': '#4b8af6',
        'error-color': '#ea4435',
        'success-color': '#29a262',
    },
    admin: {
        name: 'admin',
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
                target: process.env.VUE_APP_SERVER_URL,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
})
