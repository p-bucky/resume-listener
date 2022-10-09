module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@assets': './src/assets',
          '@shared': './src/view/shared',
          '@screens': './src/view/screens',
        },
      },
    ],
    'jest-hoist',
    'react-native-reanimated/plugin',
  ],
};
