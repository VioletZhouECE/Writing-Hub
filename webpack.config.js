var path = require("path")

module.exports = {
    entry: {
        path: path.resolve(__dirname + "/frontend/static/scripts/home.js")
    },
    
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname + "/frontend/public")
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-react", "@babel/preset-env"],
                plugins: ["@babel/plugin-proposal-class-properties"]
            },
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
          loader: ['url-loader?limit=100000']
        }
      ]
    },

    mode: 'development'
  };