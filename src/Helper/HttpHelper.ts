import _ from 'lodash';
// import {Channel, CustomHeaderFields} from '~/Api/Enums';
// import HTTPClient from '~/Api/HttpClient';
import { PlatformType } from '../Common/types/platform';
import { Language, LanguageCodes } from '../Utils/Enum';

export const cacheClear = async () => {
  // const cacheStore: any = await HTTPClient.instance.cache.store;
  // cacheStore.store &&
  //   _.each(cacheStore.store, (_value, key) => {
  //     HTTPClient.instance.cache.store.removeItem(key);
  //   });
};

export function getCustomHeader(
  platform: PlatformType,
  // channel: Channel,
  deviceModel?: string,
  deviceId?: string,
  osVersion?: string,
  language?: Language,
) {
  //TODO şuan için sessionId kullanılıp kullanılmayacağı kesindeğil.bu nedenle ilgili generate işlemi yorum'a alınmıştır.
  // const sessionId = React.useMemo(() => generateUUID(), []);
  return {
    [CustomHeaderFields.PLATFORM]: platform,
    // [CustomHeaderFields.CHANNEL]: channel,
    [CustomHeaderFields.LANGUAGE]: LanguageCodes[language],
    [CustomHeaderFields.DEVICE_ID]: deviceId ?? '',
    [CustomHeaderFields.OS_VERSION]: osVersion ?? '',
    [CustomHeaderFields.MODEL]: deviceModel ?? '',
  };
}
