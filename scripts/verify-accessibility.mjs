import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const results = [];
try {
  for (const theme of ['dark', 'light']) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: 'reduce',
    });
    await context.addInitScript((t) => localStorage.setItem('smartbau-theme', t), theme);
    const page = await context.newPage();
    for (const path of [
      '/en',
      '/en/features',
      '/en/pricing',
      '/en/help',
      '/en/account',
      '/en/showcase',
      '/en/newsletter',
      '/en/plugins',
      '/de',
    ]) {
      await page.goto((process.env.BASE_URL || 'http://localhost:3100') + path);
      await page.waitForFunction((t) => document.documentElement.dataset.theme === t, theme);
      await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
      const report = await page.evaluate(async () =>
        window.axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
        }),
      );
      results.push({
        path,
        theme,
        violations: report.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        })),
        incomplete: report.incomplete.length,
        passes: report.passes.length,
      });
    }
    await context.close();
  }
  await mkdir('docs/verification', { recursive: true });
  await writeFile(
    'docs/verification/accessibility.json',
    JSON.stringify(
      {
        scope: 'Chromium desktop, reduced motion; automated WCAG tags, not a certification',
        results,
      },
      null,
      2,
    ) + '\n',
  );
  const count = results.reduce((s, r) => s + r.violations.length, 0);
  console.log(JSON.stringify({ checks: results.length, violations: count }));
  if (count) process.exitCode = 1;
} finally {
  await browser.close();
}
