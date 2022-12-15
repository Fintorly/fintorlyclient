import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import IconType from '~/Styles/IconType';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../Assets/fonts/ZGTarim.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'ZGTarim', 'ZGTarim.ttf');

export const ZGTarimIconPack = {
  name: 'ZGTarim',
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy(
    {},
    {
      // tslint:disable:no-unused-variable
      get(target, name) {
        return IconProvider(name as IconType);
      },
    },
  );
}

const IconProvider = (name: IconType) => ({
  toReactElement: (props: any) => ZTIcon({name, ...props}),
});

const ZTIcon = ({
  name,
  size,
  color,
  style,
}: {
  name: IconType;
  size: number;
  color: string | undefined;
  style: StyleProp<TextStyle>;
}) => {
  return <Icon name={name} size={size} color={color} style={style} />;
};
