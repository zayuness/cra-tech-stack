const emotionPresetOptions = {
  "autoLabel": "dev-only"
};

const CracoAlias = require("craco-alias");

const emotionBabelPreset = require("@emotion/babel-preset-css-prop").default(
  undefined,
  emotionPresetOptions,
);

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
  babel: {
    plugins: [
      ...emotionBabelPreset.plugins,
    ],
  },
};