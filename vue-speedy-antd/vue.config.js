module.exports = require('./conf')({
    lessModifyVars: {

    },
    title: 'Vue Speedy Ant Design',
    baseUrl: '/',
    devServer: {
        port: 6060,
        proxy: {
            '/api': {
                // target: "http://localhost:18080",
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
