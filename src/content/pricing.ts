/** Public pricing contract. Values are intentionally absent until approved by the business owner. */
export const pricingConfig = {
  schemaVersion: 1,
  status: 'draft' as const,
  currency: null,
  featureLimits: null as null | Record<string, number>,
  aiCredits: null as null | Record<string, number>,
  draftDisclosure: {
    en: 'Illustrative plan groupings only; plan names, feature access and limits require approval.',
    de: 'Nur beispielhafte Plangruppen; Namen, Funktionsumfang und Limits müssen freigegeben werden.',
  },
  plans: [
    {
      id: 'starter',
      name: { en: 'Starter', de: 'Starter' },
      monthly: null,
      annual: null,
      features: {
        en: ['Core drawing tools', 'Local project workflow', 'Standard export options'],
        de: ['Zentrale Zeichenwerkzeuge', 'Lokaler Projektworkflow', 'Standard-Exportoptionen'],
      },
    },
    {
      id: 'professional',
      name: { en: 'Professional', de: 'Professional' },
      monthly: null,
      annual: null,
      features: {
        en: ['Everything in Starter', 'Advanced building workflows', 'Future account features'],
        de: [
          'Alle Funktionen von Starter',
          'Erweiterte Gebäude-Workflows',
          'Künftige Kontofunktionen',
        ],
      },
    },
  ],
} as const;
