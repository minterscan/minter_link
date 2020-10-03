module.exports = {
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs'
      ]
    }
  },
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining'
  ]
}
