module.exports = {
    entry: './src/index.js',
    output: {
        path: './src/index.js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};