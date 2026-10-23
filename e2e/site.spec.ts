import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const evidenceDir = 'docs/verification/screenshots';

async function waitForClientReady(page: import('@playwright/test').Page) {
  await expect(page.locator('html')).toHaveAttribute('data-theme', /^(dark|light)$/);
}

test('localized navigation, language switching, and mobile menu work', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/en');
  await waitForClientReady(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(
    page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Features' }),
  ).toHaveAttribute('href', '/en/features');
  await page.getByRole('banner').getByRole('link', { name: 'Switch language: Deutsch' }).click();
  await expect(page).toHaveURL(/\/de$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await waitForClientReady(page);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Navigation öffnen' }).click();
  const menu = page.locator('#mobile-navigation');
  await expect(menu).toBeVisible();
  await expect(page.getByRole('button', { name: 'Navigation schließen' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await page.screenshot({ path: `${evidenceDir}/mobile-home.png` });
  await page.getByRole('button', { name: 'Navigation öffnen' }).click();
  await page.screenshot({ path: `${evidenceDir}/mobile-menu-de.png` });
  await menu.getByRole('link', { name: 'Preise' }).click();
  await expect(page).toHaveURL(/\/de\/pricing$/);
  await expect(menu).toBeHidden();
});

test('theme toggles and persists across navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/en');
  await waitForClientReady(page);
  await mkdir(evidenceDir, { recursive: true });
  await page.screenshot({ path: `${evidenceDir}/home-desktop.png` });
  const toggle = page.getByRole('button', { name: 'Toggle color theme' });
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('smartbau-theme')))
    .toBe('light');
  await page.goto('/en/features');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.goto('/en');
  await waitForClientReady(page);
  await mkdir(evidenceDir, { recursive: true });
  await page.screenshot({ path: `${evidenceDir}/home-light.png` });
  await page.getByRole('button', { name: 'Toggle color theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.screenshot({ path: `${evidenceDir}/home-dark.png` });
});

test('theme remains usable when browser storage is blocked', async ({ browser }) => {
  const context = await browser.newContext();
  await context.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem() {
          throw new DOMException('Storage disabled', 'SecurityError');
        },
        setItem() {
          throw new DOMException('Storage disabled', 'SecurityError');
        },
      },
    });
  });
  const page = await context.newPage();
  await page.goto('/en');
  await waitForClientReady(page);
  await page.getByRole('button', { name: 'Toggle color theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await context.close();
});

