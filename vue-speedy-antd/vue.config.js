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
