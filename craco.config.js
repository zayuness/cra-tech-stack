const emotionPresetOptions = {};

const emotionBabelPreset = require("@emotion/babel-preset-css-prop").default(
  undefined,
  emotionPresetOptions,
);

module.exports = {
  plugins: [
  ],
  babel: {
    plugins: [
      ...emotionBabelPreset.plugins,
    ],
  },
};