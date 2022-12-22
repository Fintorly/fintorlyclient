enum ThemeKeyVariables {
  colorPrimaryBackground,
  colorPrimaryWhite,
  colorPrimaryGray,
  colorPrimaryOrange,
  colorNeutralDarkBlue,
  colorNeutralGray500,
  colorNeutralGray400,
  colorNeutralWhite300,
  colorNeutralWhite200,
  colorNeutralRed,
  colorNeutralGreen,
  colorHudBackground,
  colorInputBackground,
  colorInputPlaceholder,
  colorInputTitle,
  colorInputIcon,
  colorInputError,
  colorInputSuccess,
}

Object.entries(ThemeKeyVariables).forEach((k) => {
  let key = k[1];
  if (key && isNaN(key)) {
    ThemeKeyVariables[key] = key;
  }
});

type ThemeDictionary = { [key in keyof typeof ThemeKeyVariables]: string };

export const ThemeKeys: ThemeDictionary = {
  colorPrimaryBackground: 'color-primary-background',
  colorHudBackground: 'color-hud-background',
  colorPrimaryWhite: 'color-primary-white',
  colorPrimaryGray: 'color-primary-gray',
  colorPrimaryOrange: 'color-primary-orange',
  colorNeutralDarkBlue: 'color-neutral-darkblue',
  colorNeutralGray500: 'color-neutral-gray-500',
  colorNeutralGray400: 'color-neutral-gray-400',
  colorNeutralWhite300: 'color-neutral-white-300',
  colorNeutralWhite200: 'color-neutral-white-200',
  colorNeutralRed: 'color-neutral-red',
  colorNeutralGreen: 'color-neutral-green',
  colorInputBackground: 'color-input-background',
  colorInputPlaceholder: 'color-input-placeholder',
  colorInputTitle: 'color-input-title',
  colorInputIcon: 'color-input-icon',
  colorInputError: 'color-input-error',
  colorInputSuccess: 'color-input-success',
};
