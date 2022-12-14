import {LinkingOptions} from '@react-navigation/native';
import Config from 'react-native-config';

enum Links {
  CreatePassword = 'kullanici/yeni-sifre/:token',
  Feed = 'feed',
  Favorites = 'favorites',
  Advertise = 'createAdvertise',
  Matches = 'matches',
  MyAccount = 'myAccount',
  PaymentResult = 'payment/result/:status/:code', // expected status => success or fail, expected code => expected fail code if status fails, otherwise expected transaction id
}

const prefixes: string[] = [Config.URL, Config.PREFIX_URL];
const nonsecureLinks: string[] = [Links.CreatePassword];

const clearNonSecureLink = (url: string) => {
  const index = url.indexOf('/:');
  if (index !== -1) {
    url = url.substring(0, index);
  }
  return url;
};

const clearLink = (url: string) => {
  const prefix = prefixes.find(_prefix => {
    return url.includes(_prefix);
  });

  if (prefix) {
    return url.substring(prefix.length);
  }
  return url;
};

const isNonSecureLink = (url: string): boolean => {
  url = clearLink(url);
  const isNonSecure = nonsecureLinks.find(nonSecureLink => {
    nonSecureLink = clearNonSecureLink(nonSecureLink);
    return url.includes(nonSecureLink);
  });
  return !!isNonSecure;
};

export const isSecureLink = (url: string) => {
  return !isNonSecureLink(url);
};

export const nonSecureDeepLinkMapper: LinkingOptions = {
  prefixes: prefixes,
  config: {
    screens: {
      AuthStack: {
        screens: {
          CreatePassword: Links.CreatePassword,
        },
      },
    },
  },
};
export const secureDeepLinkMapper: LinkingOptions = {
  prefixes: prefixes,
  config: {
    screens: {
      TabStack: {
        screens: {
          FeedStack: {
            screens: {
              Feed: Links.Feed,
            },
          },
          FavoritesStack: {
            screens: {
              Favorites: Links.Favorites,
            },
          },
          AdvertiseStack: {
            screens: {
              Advertise: Links.Advertise,
            },
          },
          MatchesStack: {
            screens: {
              Matches: Links.Matches,
            },
          },
          MyAccountStack: {
            screens: {
              MyAccount: Links.MyAccount,
            },
          },
        },
      },
      PaymentStack: {
        screens: {
          PaymentResult: Links.PaymentResult,
        },
      },
    },
  },
};
