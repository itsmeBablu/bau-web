import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: { default: 'SmartBau — Design smarter. Build better.', template: '%s | SmartBau' },
  description: 'A considered digital workspace for architectural design and building workflows.',
  icons: { icon: '/icon.svg' },
};

export default function RedirectRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
