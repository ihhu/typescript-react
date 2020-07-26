const webpack = require('webpack');
const HtmlWebpackPlugin=require("html-webpack-plugin");

const { PATHS, resolves,pages,commonCssLink } = require("./config.js")

// 多页面入口
function getEntrys(pages){
    let defaultHtmlOptions ={
        minify:{
            "collapseWhitespace":true,  // 折叠空白区域
            "collapseInlineTagWhitespace":true,
            "conservativeCollapse":true,
            "removeRedundantAttributes":true, // 删除多余的属性
            "removeAttributeQuotes": true, // 移除属性的引号
            "removeComments": true, // 移除注释
            "collapseBooleanAttributes": true // 省略只有boolean 值的属性值 例如：readonly checked
        },
        favicon:`${PATHS.entry}favicon.ico`,
        commonCssLink:[...commonCssLink]
    };
    let entrys = {};
    let HTMLPlugins = [];
    for (let key in pages){
        let page = pages[key];
        if(typeof page === "string"){
            let entry = page;
            let template = `${PATHS.views}${key}.html`;
            let filename = `${key}.html`;
            let title = `${key} Page`
            page = {
                entry,template,filename,title
            };
        }
        if(!page.chunks){
            page.chunks=['vendors',key]
        }
        entrys[key] = page.entry;
        let options = {
            title:page.title,
            template:page.template,
            filename:page.filename,
            chunks:page.chunks,
            commonCssLink:defaultHtmlOptions.commonCssLink,
            favicon:defaultHtmlOptions.favicon,
            minify:defaultHtmlOptions.minify,
            
        }
        HTMLPlugins.push(new HtmlWebpackPlugin(options))
    }
    return {entrys,HTMLPlugins}
}

const {entrys,HTMLPlugins} = getEntrys(pages);

const baseConf={
    entry:{
        ...entrys
    },
    optimization: {
        splitChunks: {
            maxInitialRequests:Infinity,
            automaticNameDelimiter: '.',
            cacheGroups:{
                common: {  //公共模块 
                    name: "common",
                    chunks: "initial",  //入口处开始提取代码
                    minSize:0,      //代码最小多大，进行抽离
                    minChunks:3,    //代码复 2 次以上的抽离
                    priority:0
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: -10
                }
            }
        }
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:[/node_modules/],
                use:[
                    {
                        loader:"babel-loader",
                        options:{
                            sourceMaps:process.env.NODE_ENV !== 'production',
                        }
                    },
                    {
                        loader:"linaria/loader",
                        options:{
                            "sourceMap":process.env.NODE_ENV !== 'production',
                        }
                    }
                ]
            },
            {
                test:/\.html$/,
                use:[
                    {
                        loader:"html-loader",
                        options:{
                            minimize:true
                        }
                    }
                ]
            }, 
            {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        name(path){
                            if(/^.*Images(\\|\/)/g.test(path)){
                                let _path= path.replace(/^.*Images(\\|\/)/g,"").replace(/\..*$/g,"").replace(/\\/g,"/")
                                return `${_path}.[ext]`
                            }else{
                                let _path= path.replace(/^.*(\\|\/)/g,"").replace(/\..*$/g,"").replace(/\\/g,"/")
                                return `${_path}.[ext]`
                            }
                        },
                        limit: 8192,
                        outputPath: PATHS.out_images,
                        esModule: false
                    }
                }]
            }
        ]
    },
    resolve:{
        ...resolves
    },
    plugins:[
        ...HTMLPlugins,
        new webpack.HashedModuleIdsPlugin(),     //hash id 缓存
        new webpack.DefinePlugin({
            env: JSON.stringify(process.env)
        })
    ]
}

module.exports=baseConf;