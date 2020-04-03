# webpack-template

����`webpack4+ babel7+`���ǰ�˴�����û���

--- 


## ��������

```javascript
npm install 
npm run dev
npm run build
```

---

## `webpack`�ٷ���ַ
[Ӣ��](https://webpack.js.org/) `https://webpack.js.org`

[����](https://webpack.docschina.org/) `https://webpack.docschina.org`

---
## ���㿪ʼ����`webapck`�������

### ���ô��Ŀ�������
- ����`.browserslistrc`�ļ�
- �༭`.browserslistrc`�ļ�

```
last 2 versions
> 2%
```

### `.js`�ļ��������

- ��װ`@babel/core @babel/preset-ent @babel-transfrom-runtime @babel-loader core-js @babel/runtime @babel/plugin-proposal-class-properties`������
```
npm i -D @babel/core @babel/preset-ent @babel-transfrom-runtime @babel-loader core-js @babel/plugin-proposal-class-properties
npm i -S @babel/runtime
```

- ����`.babelrc`���༭`.babelrc`�ļ�
```
{
    "presets":[
        ["@babel/preset-env",{
            "useBuiltIns":"usage",
            "corejs":3
        }],
    ],
    "plugins":[
        "@babel/plugin-proposal-class-properties",
        ["@babel/plugin-transform-runtime",{
            "corejs":false
        }]
    ]
}
```

- `build/base.js`�ļ� ���`js`�������
```
    module:{
        rules:[
            //other rules
            //...

            {
                test:/\.js$/,
                exclude:[/node_modules/],
                loader:"babel-loader"
            }
        ]
    },
```

### `.css|.scss`�ļ��������

- ��װ`css-loader style-loader postcss-loader cssnano node-sass sass-loader autoprefixer css-url-relative-plugin mini-css-extract-plugin`������
```
npm i -D css-loader style-loader postcss-loader cssnano node-sass sass-loader autoprefixer css-url-relative-plugin mini-css-extract-plugin
```
`node-sass`��װ���ɹ�ʱ ���� `.npmrc`�ļ����༭
```
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
registry=https://registry.npm.taobao.org
```
Ȼ�����°�װ`node-sass sass-loader`
```
npm i -D node-sass sass-loader
```

- ����`postcss.config.js`���༭`postcss.config.js`�ļ�
```
module.exports={
    plugins:{
        "autoprefixer":{},
        "cssnano":{}
    }
}
```

- `build/dev.js`�ļ� ��ӿ������� `.css|.scss`�ļ��������
```
    module:{
        rules:[
            //other rules
            //...

            {
                test: /\.css|scss$/,
                use:[
                    {
                        loader:"style-loader",
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:"css-loader",
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:"postcss-loader",
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:"sass-loader",
                        options:{
                            sourceMap:true
                        }
                    }
                ]
            },
        ]
    },
```

- `build/prod.js`�ļ� ����������� `css|scss`�������
```
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CssUrlRelativePlugin = require('css-url-relative-plugin');
```
```
    module:{
        rules:[
            //other rules
            //...

            {
                test:/\.css|scss$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                        }
                    },
                    "css-loader","postcss-loader","sass-loader"
                ]
            }, 
        ]
    },
    plugins:[
        //other plugins
        //...

        //fix css url() relative 
        new CssUrlRelativePlugin({
            root:"./"
        }),
        new MiniCssExtractPlugin({
            filename:`${OUTPUT_PATH_CSS}[name].[hash:5].css`,
            chunkFilename:`${OUTPUT_PATH_CSS}[name].[hash:5].css`
        })
    ]
```

### ͼƬ�������ļ��������
- ��װ`file-loader url-loader`������
```
npm i -D file-loader url-loader
```
- �޸�`build/dev.js`�ļ� ��ӿ�������ͼƬ�������ļ�����
```
    module:{
        rules:[
            //other rules
            //...

            {
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: OUTPUT_PATH_FONT,
                    }
                }]
            }, 
            {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        limit: 8192,
                        outputPath: OUTPUT_PATH_IMAGE,
                    }
                }]
            }
        ]
    },
```
- �޸�`build/prod.js`�ļ� �����������ͼƬ�������ļ�����
```
    module:{
        rules:[
            //other rules
            //...

            {
                test: /\.(eot|ttf|woff|woff2)\w*/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash:5].[ext]",
                        outputPath: OUTPUT_PATH_FONT,
                    }
                }]
            }, 
            {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name].[hash:5].[ext]",
                        limit: 8192,
                        outputPath: OUTPUT_PATH_IMAGE,
                    }
                }]
            }
        ]
    },
```# webpack-react
webpack-react