test('homepage retains readable content with reduced motion and no WebGL', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/en');
  await waitForClientReady(page);
  await expect(page.getByRole('heading', { name: /From idea to/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'A place to begin' })).toBeVisible();
  await page.locator('#stage-4').scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'A roof that belongs' })).toBeVisible();
  await mkdir(evidenceDir, { recursive: true });
  await page.screenshot({ path: `${evidenceDir}/home-stage-04.png` });
  await page.locator('#stage-5').scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'Systems in the open' })).toBeVisible();
  await page.screenshot({ path: `${evidenceDir}/home-stage-05.png` });
  await page.locator('#stage-8').scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'Your next project starts here' })).toBeVisible();
  await page.screenshot({ path: `${evidenceDir}/home-stage-08.png` });
  await expect(page.locator('[data-scene-host]')).toBeVisible();
  await expect(page.locator('[data-scene-host]')).toHaveAttribute('data-scene-ready', 'false');
  await expect(page.locator('[data-scene-host] img')).toBeVisible();
  await context.close();

  await mkdir('docs/verification/video', { recursive: true });
  const videoContext = await browser.newContext({
    viewport: { width: 960, height: 720 },
    recordVideo: { dir: 'docs/verification/video', size: { width: 960, height: 720 } },
  });
  const videoPage = await videoContext.newPage();
  await videoPage.goto('/en');
  await waitForClientReady(videoPage);
  await videoPage.locator('#stage-1').scrollIntoViewIfNeeded();
  await videoPage.waitForTimeout(350);
  await videoPage.locator('#stage-4').scrollIntoViewIfNeeded();
  await videoPage.waitForTimeout(350);
  await videoPage.locator('#stage-8').scrollIntoViewIfNeeded();
  await videoPage.waitForTimeout(350);
  const video = videoPage.video();
  await videoPage.close();
  await videoContext.close();
  await video?.saveAs('docs/verification/video/home-story.webm');

  const normalContext = await browser.newContext();
  const normalPage = await normalContext.newPage();
  await normalPage.goto('/en');
  await waitForClientReady(normalPage);
  const scene = normalPage.locator('[data-scene-detail][data-scene-fallback]');
  await expect
    .poll(
      async () =>
        (await scene.getAttribute('data-scene-ready')) === 'true' ||
        (await scene.getAttribute('data-scene-fallback')) === 'true',
    )
    .toBe(true);
  if ((await scene.getAttribute('data-scene-ready')) === 'true') {
    await expect(scene.locator('canvas')).toBeVisible();
    expect(
      await scene.locator('canvas').evaluate((canvas) => (canvas as HTMLCanvasElement).width),
    ).toBeGreaterThan(0);
  } else {
    await expect(normalPage.locator('[data-scene-host] img')).toBeVisible();
  }
  await normalContext.close();

  const noWebgl = await browser.newContext();
  await noWebgl.addInitScript(() => {
    const canvas = HTMLCanvasElement.prototype as unknown as {
      getContext: (this: HTMLCanvasElement, ...args: unknown[]) => unknown;
    };
    const original = canvas.getContext;
    canvas.getContext = function (this: HTMLCanvasElement, ...args: unknown[]) {
      const contextId = args[0] as string;
      if (contextId === 'webgl' || contextId === 'webgl2' || contextId === 'experimental-webgl')
        return null;
      return original.call(this, ...args);
    };
  });
  const fallbackPage = await noWebgl.newPage();
  await fallbackPage.goto('/en');
  await waitForClientReady(fallbackPage);
  await expect(fallbackPage.getByRole('heading', { name: /From idea to/ })).toBeVisible();
  await expect(
    fallbackPage.locator('[data-scene-detail][data-scene-fallback="true"]'),
  ).toBeVisible();
  await expect(fallbackPage.locator('[data-scene-host] img')).toBeVisible();
  await noWebgl.close();
});

test('pricing remains a draft and offers no checkout', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/en/pricing');
  await waitForClientReady(page);
  await expect(page.getByRole('heading', { name: 'A clear view of the plan.' })).toBeVisible();
  await expect(page.getByText(/Draft v1 · not for purchase · no payment is taken\./)).toBeVisible();
  await expect(page.getByText('Monthly price: TBD').first()).toBeVisible();
  await expect(page.getByRole('button', { name: /checkout|subscribe|buy now/i })).toHaveCount(0);
  await page.getByRole('button', { name: 'Annual' }).click();
  await expect(page.getByText('Draft view · annual')).toBeVisible();
  await mkdir(evidenceDir, { recursive: true });
  await page.screenshot({ path: `${evidenceDir}/pricing.png` });
});

test('account page does not invent a user identity or connected account data', async ({ page }) => {
  await page.goto('/en/account');
  await waitForClientReady(page);
  await expect(page.getByRole('heading', { name: 'Your SmartBau account' })).toBeVisible();
  await expect(page.getByText('Not connected').first()).toBeVisible();
  await expect(page.getByText(/no connected identity or account data/i)).toBeVisible();
  await expect(page.getByText(/Credits/)).toBeVisible();
  await expect(page.getByText(/not available on this website/i)).toBeVisible();
});

test('newsletter form validates input and reports unavailable without success', async ({
  page,
}) => {
  await page.goto('/en/newsletter');
  await waitForClientReady(page);
  await page.getByRole('button', { name: 'Request subscription' }).click();
  await expect(page.locator('input[name="email"]')).toHaveJSProperty('validity.valid', false);
  await page.locator('input[name="email"]').fill('not-an-email');
  await expect(page.locator('input[name="email"]')).toHaveJSProperty('validity.valid', false);
  await page.locator('input[name="email"]').fill('qa@example.test');
  await page.getByRole('checkbox').check();
  const submitted = page.waitForResponse((response) => response.url().includes('/api/newsletter'));
  await page.getByRole('button', { name: 'Request subscription' }).click();
  expect((await submitted).status()).toBe(503);
  const feedback = page.locator('form [role="alert"]');
  await expect(feedback).toContainText('service is currently unavailable');
  await expect(feedback).not.toContainText('Check your email to confirm your subscription');
});

