export const minCharacterControl = (text: string, minChar: number): boolean => {
  if (typeof text === 'string') {
    return text.length >= minChar;
  }
  return false;
};

export const hasUpperCaseControl = (text: string): boolean => {
  return /[A-Z]/.test(text);
};

export const hasLowerCaseControl = (text: string): boolean => {
  return /[a-z]/.test(text);
};

export const hasNumberControl = (text: string): boolean => {
  return /[0-9]/.test(text);
};

export const isMatchControl = (text: string, text2: string): boolean => {
  return text === text2;
};

export const validateTcknOrVkn = (tcknOrVkn: string) => {
  return tcknValidate(tcknOrVkn) || vknValidate(tcknOrVkn);
};

export const isHtml = (text: string) => {
  return /<.+?>/.test(text);
};

export const tcknValidate = (tcno: string) => {
  let hane_tek, hane_cift, j;
  tcno = String(tcno);
  if (tcno.substring(0, 1) === '0') {
    return !1;
  }
  if (tcno.length !== 11) {
    return !1;
  }
  var ilkon_array = tcno.substr(0, 10).split('');
  var ilkon_total = (hane_tek = hane_cift = 0);
  for (var i = (j = 0); i < 9; ++i) {
    j = parseInt(ilkon_array[i], 10);
    if (i & 1) {
      hane_cift += j;
    } else {
      hane_tek += j;
    }
    ilkon_total += j;
  }
  if ((hane_tek * 7 - hane_cift) % 10 !== parseInt(tcno.substr(-2, 1), 10)) {
    return !1;
  }
  ilkon_total += parseInt(ilkon_array[9], 10);
  if (ilkon_total % 10 !== parseInt(tcno.substr(-1), 10)) {
    return !1;
  }
  return !0;
};

export const vknValidate = (vknNo: string) => {
  if (vknNo.length === 10) {
    let v = [];
    let lastDigit = Number(vknNo.charAt(9));
    for (let i = 0; i < 9; i++) {
      let tmp = (Number(vknNo.charAt(i)) + (9 - i)) % 10;
      v[i] = (tmp * 2 ** (9 - i)) % 9;
      if (tmp !== 0 && v[i] === 0) v[i] = 9;
    }
    let sum = v.reduce((a, b) => a + b, 0) % 10;
    return (10 - (sum % 10)) % 10 === lastDigit;
  }
  return false;
};
