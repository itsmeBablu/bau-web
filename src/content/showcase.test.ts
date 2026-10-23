import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getShowcaseModel } from './showcase';

describe('showcase demonstration asset', () => {
  it('has a valid compact glTF 2.0 binary matching the public model entry', () => {
    const model = getShowcaseModel('courtyard-pavilion');
    expect(model).toBeDefined();
    const bytes = readFileSync(resolve(process.cwd(), 'public/models/courtyard-pavilion.glb'));
    expect(bytes.byteLength).toBe(37_924);
    expect(bytes.toString('ascii', 0, 4)).toBe('glTF');
    expect(bytes.readUInt32LE(4)).toBe(2);
    expect(bytes.readUInt32LE(8)).toBe(bytes.byteLength);
    const jsonLength = bytes.readUInt32LE(12);
    expect(bytes.toString('ascii', 16, 20)).toBe('JSON');
    const document = JSON.parse(bytes.toString('utf8', 20, 20 + jsonLength)) as {
      asset: { version: string };
      nodes: unknown[];
      materials: unknown[];
    };
    expect(document.asset.version).toBe('2.0');
    expect(document.nodes.length).toBeGreaterThanOrEqual(20);
    expect(document.materials.length).toBeGreaterThanOrEqual(3);
    expect(model?.attribution).toContain('CC0 1.0');
  });
});
