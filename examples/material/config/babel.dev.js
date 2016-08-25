module.exports = {
  // Don't try to find .babelrc because we want to force this configuration.
  babelrc: false,
  // This is a feature of `babel-loader` for webpack (not Babel itself).
  // It enables caching results in OS temporary directory for faster rebuilds.
  cacheDirectory: true,
  presets: [
    // let, const, destructuring, classes, modules
    require.resolve('babel-preset-es2015'),
    // exponentiation
    require.resolve('babel-preset-es2016'),
    // JSX, Flow
    require.resolve('babel-preset-react')
  ],
  plugins: [
    // function x(a, b, c,) { }
    require.resolve('babel-plugin-syntax-trailing-function-commas'),
    // class { handleClick = () => { } }
    require.resolve('babel-plugin-transform-class-properties'),
    // { ...todo, completed: true }
    require.resolve('babel-plugin-transform-object-rest-spread'),

    require.resolve('babel-plugin-transform-decorators-legacy'),

    // Polyfills the runtime needed for generators
    [require.resolve('babel-plugin-transform-runtime'), {
      helpers: false,
      polyfill: false,
      regenerator: true
    }]
  ]
};
