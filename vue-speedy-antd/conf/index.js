const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const path = require('path')
const aLessOverride = require('../src/core/a-less-override')
const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = (option) => {
    if (option.adminName === 'index') {
        console.error("adminName can't be named 'index' !")
        process.exit(1)
    }
    const defaultOption = {
        baseUrl: '/',    // base url
        devServer: null,      // 开发代理服务器
        title: null,            // 站点名称
    };

    Object.assign(defaultOption, option);
    let config = {
        publicPath: defaultOption.baseUrl || '/',
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
    config.pages = {}
    if (defaultOption.index) {
        config.pages['index'] = {
            entry: defaultOption.index.entry,
            template: 'public/index.html',
            filename: `index.html`,
            title: defaultOption.index.title,
            chunks: ['chunk-vendors', 'chunk-common', `index`]
        }
    }
    if (defaultOption.admin) {
        config.pages[defaultOption.admin.name] = {
            entry: defaultOption.admin.entry,
            template: 'public/index.html',
            filename: `${defaultOption.admin.name}.html`,
            title: defaultOption.admin.title,
            chunks: ['chunk-vendors', 'chunk-common', `${defaultOption.admin.name}`]
        }
    }
    return config
}
