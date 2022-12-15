import {Item} from 'react-native-picker-select';
import {InfoWithTooltipType} from '~/Components/InfoWithTooltip';
import {
  AccessibilityInfoType,
  DocumentInputType,
  DocumentsType,
} from '../enums/document';

export type DocumentItemType = Item & {
  name: DocumentInputType;
  type: DocumentsType;
};

export type AccessibilityItemType = InfoWithTooltipType & {
  accesType: AccessibilityInfoType;
};
