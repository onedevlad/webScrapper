import path from 'path'
import dotenv from 'dotenv'
import nodeExternals from 'webpack-node-externals'

dotenv.config()

const rootPath = path.join(__dirname, '../')
const appRootPath = path.join(rootPath, '../')
const srcPath = path.join(rootPath, 'src')

const withAppRoot = folder => path.resolve(appRootPath, folder)
const withSrc = folder => path.resolve(srcPath, folder)


export default {
  mode: process.env.NODE_ENV,
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: ['babel-polyfill', path.join(srcPath, 'server.js')],
  output: {
    path: path.resolve(rootPath, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /.js$/,
      exclude: [
        path.resolve(rootPath, 'node_modules'),
      ],
      loader: 'babel-loader',
    }],
  },
  resolve: {
    alias: {
      shared: withAppRoot('shared'),

      src: withSrc(''),
      Db: withSrc('db'),
      controllers: withSrc('controllers'),
      models: withSrc('models'),
      utils: withSrc('utils'),
    },
  },
  externals: [nodeExternals()],
}
