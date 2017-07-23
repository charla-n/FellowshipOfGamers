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

    //resolve: {
    //    extensions: ["", ".webpack.js", ".web.js", ".js", ".ts", ".tsx"]
    //},

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            { include: /\.json$/, loaders: ["json-loader"] }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
    //new webpack.DefinePlugin({
    //    'process.env': {
    //        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    //    },
    //}),
      new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor', 
          filename: './wwwroot/vendor.js'
      }),
      new webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          compress: true,
          comments: false,
      }),
      //new webpack.ProvidePlugin({
      //    $: "jquery",
      //    jQuery: "jquery",
      //    "window.jQuery": "jquery"
      //}),
      //new webpack.DefinePlugin({
      //    'process.env': {
      //        'NODE_ENV': JSON.stringify('production')
      //    }
      //})
    ],
}