export const handleDecimal = (value: string): string => {
  const comma = ',';
  const dot = '.';
  /* Girilen noktayı virgüle çevirmek için eklendi. Bunun nedeni IOS'ta cihazın lokasyonu Türkiye dışında 
     başka bir ülke/bölge seçildiğinde (Örn: ABD) decimal-pad tipindeki klavyede nokta bulunmamakta.*/
  if (value[value.length - 1] === dot) {
    value = value.substring(0, value.length - 1) + comma;
  }

  if (value.includes(comma)) {
    //Input alanına girilen ilk değer virgül ise virgülün soluna 0 değerini atar
    if (value.length === 1) {
      value = '0' + value;
    } else if (
      //Input alanına ikinci bir girildiğinde bu virgülü temizler.
      value[value.length - 1] === comma &&
      value.indexOf(comma) < value.length - 1
    ) {
      value = value.substring(0, value.length - 1);
    }
    //Input alanına değer girilirken virgülden sonra 2 basamaktan fazla değer girilmesinin önüne geçer.
    const digit = value.split(comma)[0];
    let fract = value.split(comma)[1];
    if (fract.length > 2) {
      fract = fract.substring(0, 2);
    }
    value = digit + comma + fract;
  }
  return value;
};
