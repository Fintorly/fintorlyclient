import {Constants} from '../../Common/types/deviceManager';
import DeviceManager from 'react-native-device-info';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';

export function useDeviceConstants() {
  const {getUniqueId, getModel, getSystemVersion} = DeviceManager;
  let initailState: Constants = {
    deviceModel: getModel(),
    deviceVersion: getSystemVersion(),
    OS: Platform.OS,
    uuid: null,
  };
  const [constanst, setConstants] = useState(initailState);

  useEffect(() => {
    getUniqueId().then(res => {
      setConstants({
        ...initailState,
        uuid: res,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return constanst;
}
