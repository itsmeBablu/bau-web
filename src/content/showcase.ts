import type { Locale } from '@/lib/i18n';
export type ShowcaseModel = {
  slug: string;
  title: Record<Locale, string>;
  category: 'Residential' | 'Civic';
  location: Record<Locale, string>;
  description: Record<Locale, string>;
  file: string;
  poster: string;
  size: string;
  attribution: string;
};
export const showcaseModels: ShowcaseModel[] = [
  {
    slug: 'courtyard-pavilion',
    title: { en: 'Courtyard Pavilion', de: 'Hofpavillon' },
    category: 'Civic',
    location: { en: 'Concept study · 2026', de: 'Konzeptstudie · 2026' },
    description: {
      en: 'A compact architectural study in warm limestone, a sheltered courtyard and a slender entry screen.',
      de: 'Eine kompakte Architekturstudie aus warmem Kalkstein mit geschütztem Innenhof und filigranem Eingangsfilter.',
    },
    file: '/models/courtyard-pavilion.glb',
    poster: '/media/showcase/courtyard-pavilion.svg',
    size: '38 KB',
    attribution:
      'Original SmartBau website demonstration asset, generated parametrically for this gallery; CC0 1.0.',
  },
];
export function getShowcaseModel(slug: string) {
  return showcaseModels.find((model) => model.slug === slug);
}
