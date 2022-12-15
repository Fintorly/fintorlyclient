import {LangKeys} from '~/Locale/LangKeys';
import {
  DocumentsType,
  DocumentInputType,
  AccessibilityInfoType,
} from '../enums/document';
import {AccessibilityItemType, DocumentItemType} from '../types/documents';

export const documentList: DocumentItemType[] = [
  {
    label: LangKeys.document_title_kvkk as string,
    type: DocumentsType.DijitalTarim_KvkkFormu,
    name: DocumentInputType.kvkk,
    value: 1,
  },
  {
    label: LangKeys.document_title_lighting_text as string,
    name: DocumentInputType.lightingText,
    type: DocumentsType.DijitalTarım_AydinlatmaMetni,
    value: 2,
  },
  {
    label: LangKeys.document_title_user_agreement as string,
    type: DocumentsType.DijitalTarim_KullaniciSözlesmesi,
    name: DocumentInputType.userAgreement,
    value: 3,
  },
];

export const payingDocumentList: DocumentItemType[] = [
  {
    label: LangKeys.document_distance_sales_agreement as string,
    name: DocumentInputType.distanceSalesAgreement,
    type: DocumentsType.DijitalTarim_MesafeliSatisSozlesmesi,
    value: 1,
  },

  {
    label: LangKeys.document_preliminary_information_text as string,
    name: DocumentInputType.preliminaryInformation,
    type: DocumentsType.DijitalTarim_OnBilgilendirmeMetni,
    value: 2,
  },
];

export const accessibilityList: AccessibilityItemType[] = [
  {
    label: LangKeys.label_input_purchase as string,
    message: LangKeys.message_input_purchase as string,
    accesType: AccessibilityInfoType.agriculturalInputPurchase,
  },
  {
    label: LangKeys.label_input_sales as string,
    message: LangKeys.message_input_sales as string,
    accesType: AccessibilityInfoType.agriculturalInputSales,
  },
  {
    label: LangKeys.label_product_purchase as string,
    message: LangKeys.message_product_purchase as string,
    accesType: AccessibilityInfoType.agriculturalProductPurchase,
  },
  {
    label: LangKeys.label_product_sales as string,
    message: LangKeys.message_product_sales as string,
    accesType: AccessibilityInfoType.agriculturalProductSales,
  },
];
