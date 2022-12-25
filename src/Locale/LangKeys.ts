enum LangKeys {
  about_app,
  home_stack,
  settings_stack,
  about_stack,
  home,
  onboard_title_page1,
  onboard_desc1_page1,
  onboard_desc2_page1,
  onboard_desc3_page1,
  onboard_desc4_page1,
  onboard_title_page2,
  onboard_desc1_page2,
  onboard_desc2_page2,
  onboard_desc3_page2,
  onboard_desc4_page2,
  onboard_title_page3,
  onboard_desc1_page3,
  onboard_desc2_page3,
  onboard_desc3_page3,
  onboard_desc4_page3,
  onboard_title_page4,
  onboard_desc1_page4,
  onboard_desc2_page4,
  onboard_desc3_page4,
  onboard_desc4_page4,
  onboard_desc5_page4,
  skip,
  contunue_button,
  lets_start_button,
}

Object.entries(LangKeys).forEach(k => {
  let key = k[1];
  if (key && isNaN(key)) {
    LangKeys[key] = key;
  }
});

export { LangKeys };

export type Locale = { [key in keyof typeof LangKeys]: string };
