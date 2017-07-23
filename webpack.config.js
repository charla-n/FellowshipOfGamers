var webpack = require('webpack');

module.exports = {
    entry: {
        vendor: [
            "react",
            "react-dom",
            "redux",
            "react-router",
            "react-redux",
            "redux-thunk",
            "react-widgets",
            "redux-form",
            "moment",
            "moment-timezone",
            "emojione",
            "js-cookie",
            "applicationinsights-js",
            "lodash",
            "immutability-helper",
            "cropperjs",
            "react-router-scroll",
            "react-overlays",
            "./Scripts/utils/canvas-to-blob.min.js",
            "./Scripts/utils/customBoostrap.js",
            "react-notification-system-redux",
            "react-notification-system",
            "react-toggle",
            "react-trend",
            "react-springy-parallax",
        ],
        app: "./Scripts/index.js"
    },
    output: {
        filename: "./wwwroot/bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "cheap-eval-source-map",

    module: {
        rules: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ],
        loaders: [
            { include: /\.json$/, loaders: ["json-loader"] }
        ]
    },

    plugins: [
        //new webpack.ProvidePlugin({
        //    $: "jquery",
        //    jQuery: "jquery",
        //    "window.jQuery": "jquery"
        //}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: './wwwroot/vendor.js'
        })
    ],

    stats: {
        warnings: false
    }
}