import path from 'path'
import { Configuration, DefinePlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'

const webpackConfig = (): Configuration => ({
  entry: './src/index.tsx',
  // ...(process.env.production || !process.env.development
  //   ? {}
  //   : { devtool: 'eval-source-map' }),
  mode: 'development',

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        exclude: /build/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
      template: './public/index.html',
    }),
    // DefinePlugin allows you to create global constants which can be configured at compile time
    new DefinePlugin({
      'process.env': process.env.production || !process.env.development,
    }),
    new ForkTsCheckerWebpackPlugin({}),
  ],
})

export default webpackConfig

// import path from 'path'
// import {
//   Configuration as WebpackConfiguration,
//   HotModuleReplacementPlugin,
// } from 'webpack'
// import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
// import HtmlWebpackPlugin from 'html-webpack-plugin'
//
// interface Configuration extends WebpackConfiguration {
//   devServer?: WebpackDevServerConfiguration
// }
//
// const config: Configuration = {
//   mode: 'development',
//   output: {
//     publicPath: '/',
//   },
//   entry: './src/index.tsx',
//   module: {
//     rules: [
//       {
//         test: /\.(ts|js)x?$/i,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               '@babel/preset-env',
//               '@babel/preset-react',
//               '@babel/preset-typescript',
//             ],
//           },
//         },
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx', '.ts', '.tsx']
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'src/index.html',
//     }),
//     new HotModuleReplacementPlugin(),
//   ],
//   devtool: 'inline-source-map',
//   devServer: {
//     static: path.join(__dirname, 'build'),
//     historyApiFallback: true,
//     port: 4000,
//     open: true,
//     hot: true,
//   },
// }
//
// export default config
