import type { Locale } from '@/lib/i18n';

export interface HelpTopic {
  title: string;
  summary: string;
  source: string;
  href: string;
}

const source = 'https://github.com/try-bau/SmartBau/blob/68e032702de7b4154cdb15e7c5a213f36ef5d009';
export const helpTopics: Record<Locale, HelpTopic[]> = {
  en: [
    {
      title: 'What is SmartBau?',
      summary:
        'SmartBau is a browser based BIM/CAD studio for 2D drafting, 3D modeling, building objects, and IFC workflows.',
      source: 'Repository overview',
      href: `${source}/README.md`,
    },
    {
      title: 'How do I create a project?',
      summary:
        'The application opens an editable workspace; project data can be stored locally in the browser. Cloud ownership and account behavior depend on the deployment.',
      source: 'Application flows',
      href: `${source}/docs/Flows.md`,
    },
    {
      title: 'How do I open an existing model?',
      summary:
        'The documented workspace can load IFC and FRAG files, or a registered sample model. Use the application’s load controls and choose a file supported by your deployment.',
      source: 'Model load flow',
      href: `${source}/docs/Flows.md`,
    },
    {
      title: 'How do walls and openings work?',
      summary:
        'Walls are editable drawing elements. Doors and windows are hosted openings; moving a wall carries its openings, while unsupported edits are rejected.',
      source: 'Modify toolkit',
      href: `${source}/docs/modify-toolkit.md`,
    },
    {
      title: 'Can I create floors and roofs?',
      summary:
        'The documented assistant action set supports polygon floors and flat or rectangular hip, gable, and shed roofs. Treat generated geometry as a concept model.',
      source: 'AI workflow and limits',
      href: `${source}/docs/ai-assistant.md`,
    },
    {
      title: 'What structural and MEP tools are available?',
      summary:
        'The documented action set includes columns and beams. The first assistant release does not validate structural or MEP engineering, or create connected MEP systems.',
      source: 'AI workflow and limits',
      href: `${source}/docs/ai-assistant.md`,
    },
    {
      title: 'How do I import or export files?',
      summary:
        'IFC and FRAG are documented load paths. The product overview describes IFC export; available options may vary by deployed version.',
      source: 'Repository overview and flows',
      href: `${source}/README.md`,
    },
    {
      title: 'What is the difference between 2D and 3D?',
      summary:
        'The studio supports 2D drafting and a Three.js 3D viewport. Native drawing elements and loaded IFC analysis are shown through separate data paths.',
      source: 'Application flows',
      href: `${source}/docs/Flows.md`,
    },
    {
      title: 'Can SmartBau render a presentation image?',
      summary:
        'The repository describes model viewing and presentation controls. This help center makes no claim about a hosted rendering service or its availability.',
      source: 'Repository overview',
      href: `${source}/README.md`,
    },
    {
      title: 'What should I do if a tool does not work?',
      summary:
        'Unsupported or constrained operations may be rejected. Check the documented operation limits and confirm your application version before retrying.',
      source: 'Modify toolkit',
      href: `${source}/docs/modify-toolkit.md`,
    },
    {
      title: 'Are subscriptions or credits available here?',
      summary:
        'This website has no connected account, billing, or credit data. Consult the application deployment owner for current account information.',
      source: 'SaaS architecture status',
      href: `${source}/docs/plans/enterprise-saas-architecture.md`,
    },
    {
      title: 'Is the AI assistant available?',
      summary:
        'AI workflows require application server configuration and provider access. This website does not provide an assistant service.',
      source: 'AI integration notes',
      href: `${source}/docs/ai-assistant.md`,
    },
    {
      title: 'Are shared project rooms private?',
      summary:
        'The source security audit documents authorization limits for live collaboration rooms. Do not use room links for confidential projects unless the deployment owner has confirmed its access policy.',
      source: 'Authorization audit',
      href: `${source}/docs/architecture/backend-phase-b3-7-room-lifecycle-authz-audit.md`,
    },
    {
      title: 'Where can I get help?',
      summary:
        'This center summarizes repository documentation. For deployment-specific support, consult the SmartBau repository and the team responsible for your application deployment.',
      source: 'SmartBau repository',
      href: 'https://github.com/try-bau/SmartBau/tree/68e032702de7b4154cdb15e7c5a213f36ef5d009',
    },
  ],
  de: [
    {
      title: 'Was ist SmartBau?',
      summary:
        'SmartBau ist ein browserbasiertes BIM/CAD-Studio für 2D-Zeichnung, 3D-Modellierung, Gebäudeelemente und IFC-Abläufe.',
      source: 'Repository-Übersicht',
      href: `${source}/README.md`,
    },
    {
      title: 'Wie erstelle ich ein Projekt?',
      summary:
        'Die Anwendung öffnet einen bearbeitbaren Arbeitsbereich; Projektdaten können lokal im Browser gespeichert werden. Cloud-Eigentümerschaft und Kontofunktionen hängen von der Bereitstellung ab.',
      source: 'Anwendungsabläufe',
      href: `${source}/docs/Flows.md`,
    },
    {
      title: 'Wie öffne ich ein vorhandenes Modell?',
      summary:
        'Der dokumentierte Arbeitsbereich kann IFC- und FRAG-Dateien oder registrierte Beispielmodelle laden. Verwende die Ladefunktionen der Anwendung und ein von deiner Bereitstellung unterstütztes Format.',
      source: 'Modellladeablauf',
      href: `${source}/docs/Flows.md`,
    },
    {
      title: 'Wie funktionieren Wände und Öffnungen?',
      summary:
        'Wände sind bearbeitbare Zeichnungselemente. Türen und Fenster sind zugeordnete Öffnungen; beim Verschieben einer Wand werden sie mitgenommen, nicht unterstützte Änderungen werden abgelehnt.',
      source: 'Änderungswerkzeuge',
      href: `${source}/docs/modify-toolkit.md`,
    },
    {
      title: 'Kann ich Geschosse und Dächer erstellen?',
      summary:
        'Der dokumentierte Aktionsumfang des Assistenten unterstützt polygonale Böden sowie flache und rechteckige Walm-, Giebel- und Pultdächer. Erzeugte Geometrie ist als Konzeptmodell zu behandeln.',
      source: 'KI-Ablauf und Grenzen',
      href: `${source}/docs/ai-assistant.md`,
    },
    {
      title: 'Welche Tragwerks- und MEP-Werkzeuge gibt es?',
      summary:
        'Der dokumentierte Aktionsumfang enthält Stützen und Träger. Die erste Assistentenversion prüft keine Tragwerks- oder MEP-Planung und erstellt keine verbundenen MEP-Systeme.',
      source: 'KI-Ablauf und Grenzen',
      href: `${source}/docs/ai-assistant.md`,
    },
    {
      title: 'Wie importiere oder exportiere ich Dateien?',
      summary:
        'IFC und FRAG sind dokumentierte Ladewege. Die Produktübersicht beschreibt IFC-Export; verfügbare Optionen können je nach Anwendungsversion variieren.',
      source: 'Produktübersicht und Abläufe',
      href: `${source}/README.md`,
    },
    {
      title: 'Was ist der Unterschied zwischen 2D und 3D?',
      summary:
        'Das Studio unterstützt 2D-Zeichnung und einen Three.js-3D-Viewport. Native Zeichnungselemente und geladene IFC-Analysen nutzen getrennte Datenwege.',
      source: 'Anwendungsabläufe',
      href: `${source}/docs/Flows.md`,
    },
    {
      title: 'Kann SmartBau Präsentationsbilder rendern?',
      summary:
        'Das Repository beschreibt Modellansicht und Präsentationssteuerung. Dieses Hilfezentrum behauptet keinen gehosteten Renderdienst oder dessen Verfügbarkeit.',
      source: 'Repository-Übersicht',
      href: `${source}/README.md`,
    },
    {
      title: 'Was kann ich tun, wenn ein Werkzeug nicht funktioniert?',
      summary:
        'Nicht unterstützte oder eingeschränkte Aktionen können abgelehnt werden. Prüfe die dokumentierten Grenzen und die Version deiner Anwendung.',
      source: 'Änderungswerkzeuge',
      href: `${source}/docs/modify-toolkit.md`,
    },
    {
      title: 'Gibt es hier Abonnements oder Guthaben?',
      summary:
        'Diese Website ist nicht mit Konto-, Abrechnungs- oder Guthabendaten verbunden. Aktuelle Kontoinformationen erhältst du vom Betreiber deiner Anwendung.',
      source: 'Status der SaaS-Architektur',
      href: `${source}/docs/plans/enterprise-saas-architecture.md`,
    },
    {
      title: 'Ist der KI-Assistent verfügbar?',
      summary:
        'KI-Abläufe benötigen eine Serverkonfiguration der Anwendung und Zugang zu einem Anbieter. Diese Website bietet keinen Assistentendienst.',
      source: 'Hinweise zur KI-Integration',
      href: `${source}/docs/ai-assistant.md`,
    },
    {
      title: 'Sind gemeinsame Projekträume privat?',
      summary:
        'Das Sicherheitsaudit dokumentiert Autorisierungseinschränkungen für Live-Kollaborationsräume. Verwende Raumlinks nicht für vertrauliche Projekte, solange die Zugriffsregeln der Bereitstellung nicht bestätigt sind.',
      source: 'Autorisierungsaudit',
      href: `${source}/docs/architecture/backend-phase-b3-7-room-lifecycle-authz-audit.md`,
    },
    {
      title: 'Wo finde ich Unterstützung?',
      summary:
        'Dieses Hilfezentrum fasst Repository-Dokumentation zusammen. Für bereitstellungsspezifischen Support wende dich an das SmartBau-Repository und das Team deiner Anwendungsbereitstellung.',
      source: 'SmartBau-Repository',
      href: 'https://github.com/try-bau/SmartBau/tree/68e032702de7b4154cdb15e7c5a213f36ef5d009',
    },
  ],
};
