module.exports = require('./conf')({
    title: 'Vue Speedy Ant Design',
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
