const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = defaultConfig;

const config = {
    resolver: {
        extraNodeModules: {
            '@screens': path.resolve(__dirname, 'src/screens'),
            '@theme': path.resolve(__dirname, 'src/theme'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@navigations': path.resolve(__dirname, 'src/navigations'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        },
    },
};

module.exports = mergeConfig(defaultConfig, config);


