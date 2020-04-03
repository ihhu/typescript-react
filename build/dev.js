const webpack = require("webpack");
const webpackMerge=require("webpack-merge");
const { PATHS, devServer } = require("./config.js");
function webpackConfig(env){
    const baseConf=require("./base");
    const devConf={
        mode:"development",
        output:{
            path:PATHS.output,
            chunkFilename:`${PATHS.out_js}[name].js`,
            filename:`${PATHS.out_js}[name].js`,
            // hotUpdateChunkFilename: '[hash].hot-update.js'
        },
        optimization:{
        },
        module:{
            rules:[
                {
                    test: /\.css$/,
                    use:[
                        {
                            loader:"style-loader"
                        },
                        {
                            loader:"css-loader",
                            options:{sourceMap:true}
                        },
                        {
                            loader:"postcss-loader",
                            options:{sourceMap:true}
                        }
                    ]
                }, 
                {
                    test: /\.scss$/,
                    use:[
                        {
                            loader:"style-loader"
                        },
                        {
                            loader:"css-loader",
                            options:{sourceMap:true}
                        },
                        {
                            loader:"postcss-loader",
                            options:{sourceMap:true}
                        },
                        {
                            loader:"sass-loader",
                            options:{
                                sourceMap:true,
                            }
                        },
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                sourceMap: true,
                                resources: `${PATHS.entry}Style/Scss/_mixin.scss` 
                            }
                        }
                    ]
                }, 
                {
                    test: /\.(eot|ttf|woff|woff2)\w*/,
                    use: [{
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: PATHS.out_font,
                        }
                    }]
                }
            ]
        },
        devtool:"cheap-module-eval-source-map",
        plugins:[
        ],
        devServer:{
            ...devServer
        },
        plugins:[
            // new webpack.HotModuleReplacementPlugin({
            //     multiStep: true,
            // }),
            new webpack.DefinePlugin({
                IS_DEV: JSON.stringify(true),
                IS_MOCK:env.mock
            })
        ]
    };
    return webpackMerge(baseConf,devConf)
}


module.exports= webpackConfig