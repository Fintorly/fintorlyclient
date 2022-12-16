import {DeviceManagerType} from '../Common/types/deviceManager';
import {useDeviceConstants} from '../Utils/hooks/useDeviceInfo';

export const DeviceManger: DeviceManagerType = {
  getConstants: useDeviceConstants,
};
