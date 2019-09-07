module.exports = require('vue-speedy-antd/conf')({
    lessModifyVars: {

    },
    title: 'Vue Speedy Ant Design',
    baseUrl: '/',
    devServer: {
        port: 6161,
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
