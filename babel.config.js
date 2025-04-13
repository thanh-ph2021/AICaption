module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@store': './src/store',
          '@hooks': './src/hooks',
          '@components': './src/components',
          '@constants': './src/constants',
          '@navigations': './src/navigations',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@apis': './src/apis',
        },
      },
    ],
    "react-native-reanimated/plugin"
  ],
};
