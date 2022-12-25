module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/Assets/fonts/'],
  dependencies: {
    'react-native-vector-icons':
    {
      platforms: {
        ios: null,
        android: null,
      },
    },
  }, // make sure this dependencies are all valid installed packages or empty if you don't need it
};
