const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-react',
                        ['@babel/env', { targets: { browsers: ['last 2 versions'] } }]
                    ]
                }
            },
            {
                test: /\.s(a|c)ss$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
    ],
    resolve: {
        extensions: ['.js', '.scss']
    }
};
