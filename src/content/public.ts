import type { Locale } from '@/lib/i18n';

export type PublicFeature = {
  title: string;
  status: 'Available' | 'Beta' | 'Planned';
  body: string;
  source: string;
  href: string;
  accent?: 'blue';
};
const auditedRef = '68e032702de7b4154cdb15e7c5a213f36ef5d009';

export const featureContent: Record<
  Locale,
  { eyebrow: string; title: string; intro: string; note: string; features: PublicFeature[] }
> = {
  en: {
    eyebrow: 'A closer look',
    title: 'Tools for the way buildings come together.',
    intro:
      'A focused workspace for architectural drawings, building elements and model review. Each capability below reflects code or documented status in the SmartBau reference.',
    note: 'These labels describe the audited source tree, not general availability. Your deployment may differ; beta features have known integration or operational limits.',
    features: [
      {
        title: 'Precise 2D drawing',
        status: 'Available',
        body: 'Create and edit geometry with CAD snaps, dimensions, layers and precision tools in the drawing workspace.',
        source: 'Drawing engine',
        href: `https://github.com/try-bau/SmartBau/tree/${auditedRef}/packages/drawing-engine/src`,
      },
      {
        title: 'Walls, doors and windows',
        status: 'Available',
        body: 'Edit parametric walls, doors and windows as building elements, with associated selection and placement workflows.',
        source: 'Building model components',
        href: `https://github.com/try-bau/SmartBau/tree/${auditedRef}/apps/web/components`,
      },
      {
        title: 'Floors and roofs',
        status: 'Available',
        body: 'Create and work with slabs and roof elements in the building model. Engineering design validation remains the responsibility of the project team.',
        source: 'Building model and AI workflow docs',
        href: `https://github.com/try-bau/SmartBau/blob/${auditedRef}/docs/ai-assistant.md`,
      },
      {
        title: 'Structure and building systems',
        status: 'Available',
        body: 'Model building and MEP elements in the 3D workspace. The reference includes structural and services workflows.',
        source: 'Application components',
        href: `https://github.com/try-bau/SmartBau/tree/${auditedRef}/apps/web/components`,
        accent: 'blue',
      },
      {
        title: 'IFC model review',
        status: 'Available',
        body: 'Load and inspect IFC models in the 3D workspace, with view controls and model markup tools.',
        source: 'IFC and viewer code',
        href: `https://github.com/try-bau/SmartBau/tree/${auditedRef}/apps/web/lib`,
        accent: 'blue',
      },
      {
        title: 'Smart annotations',
        status: 'Available',
        body: 'Add dimensions and notes associated with drawing or model elements, then review them in the workspace.',
        source: 'Markup store',
        href: `https://github.com/try-bau/SmartBau/blob/${auditedRef}/apps/web/store/useToolMarkupStore.ts`,
      },
      {
        title: 'Presentation views',
        status: 'Available',
        body: 'Adjust camera, visibility, scene and render-preview settings to review a model from different perspectives.',
        source: 'View and render settings',
        href: `https://github.com/try-bau/SmartBau/blob/${auditedRef}/apps/web/store/useViewDisplayStore.ts`,
      },
      {
        title: 'DWG and PDF workflows',
        status: 'Beta',
        body: 'DWG-related and PDF export paths are present. Format support varies by workflow and file; verify an exchange with your own project before relying on it.',
        source: 'Export implementation',
        href: `https://github.com/try-bau/SmartBau/tree/${auditedRef}/apps/web/lib`,
      },
      {
        title: 'Shared canvas collaboration',
        status: 'Beta',
        body: 'The application includes a shared-canvas session, presence and a durable client outbox. End-to-end acceptance and access policy remain open; do not use it for private or confidential projects.',
        source: 'Collaboration integration checkpoint',
        href: `https://github.com/try-bau/SmartBau/blob/${auditedRef}/PROGRESS.md`,
      },
      {
        title: 'AI modeling assistant',
        status: 'Beta',
        body: 'An assistant workflow is implemented. It requires Google sign-in and configured server-side AI and rate-limit services; live provider credentials were not present during verification.',
        source: 'AI workflow and setup',
        href: `https://github.com/try-bau/SmartBau/blob/${auditedRef}/docs/ai-assistant.md`,
      },
    ],
  },
  de: {
    eyebrow: 'Ein genauerer Blick',
    title: 'Werkzeuge für den Weg vom Entwurf zum Gebäude.',
    intro:
      'Ein fokussierter Arbeitsbereich für Architekturzeichnungen, Gebäudeelemente und Modellprüfung. Die folgenden Funktionen oder Statusangaben sind im SmartBau-Referenzstand belegt.',
    note: 'Die Angaben beschreiben den geprüften Quellstand, keine allgemeine Verfügbarkeit. Ihre Bereitstellung kann abweichen; Beta-Funktionen haben bekannte Betriebs- oder Integrationsgrenzen.',
    features: [
      {
        title: 'Präzises 2D-Zeichnen',
        status: 'Available',
        body: 'Erstellen und bearbeiten Sie Geometrie mit CAD-Fangfunktionen, Bemaßungen, Ebenen und Präzisionswerkzeugen.',
        source: 'Zeichen-Engine',
        href: `https://github.com/try-bau/SmartBau/tree/${auditedRef}/packages/drawing-engine/src`,
      },
      {
        title: 'Wände, Türen und Fenster',
        status: 'Available',
        body: 'Bearbeiten Sie parametrische Wände, Türen und Fenster als Gebäudeelemente mit Auswahl- und Platzierungsabläufen.',
        source: 'Gebäudemodell-Komponenten',
        href: `https://github.com/try-bau/SmartBau/tree/${auditedRef}/apps/web/components`,
      },
      {
        title: 'Decken und Dächer',
        status: 'Available',
        body: 'Erstellen und bearbeiten Sie Decken- und Dachelemente im Gebäudemodell. Die technische Prüfung bleibt Aufgabe des Projektteams.',
        source: 'Gebäudemodell und KI-Ablauf',
        href: `https://github.com/try-bau/SmartBau/blob/${auditedRef}/docs/ai-assistant.md`,
      },
      {
        title: 'Tragwerk und Gebäudetechnik',
        status: 'Available',
        body: 'Modellieren Sie Gebäude- und TGA-Elemente im 3D-Arbeitsbereich. Der Referenzstand enthält Tragwerks- und Versorgungsabläufe.',
        source: 'Anwendungskomponenten',
        href: `https://github.com/try-bau/SmartBau/tree/${auditedRef}/apps/web/components`,
        accent: 'blue',
      },
      {
        title: 'IFC-Modellprüfung',
        status: 'Available',
        body: 'Laden und prüfen Sie IFC-Modelle im 3D-Arbeitsbereich mit Ansichtssteuerung und Modellmarkierungen.',
        source: 'IFC- und Viewer-Code',
        href: `https://github.com/try-bau/SmartBau/tree/${auditedRef}/apps/web/lib`,
        accent: 'blue',
      },
      {
        title: 'Intelligente Anmerkungen',
        status: 'Available',
        body: 'Fügen Sie Bemaßungen und Notizen hinzu, die Zeichnungs- oder Modellelementen zugeordnet sind.',
        source: 'Markup-Store',
        href: `https://github.com/try-bau/SmartBau/blob/${auditedRef}/apps/web/store/useToolMarkupStore.ts`,
      },
      {
        title: 'Präsentationsansichten',
        status: 'Available',
        body: 'Passen Sie Kamera, Sichtbarkeit, Szene und Rendervorschau an, um ein Modell aus verschiedenen Perspektiven zu prüfen.',
        source: 'Ansichts- und Rendereinstellungen',
        href: `https://github.com/try-bau/SmartBau/blob/${auditedRef}/apps/web/store/useViewDisplayStore.ts`,
      },
      {
        title: 'DWG- und PDF-Abläufe',
        status: 'Beta',
        body: 'DWG-bezogene und PDF-Exportpfade sind vorhanden. Die Formatunterstützung hängt von Datei und Ablauf ab; prüfen Sie Ihren Austausch vor der Verwendung.',
        source: 'Exportimplementierung',
        href: `https://github.com/try-bau/SmartBau/tree/${auditedRef}/apps/web/lib`,
      },
      {
        title: 'Gemeinsame Canvas-Zusammenarbeit',
        status: 'Beta',
        body: 'Die Anwendung enthält gemeinsame Canvas-Sitzung, Präsenz und einen dauerhaften Client-Outbox. Ende-zu-Ende-Abnahme und Zugriffsrichtlinien sind offen; nicht für vertrauliche Projekte verwenden.',
        source: 'Integrationscheckpoint Zusammenarbeit',
        href: `https://github.com/try-bau/SmartBau/blob/${auditedRef}/PROGRESS.md`,
      },
      {
        title: 'KI-Modellierungsassistent',
        status: 'Beta',
        body: 'Ein Assistentenablauf ist implementiert. Er benötigt Google-Anmeldung sowie konfigurierte serverseitige KI- und Rate-Limit-Dienste; bei der Prüfung waren keine Live-Anbieterdaten vorhanden.',
        source: 'KI-Ablauf und Einrichtung',
        href: `https://github.com/try-bau/SmartBau/blob/${auditedRef}/docs/ai-assistant.md`,
      },
    ],
  },
};

