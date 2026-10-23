'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Home.module.css';

type Props = { progress: number; label: string };

/** A small, deterministic architectural study model. It is isolated from the product CAD runtime. */
export default function ArchitecturalScene({ progress, label }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  const kickRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    progressRef.current = progress;
    hostRef.current?.setAttribute('data-scene-progress', progress.toFixed(2));
    hostRef.current?.setAttribute('data-scene-stage', String(Math.min(7, Math.floor(progress))));
    const storyHost = hostRef.current?.closest<HTMLElement>('[data-scene-host]');
    storyHost?.setAttribute('data-scene-progress', progress.toFixed(2));
    storyHost?.setAttribute('data-scene-stage', String(Math.min(7, Math.floor(progress))));
    kickRef.current?.();
  }, [progress]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    const mobileDetail = window.matchMedia('(max-width: 760px)').matches;
    host.dataset.sceneDetail = mobileDetail ? 'mobile' : 'full';
    const storyHost = host.closest<HTMLElement>('[data-scene-host]');
    if (storyHost) storyHost.dataset.sceneDetail = mobileDetail ? 'mobile' : 'full';
    if (reduce || saveData || !('WebGLRenderingContext' in window)) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !mobileDetail,
        powerPreference: 'low-power',
      });
    } catch {
      host.dataset.sceneFallback = 'true';
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobileDetail ? 1 : 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(9, 7, 10);
    camera.lookAt(0, 1.6, 0);
    scene.add(new THREE.HemisphereLight(0xeaf4f7, 0x343a42, 2.1));
    const key = new THREE.DirectionalLight(0xffffff, 3.1);
    key.position.set(-5, 9, 7);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fill.position.set(6, 3, -6);
    scene.add(fill);

    const model = new THREE.Group();
    scene.add(model);
    const mat = (color: number, roughness = 0.72, metalness = 0.05) =>
      new THREE.MeshStandardMaterial({ color, roughness, metalness });
    const concrete = mat(0xd9ddd8);
    const shadow = mat(0x53616a);
    const glass = new THREE.MeshStandardMaterial({
      color: 0x8eb9c4,
      roughness: 0.24,
      metalness: 0.1,
      transparent: true,
      opacity: 0.62,
    });
    const yellow = mat(0xfacc15, 0.4, 0.12);
    const blue = mat(0x38bdf8, 0.32, 0.22);
    const dark = mat(0x17212a);
    const makeBox = (
      parent: THREE.Group,
      size: [number, number, number],
      pos: [number, number, number],
      material: THREE.Material,
      name: string,
    ) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
      mesh.position.set(...pos);
      mesh.name = name;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };
    const floor = new THREE.Group();
    floor.name = 'floor';
    model.add(floor);
    makeBox(floor, [6.5, 0.18, 4.5], [0, 0, 0], concrete, 'slab');
    makeBox(floor, [6.5, 0.05, 4.5], [0, -0.12, 0], shadow, 'plinth');
    const walls = new THREE.Group();
    walls.name = 'walls';
    model.add(walls);
    makeBox(walls, [6.5, 3.2, 0.16], [0, 1.68, -2.17], concrete, 'rear-wall');
    makeBox(walls, [0.16, 3.2, 4.5], [-3.17, 1.68, 0], concrete, 'side-wall');
    makeBox(walls, [0.16, 3.2, 4.5], [3.17, 1.68, 0], concrete, 'glazed-edge');
    const glazing = new THREE.Group();
    glazing.name = 'glazing';
    model.add(glazing);
    makeBox(glazing, [0.045, 2.6, 4.1], [3.08, 1.72, 0], glass, 'glass-screen');
    for (const z of [-1.36, 0, 1.36])
      makeBox(glazing, [0.055, 2.75, 0.045], [3.04, 1.72, z], dark, `mullion-${z}`);
    const structure = new THREE.Group();
    structure.name = 'structure';
    model.add(structure);
    for (const x of [-2.9, 2.9])
      for (const z of [-1.9, 1.9])
        makeBox(structure, [0.15, 3.15, 0.15], [x, 1.68, z], shadow, `column-${x}-${z}`);
    makeBox(structure, [6.4, 0.16, 0.16], [0, 3.2, -1.95], shadow, 'beam-rear');
    const roof = new THREE.Group();
    roof.name = 'roof';
    model.add(roof);
    makeBox(roof, [6.65, 0.2, 4.7], [0, 3.42, 0], yellow, 'canopy');
    const systems = new THREE.Group();
    systems.name = 'systems';
    model.add(systems);
    const pipe = (a: THREE.Vector3, b: THREE.Vector3, radius: number, material: THREE.Material) => {
      const d = new THREE.Vector3().subVectors(b, a);
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, d.length(), mobileDetail ? 6 : 10),
        material,
      );
      mesh.position.copy(a).addScaledVector(d, 0.5);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
      mesh.name = 'service-run';
      systems.add(mesh);
    };
    pipe(new THREE.Vector3(-2.4, 2.95, -1.4), new THREE.Vector3(2.5, 2.95, -1.4), 0.065, blue);
    pipe(new THREE.Vector3(-2.4, 2.74, -1.4), new THREE.Vector3(-2.4, 2.74, 1.35), 0.045, yellow);
    pipe(new THREE.Vector3(0.8, 2.75, -1.4), new THREE.Vector3(0.8, 1.15, -1.4), 0.055, blue);
    const interior = new THREE.Group();
    interior.name = 'interior';
    model.add(interior);
    makeBox(interior, [1.5, 0.12, 0.72], [-0.55, 0.92, 0.05], yellow, 'worktable');
    for (const x of [-1.12, 0.02])
      makeBox(interior, [0.09, 0.88, 0.09], [x, 0.46, 0.05], dark, `table-leg-${x}`);
    makeBox(interior, [0.52, 0.72, 0.48], [1.75, 0.47, 0.55], concrete, 'cabinet');
    const trim = new THREE.Group();
    trim.name = 'presentation';
    model.add(trim);
    makeBox(trim, [0.018, 2.9, 4.14], [-3.08, 1.68, 0], yellow, 'section-highlight');
    const layers = [floor, walls, glazing, structure, roof, systems, interior, trim];
    const revealAt = [1, 1, 1, 2, 3, 4, 5, 6];
    layers.forEach((layer) => {
      layer.visible = false;
    });
    const site = new THREE.Group();
    site.name = 'site-grid';
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.24,
    });
    const gridStep = mobileDetail ? 1 : 0.5;
    for (let x = -4; x <= 4; x += gridStep) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, -0.22, -3.2),
        new THREE.Vector3(x, -0.22, 3.2),
      ]);
      site.add(new THREE.Line(geometry, gridMaterial));
    }
    for (let z = -3; z <= 3; z += gridStep) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-4, -0.22, z),
        new THREE.Vector3(4, -0.22, z),
      ]);
      site.add(new THREE.Line(geometry, gridMaterial));
    }
    const boundaryMaterial = new THREE.LineBasicMaterial({
      color: 0xfacc15,
      transparent: true,
      opacity: 0.8,
    });
    const boundaryPoints = [
      new THREE.Vector3(-3.8, -0.2, -2.8),
      new THREE.Vector3(3.8, -0.2, -2.8),
      new THREE.Vector3(3.8, -0.2, 2.8),
      new THREE.Vector3(-3.8, -0.2, 2.8),
      new THREE.Vector3(-3.8, -0.2, -2.8),
    ];
    site.add(
      new THREE.Line(new THREE.BufferGeometry().setFromPoints(boundaryPoints), boundaryMaterial),
    );
    model.add(site);

    let inView = false;
    let raf = 0;
    let shownProgress = progressRef.current;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const renderFrame = () => {
      if (!inView) {
        raf = 0;
        return;
      }
      const target = progressRef.current;
      const delta = target - shownProgress;
      if (Math.abs(delta) > 0.004) shownProgress += delta * 0.13;
      else shownProgress = target;
      for (let index = 0; index < layers.length; index += 1) {
        const layer = layers[index];
        const amount = clamp(shownProgress - revealAt[index] + 1);
        layer.visible = amount > 0.001;
        layer.scale.y = Math.max(0.015, amount);
        layer.position.y = (1 - amount) * 1.5;
      }
      site.visible = shownProgress < 2.8;
      const reveal = clamp(shownProgress - 6 + 1);
      key.intensity = 3.1 + reveal * 1.1;
      fill.intensity = 1.2 - reveal * 0.45;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.03 + reveal * 0.12;
      model.rotation.y = -0.06 * reveal;
      camera.position.set(9 - reveal * 0.65, 7 - reveal * 0.35, 10 - reveal * 0.5);
      camera.lookAt(0, 1.6, 0);
      renderer.render(scene, camera);
      if (Math.abs(target - shownProgress) > 0.004) raf = requestAnimationFrame(renderFrame);
      else raf = 0;
    };
    const kick = () => {
      if (!inView || raf) return;
      raf = requestAnimationFrame(renderFrame);
    };
    kickRef.current = kick;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) kick();
        else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(host);
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (width < 1 || height < 1) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    host.dataset.sceneReady = 'true';
    if (storyHost) storyHost.dataset.sceneReady = 'true';

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) mesh.material.forEach((material) => material.dispose());
        else mesh.material?.dispose();
      });
      kickRef.current = null;
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={styles.scene}
      data-scene-ready="false"
      data-scene-fallback="false"
      data-scene-progress="0.00"
      data-scene-stage="0"
      data-scene-detail="full"
      aria-hidden="true"
    >
      <span className={styles.sceneHint}>{label}</span>
    </div>
  );
}