test('forms reject invalid submissions and API confirms no unavailable request was stored', async ({
  page,
}) => {
  await page.goto('/en/partners');
  await waitForClientReady(page);
  await expect(page.locator('form button[type="submit"]')).toHaveJSProperty('disabled', false);
  const response = await page.request.post('/api/inquiries', {
    data: { name: 'QA', email: 'qa@example.test', organisation: 'Test', message: 'Test inquiry' },
  });
  expect(response.status()).toBe(503);
  await expect(response.json()).resolves.toMatchObject({
    status: 'unavailable',
    code: 'integration_unavailable',
  });
  const invalid = await page.request.post('/api/newsletter', { data: { email: 'invalid' } });
  expect(invalid.status()).toBe(400);
});

test('showcase exposes only public examples, viewer loads on request, and unknown model is 404', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/en/showcase');
  await waitForClientReady(page);
  await expect(page.getByRole('heading', { name: 'Architecture you can explore.' })).toBeVisible();
  await expect(page.getByText(/Uploads are unavailable; no files are stored/i)).toBeVisible();
  await expect(page.getByText('Courtyard Pavilion')).toBeVisible();
  await mkdir(evidenceDir, { recursive: true });
  await page.screenshot({ path: `${evidenceDir}/showcase.png` });
  const openViewer = page.getByRole('button', { name: 'View in 3D' });
  await openViewer.click();
  const viewerDialog = page.getByRole('dialog', { name: 'Courtyard Pavilion' });
  await expect(viewerDialog).toBeVisible();
  await page.screenshot({ path: `${evidenceDir}/showcase-viewer.png` });
  await page.keyboard.press('Escape');
  await expect(viewerDialog).not.toBeVisible();
  await expect(openViewer).toBeFocused();
  const response = await page.request.get('/en/showcase/private-unlisted-model');
  expect(response.status()).toBe(404);
});

test('features page and configured/unconfigured studio destinations are honest', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/en/features');
  await waitForClientReady(page);
  await expect(
    page.getByRole('heading', { name: 'Tools for the way buildings come together.' }),
  ).toBeVisible();
  const featureJavascript = await page.evaluate(async () => {
    const urls = [
      ...new Set(performance.getEntriesByType('resource').map((entry) => entry.name)),
    ].filter(
      (url) => url.startsWith(location.origin) && url.includes('/_next/') && url.endsWith('.js'),
    );
    const chunks = await Promise.all(urls.map(async (url) => (await fetch(url)).text()));
    return chunks.join('\n');
  });
  expect(featureJavascript).not.toMatch(
    /TweenLite|TimelineLite|gsapVersions|WebGLRenderer|OrbitControls|GLTFLoader/,
  );
  await mkdir(evidenceDir, { recursive: true });
  await page.screenshot({ path: `${evidenceDir}/features.png` });
  await page.goto('/en');
  await waitForClientReady(page);
  const launch = page.getByRole('link', { name: /Open SmartBau/ }).first();
  await expect(launch).toHaveAttribute('href', '/en/account');
  await expect(launch).not.toHaveAttribute('target', '_blank');
});

test('all localized public routes return server-rendered HTML with the correct language', async ({
  page,
}) => {
  const slugs = [
    '',
    'features',
    'pricing',
    'updates',
    'roadmap',
    'newsletter',
    'newsletter/unsubscribe',
    'partners',
    'plugins',
    'plugins/drawing-automation',
    'plugins/open-data-exports',
    'plugins/team-workflows',
    'help',
    'showcase',
    'showcase/courtyard-pavilion',
    'account',
    'legal',
    'legal/privacy',
    'legal/terms',
    'legal/imprint',
  ];
  const checks = await Promise.all(
    (['en', 'de'] as const).flatMap((locale) =>
      slugs.map(async (slug) => {
        const path = `/${locale}${slug ? `/${slug}` : ''}`;
        const response = await page.request.get(path);
        const html = await response.text();
        return {
          locale,
          path,
          status: response.status(),
          html,
          contentType: response.headers()['content-type'],
        };
      }),
    ),
  );
  for (const result of checks) {
    expect(result.status, result.path).toBe(200);
    expect(result.contentType, result.path).toContain('text/html');
    expect(result.html, result.path).toContain(`<html lang="${result.locale}"`);
  }
});
