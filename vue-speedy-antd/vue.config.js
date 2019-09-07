module.exports = require('./conf')({
    title: 'Vue Speedy Ant Design',
    adminName: 'admin',     // 不能配置为 index
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
