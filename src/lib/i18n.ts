export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const messages = {
  en: {
    navigation: [
      ['Features', 'features'],
      ['Pricing', 'pricing'],
      ['Showcase', 'showcase'],
      ['Resources', 'help'],
    ],
    signIn: 'Sign in',
    launch: 'Open SmartBau',
    footer: 'Thoughtful tools for better building.',
    menu: 'Open navigation',
    close: 'Close navigation',
    theme: 'Toggle color theme',
    language: 'Switch language',
  },
  de: {
    navigation: [
      ['Funktionen', 'features'],
      ['Preise', 'pricing'],
      ['Showcase', 'showcase'],
      ['Ressourcen', 'help'],
    ],
    signIn: 'Anmelden',
    launch: 'SmartBau öffnen',
    footer: 'Durchdachte Werkzeuge für besseres Bauen.',
    menu: 'Navigation öffnen',
    close: 'Navigation schließen',
    theme: 'Farbschema wechseln',
    language: 'Sprache wechseln',
  },
} as const;

export function getDictionary(locale: Locale) {
  return messages[locale];
}
