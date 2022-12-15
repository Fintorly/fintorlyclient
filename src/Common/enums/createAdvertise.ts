import i18n from 'i18next';
import {LangKeys} from '~/Locale/LangKeys';

export enum CreateAdvertiseSteps {
  Group,
  Category,
  Subcategory,
}
export const CreateAdvertiseResources = {
  [CreateAdvertiseSteps.Group]: i18n.t(LangKeys.product_type),
  [CreateAdvertiseSteps.Category]: i18n.t(LangKeys.category),
  [CreateAdvertiseSteps.Subcategory]: i18n.t(LangKeys.subcategory),
};