export const pageCopy = {
  updates: {
    en: {
      eyebrow: 'Product log',
      title: 'Work in progress, made visible.',
      intro:
        'Selected engineering milestones from the SmartBau source history. These notes describe repository changes, not a promise that every deployment includes them.',
      entries: [
        {
          date: '2026-10-21',
          title: 'Compound editing and shared blocks',
          body: 'The source history records compound editing, precision tools and shared blocks in the CAD workspace.',
          href: 'https://github.com/try-bau/SmartBau/commit/befcf5efd8f5c661c2546195f1ebae5c0c7299f0',
        },
        {
          date: '2026-10-20',
          title: 'Section tools and drawing precision',
          body: 'A source change added section views, crop boxes, orthographic snapping and a properties inspector.',
          href: 'https://github.com/try-bau/SmartBau/commit/0a92fc99cc022953fd7611da91f7bca27e4e3a3b',
        },
      ],
    },
    de: {
      eyebrow: 'Produktprotokoll',
      title: 'Fortschritt, der sichtbar wird.',
      intro:
        'Ausgewählte Entwicklungsmeilensteine aus der SmartBau-Quellhistorie. Die Einträge beschreiben Repository-Änderungen und garantieren nicht, dass jede Bereitstellung sie enthält.',
      entries: [
        {
          date: '2026-10-21',
          title: 'Zusammengesetzte Bearbeitung und gemeinsame Blöcke',
          body: 'Die Quellhistorie dokumentiert zusammengesetzte Bearbeitung, Präzisionswerkzeuge und gemeinsame Blöcke im CAD-Arbeitsbereich.',
          href: 'https://github.com/try-bau/SmartBau/commit/befcf5efd8f5c661c2546195f1ebae5c0c7299f0',
        },
        {
          date: '2026-10-20',
          title: 'Schnittwerkzeuge und Zeichenpräzision',
          body: 'Eine Quelländerung ergänzte Schnittansichten, Begrenzungsrahmen, orthografisches Fangen und einen Eigenschafteninspektor.',
          href: 'https://github.com/try-bau/SmartBau/commit/0a92fc99cc022953fd7611da91f7bca27e4e3a3b',
        },
      ],
    },
  },
  roadmap: {
    en: {
      eyebrow: 'Direction',
      title: 'A roadmap with the labels left on.',
      intro:
        'These states come from the product’s own architecture notes. Planned work is shown as planned, with no delivery dates implied.',
      groups: [
        {
          status: 'Shipped',
          title: 'Drawing and model workflows',
          body: '2D drawing, building-element editing, model viewing and presentation controls are present in the application code.',
        },
        {
          status: 'In progress',
          title: 'A stronger CAD foundation',
          body: 'The repository history shows ongoing refinement of precision tools, editing workflows and model review.',
        },
        {
          status: 'In progress',
          title: 'Shared canvas collaboration',
          body: 'A link-based shared-canvas flow and presence exist. End-to-end acceptance remains open and the current access model has no per-user ACL; avoid private or confidential work.',
        },
        {
          status: 'In progress',
          title: 'AI-assisted modeling',
          body: 'The application has an assistant workflow, but hosted use depends on configured providers and rate limiting. Live provider credentials were not available during verification.',
        },
        {
          status: 'Planned',
          title: 'Embeddable model viewer',
          body: 'A lightweight public viewer is described as a future phase, with lazy loading and a defined viewer API.',
        },
      ],
    },
    de: {
      eyebrow: 'Ausrichtung',
      title: 'Eine Roadmap mit klaren Statusangaben.',
      intro:
        'Die Statusangaben stammen aus den Architekturhinweisen des Produkts. Geplante Arbeit bleibt als geplant gekennzeichnet; Liefertermine sind nicht impliziert.',
      groups: [
        {
          status: 'Shipped',
          title: 'Zeichen- und Modellabläufe',
          body: '2D-Zeichnen, Gebäudeelemente, Modellansichten und Präsentationssteuerung sind im Anwendungscode vorhanden.',
        },
        {
          status: 'In progress',
          title: 'Eine stärkere CAD-Grundlage',
          body: 'Die Repository-Historie zeigt laufende Verbesserungen an Präzisionswerkzeugen, Bearbeitung und Modellprüfung.',
        },
        {
          status: 'In progress',
          title: 'Gemeinsame Canvas-Zusammenarbeit',
          body: 'Ein linkbasierter gemeinsamer Canvas-Ablauf mit Präsenz ist vorhanden. Die Ende-zu-Ende-Abnahme ist offen und es gibt keine benutzerbezogene ACL; nicht für vertrauliche Arbeit verwenden.',
        },
        {
          status: 'In progress',
          title: 'KI-gestützte Modellierung',
          body: 'Die Anwendung enthält einen Assistentenablauf. Der gehostete Betrieb hängt von konfigurierten Anbietern und Rate-Limits ab; Live-Anbieterdaten waren bei der Prüfung nicht verfügbar.',
        },
        {
          status: 'Planned',
          title: 'Einbettbarer Modell-Viewer',
          body: 'Ein leichtgewichtiger öffentlicher Viewer ist als künftige Phase mit verzögertem Laden und definierter API beschrieben.',
        },
      ],
    },
  },
} as const;
