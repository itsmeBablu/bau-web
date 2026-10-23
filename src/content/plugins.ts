import type { Locale } from '@/lib/i18n';
export type PluginCategory = 'Design tools' | 'Data exchange' | 'Workflow';
export type PluginRoadmap = {
  slug: string;
  name: Record<Locale, string>;
  category: PluginCategory;
  summary: Record<Locale, string>;
  status: 'Planned' | 'Exploring';
  permissions: Record<Locale, string>;
};
export const pluginRoadmap: PluginRoadmap[] = [
  {
    slug: 'drawing-automation',
    name: { en: 'Drawing automation', de: 'Zeichnungsautomatisierung' },
    category: 'Design tools',
    summary: {
      en: 'Ideas for reducing repetitive setup in drawing workflows.',
      de: 'Ideen, um wiederkehrende Einrichtungsschritte im Zeichnungsworkflow zu reduzieren.',
    },
    status: 'Exploring',
    permissions: {
      en: 'No plugin permissions or runtime are available yet.',
      de: 'Plugin-Berechtigungen oder eine Laufzeit sind derzeit noch nicht verfügbar.',
    },
  },
  {
    slug: 'open-data-exports',
    name: { en: 'Open data exports', de: 'Offene Datenexporte' },
    category: 'Data exchange',
    summary: {
      en: 'Exploring clearer handoffs between project data and external tools.',
      de: 'Untersuchung transparenter Übergaben zwischen Projektdaten und externen Werkzeugen.',
    },
    status: 'Planned',
    permissions: {
      en: 'No integrations can be installed from this directory.',
      de: 'Über dieses Verzeichnis lassen sich keine Integrationen installieren.',
    },
  },
  {
    slug: 'team-workflows',
    name: { en: 'Team workflows', de: 'Team-Workflows' },
    category: 'Workflow',
    summary: {
      en: 'A roadmap area for future project workflow extensions.',
      de: 'Ein Roadmap-Bereich für künftige Erweiterungen von Projektabläufen.',
    },
    status: 'Exploring',
    permissions: {
      en: 'There is no plugin execution or data access behind this concept.',
      de: 'Hinter diesem Konzept gibt es keine Plugin-Ausführung und keinen Datenzugriff.',
    },
  },
];
