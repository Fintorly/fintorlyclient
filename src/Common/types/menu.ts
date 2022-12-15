import IconType from '~/Styles/IconType';
import {MyAccountMenu, MyOfferMenu, MyOrderMenu} from '../enums/menu';
export type MenuType = MyAccountMenu | MyOfferMenu | MyOrderMenu;

export type MenuItemType = {
  label: string;
  icon?: IconType;
  type: MenuType;
};
