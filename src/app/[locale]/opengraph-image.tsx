import { ImageResponse } from 'next/og';
export const alt = 'SmartBau — Design smarter. Build better.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 70,
        background: '#090A0F',
        color: '#f5f5f2',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', fontSize: 32, letterSpacing: -1 }}>
        ◩ SmartBau
        <span style={{ marginLeft: 20, color: '#38BDF8', fontSize: 18 }}>
          Architecture + Engineering
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 78,
          lineHeight: 1.05,
          letterSpacing: -4,
        }}
      >
        <span>{locale === 'de' ? 'Klarer entwerfen.' : 'Design smarter.'}</span>
        <span style={{ color: '#FACC15' }}>
          {locale === 'de' ? 'Besser bauen.' : 'Build better.'}
        </span>
      </div>
      <div style={{ display: 'flex', fontSize: 20, color: '#a1a3ad' }}>
        {locale === 'de'
          ? 'Von der Idee zum intelligenten Gebäude.'
          : 'From idea to intelligent building.'}
      </div>
    </div>,
    size,
  );
}
