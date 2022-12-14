import {createRef} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {NavigationRefType} from './Navigator';
export const navigationRef = createRef<NavigationContainerRef>();
export const navigatorRef = createRef<NavigationRefType>();
