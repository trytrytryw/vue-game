module.exports = {
  publicPath: '/luyi',
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = '升仙小游戏';
        return args;
      });
  }
};