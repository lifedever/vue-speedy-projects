module.exports = require('./conf')({
    title: 'Vue Speedy Ant Design',
    baseAdminUrl: '/boss',
    baseUrl: '/',
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
