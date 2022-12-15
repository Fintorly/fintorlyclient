enum LangKeys {
  about_app,
}

Object.entries(LangKeys).forEach(k => {
  let key = k[1];
  if (key && isNaN(key)) {
    LangKeys[key] = key;
  }
});

export {LangKeys};

export type Locale = {[key in keyof typeof LangKeys]: string};
