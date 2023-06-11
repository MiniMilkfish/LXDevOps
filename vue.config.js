
module.exports = {
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = "上海龙象环保扬尘监测平台";
            return args;
        })
    }
}