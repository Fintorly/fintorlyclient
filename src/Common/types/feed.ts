import {FilterItemsType} from '~/Navigator/NavigatorTypes';
import {SortItemType} from './sortItem';

export type AdvertisePropsTypes = {
  search?: string;
  selectedSort?: SortItemType;
  filterItem?: FilterItemsType;
  isTabChange: boolean;
};
