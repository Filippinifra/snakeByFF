module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            img: "./src/img",
            screen: "./src/screen",
            hooks: "./src/hooks",
            config: "./src/config",
            components: "./src/components",
          },
        },
      ],
    ],
  };
};
