const CopyWebpackPlugin = require('copy-webpack-plugin')

const title = 'Minter Link'

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js'
        }
      ])
    ]
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(false)
  },
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.ts',
      title
    },
    tab: {
      template: 'public/browser-extension.html',
      entry: './src/tab/main.ts',
      title
    },
    notification: {
      template: 'public/browser-extension.html',
      entry: './src/notification/main.ts',
      title
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background/index.ts'
        },
        contentScripts: {
          entries: {
            'content-script': ['src/content-scripts/index.ts']
          }
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#000'
        },
        javascriptEnabled: true
      }
    }
  }
}
