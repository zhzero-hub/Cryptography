// eslint-disable-next-line no-unused-vars
const path = require('path')
const fs = require('fs')

module.exports = {
    outputDir: 'dist',
    assetsDir: 'assets',
    lintOnSave: true,
    devServer: {
        host: '0.0.0.0',
        port: 7070,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://zhzero.top:7077/api',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        /*https: {
            key:  fs.readFileSync('/etc/nginx/conf.d/cert/4707946_zhzero.top.key'),
            cert: fs.readFileSync('/etc/nginx/conf.d/cert/4707946_zhzero.top.pem')
        }*/
    }
}