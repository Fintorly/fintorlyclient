import {PlatformType} from './platform';

export type Constants = {
  deviceVersion: string;
  deviceModel: string;
  uuid: string;
  OS: PlatformType;
};

export type DeviceManagerType = {
  getConstants(): Constants;
};
