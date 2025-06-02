module.exports = {
  presets: ['module:@react-native/babel-preset'],
   plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          "@src": "./src/",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@hooks": "./src/hooks",
        },
      }
    ],
  ],
};
