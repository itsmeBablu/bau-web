import { describe, expect, it } from 'vitest';
import { isLocale } from '@/lib/i18n';
import { getAppLink, readPublicUrl } from '@/lib/config';
import { pricingConfig } from '@/content/pricing';

describe('public integration and locale contracts', () => {
  it('accepts only supported locales', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('de')).toBe(true);
    expect(isLocale('fr')).toBe(false);
  });

  it('uses a safe localized account destination when the studio is not configured', () => {
    expect(getAppLink('en')).toBe('/en/account');
    expect(getAppLink('de')).toBe('/de/account');
    expect(readPublicUrl('javascript:alert(1)')).toBeNull();
    expect(readPublicUrl('https://person:secret@studio.example')).toBeNull();
  });

  it('keeps the pricing contract explicitly draft with no published amounts', () => {
    expect(pricingConfig.status).toBe('draft');
    expect(pricingConfig.currency).toBeNull();
    expect(pricingConfig.plans.length).toBeGreaterThan(0);
    for (const plan of pricingConfig.plans) {
      expect(plan.monthly).toBeNull();
      expect(plan.annual).toBeNull();
    }
  });
});
