var path = require("path")

module.exports = {
    entry: {
        path: path.resolve(__dirname + "/static/scripts/home.js")
    },
    
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname + "/public")
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-react", "@babel/preset-env",]
            },
          }
        }
      ]
    },

    mode: 'development'
  };