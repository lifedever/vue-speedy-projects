const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const path = require('path')
const aLessOverride = require('../src/core/a-less-override')
const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = (option) => {
    const defaultOption = {
        baseUrl: '/',    // baseurl
        devServer: null,      // 开发代理服务器
        title: null,            // 站点名称
    };
    Object.assign(defaultOption, option);
    return {
        publicPath: defaultOption.baseUrl || '/',
        pages: {
            index: {
                // page 的入口
                entry: 'src/main.js',
                // 模板来源
                template: 'public/index.html',
                // 在 dist/index.html 的输出
                filename: 'index.html',
                // 当使用 title 选项时，
                // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
                title: defaultOption.title,
                // 在这个页面中包含的块，默认情况下会包含
                // 提取出来的通用 chunk 和 vendor chunk。
                chunks: ['chunk-vendors', 'chunk-common', 'index']
            }
        },
        // tweak internal webpack configuration.
        // see https://github.com/vue-cli/blob/dev/docs/webpack.md
        chainWebpack: config => {
            config.resolve.alias
                .set('@', resolve('../src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
                .set('_c', resolve('../src/components'))
                .set('_api', resolve('../src/api'))

        },
        configureWebpack: config => {
            if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'uat') {
                config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
                // gzip打包
                config.plugins.push(
                    new CompressionWebpackPlugin({
                        filename: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                        threshold: 10240,
                        minRatio: 0.8
                    })
                );
            }
        },
        // 打包时不生成.map文件
        productionSourceMap: false,
        css: {
            loaderOptions: {
                less: {
                    // 覆盖antd颜色
                    modifyVars: Object.assign({}, aLessOverride, defaultOption.lessModifyVars),
                    javascriptEnabled: true // 设置为true
                }
            },
        },
        devServer: defaultOption.devServer
    }
}
