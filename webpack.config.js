/**
 * Created by chunyang.gao on 17/3/13.
 */
var path=require('path');
var webpack = require('webpack');
var ROOT_PATH=path.resolve(__dirname);
var DEV_PATH = path.resolve(ROOT_PATH, 'dev');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

//获取环境
var env=process.env.NODE_ENV;
// path.resolve(ROOT_PATH, 'index.js')
module.exports = {
    // entry:['./index.js'],
    entry:[path.resolve(ROOT_PATH, 'index.js')],
    output:{
        path: env === 'dev' ? DEV_PATH : BUILD_PATH,
        filename:'index.js',
        library: 'ra',
        libraryTarget:'var',
    },
    module: {  
      
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets: ['es2015'],
            }
        }],

    },
    plugins: [
    ],


    resolve: {
        extensions: ['.js', '.json', '.css','.sass', '.scss', '.less', 'jsx', '.vue'],
    },
}
