export enum DocumentsType {
  DijitalTarim_KvkkFormu = 'DijitalTarim_KvkkFormu',
  DijitalTarım_AydinlatmaMetni = 'DijitalTarım_AydinlatmaMetni',
  DijitalTarim_KullaniciSözlesmesi = 'DijitalTarim_KullaniciSözlesmesi',
  DijitalTarim_MesafeliSatisSozlesmesi = 'DijitalTarim_KullaniciSözlesmesi', //TODO: DijitalTarim_MesafeliSatisSozlesmesi servise eklenince yazılacak
  DijitalTarim_OnBilgilendirmeMetni = 'DijitalTarim_OnBilgilendirmeMetni',
}

export enum DocumentInputType {
  kvkk = 'kvkk',
  lightingText = 'lightingText',
  userAgreement = 'userAgreement',
  distanceSalesAgreement = 'distanceSalesAgreement',
  preliminaryInformation = 'preliminaryInformation',
}

export enum AccessibilityInfoType {
  none = 0,
  agriculturalInputPurchase = 1,
  agriculturalInputSales = 2,
  agriculturalProductPurchase = 4,
  agriculturalProductSales = 8,
}
