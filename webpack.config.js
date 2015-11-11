var webpack = require('webpack'),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    devtool: 'eval',
    entry: {
        index: './app/app.jsx'
    },
    output: {
        filename: './public/assets/bin/[name].js'
    },
    module: {
        loaders: [
            {
                test: /app(\/|\\).*\.(js||jsx)$/,
                loader: 'babel-loader?stage=0'
            }
        ]
    },
    plugins: [
        //new CommonsChunkPlugin('./public/common.js'),
        //new webpack.optimize.UglifyJsPlugin({})
    ]
};
