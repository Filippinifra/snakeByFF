module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            img: "./App/img",
            screen: "./App/screen",
            hooks: "./App/hooks",
            config: "./App/Config",
          },
        },
      ],
    ],
  };
};
