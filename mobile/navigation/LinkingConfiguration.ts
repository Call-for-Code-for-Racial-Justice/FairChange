import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          home: {
            screens: {
              home: 'one',
            },
          },
          profile: {
            screens: {
              profile: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
