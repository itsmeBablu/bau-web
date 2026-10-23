'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import type { Locale } from '@/lib/i18n';
import type { ShowcaseModel } from '@/content/showcase';
import styles from './showcase.module.css';

type ViewerActions = {
  reset: () => void;
  orbit: (horizontal: number, vertical: number) => void;
  pan: (horizontal: number, vertical: number) => void;
  zoom: (factor: number) => void;
};

function disposeScene(root: THREE.Object3D) {
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.geometry.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      for (const value of Object.values(material))
        if (value instanceof THREE.Texture) value.dispose();
      material.dispose();
    }
  });
}

export function Viewer({
  locale,
  model,
  onClose,
}: {
  locale: Locale;
  model: ShowcaseModel;
  onClose: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const actions = useRef<ViewerActions | null>(null);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const de = locale === 'de';
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let messageTimer = 0;
    const fallback = (message: string) => {
      messageTimer = window.setTimeout(() => {
        if (!disposed) setError(message);
      }, 0);
    };
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    if (media.matches || saveData) {
      fallback(
        de
          ? 'Der interaktive Viewer ist wegen Ihrer Anzeigeeinstellungen pausiert. Das Vorschaubild bleibt verfügbar.'
          : 'The interactive viewer is paused because of your display settings. The preview image remains available.',
      );
      return () => {
        disposed = true;
        window.clearTimeout(messageTimer);
      };
    }
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
      });
    } catch {
      fallback(
        de
          ? 'WebGL ist nicht verfügbar. Das Vorschaubild bleibt verfügbar.'
          : 'WebGL is unavailable. The preview image remains available.',
      );
      return () => {
        disposed = true;
        window.clearTimeout(messageTimer);
      };
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(element.clientWidth, element.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    element.prepend(renderer.domElement);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#151c20');
    const camera = new THREE.PerspectiveCamera(
      35,
      element.clientWidth / Math.max(element.clientHeight, 1),
      0.1,
      100,
    );
    const initialPosition = new THREE.Vector3(9, 7, 10);
    camera.position.copy(initialPosition);
    scene.add(new THREE.HemisphereLight(0xe9f3ff, 0x55504a, 2.3));
    const key = new THREE.DirectionalLight(0xffe8bf, 3.2);
    key.position.set(-5, 9, 6);
    scene.add(key);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    const initialTarget = new THREE.Vector3(0, 0, 0);
    controls.target.copy(initialTarget);
    controls.minDistance = 5;
    controls.maxDistance = 22;
    controls.maxPolarAngle = Math.PI * 0.49;

    let animation = 0;
    const draw = () => {
      animation = 0;
      if (disposed || document.visibilityState === 'hidden') return;
      controls.update();
      renderer.render(scene, camera);
    };
    const scheduleDraw = () => {
      if (disposed || document.visibilityState === 'hidden' || animation) return;
      animation = window.requestAnimationFrame(draw);
    };
    const reset = () => {
      camera.position.copy(initialPosition);
      controls.target.copy(initialTarget);
      controls.update();
      scheduleDraw();
    };
    const orbit = (horizontal: number, vertical: number) => {
      const offset = camera.position.clone().sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);
      spherical.theta += horizontal;
      spherical.phi = THREE.MathUtils.clamp(spherical.phi + vertical, 0.18, Math.PI * 0.48);
      camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
      camera.lookAt(controls.target);
      controls.update();
      scheduleDraw();
    };
    const pan = (horizontal: number, vertical: number) => {
      const distance = camera.position.distanceTo(controls.target);
      const right = new THREE.Vector3()
        .setFromMatrixColumn(camera.matrixWorld, 0)
        .multiplyScalar(horizontal * distance * 0.045);
      const up = new THREE.Vector3()
        .setFromMatrixColumn(camera.matrixWorld, 1)
        .multiplyScalar(vertical * distance * 0.045);
      const shift = right.add(up);
      camera.position.add(shift);
      controls.target.add(shift);
      controls.update();
      scheduleDraw();
    };
    const zoom = (factor: number) => {
      camera.position
        .copy(controls.target)
        .add(camera.position.clone().sub(controls.target).multiplyScalar(factor));
      controls.update();
      scheduleDraw();
    };
    actions.current = { reset, orbit, pan, zoom };
    controls.addEventListener('change', scheduleDraw);

    const loader = new GLTFLoader();
    loader.load(
      model.file,
      (gltf) => {
        if (disposed) {
          disposeScene(gltf.scene);
          return;
        }
        scene.add(gltf.scene);
        const bounds = new THREE.Box3().setFromObject(gltf.scene);
        const center = bounds.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center);
        controls.target.copy(initialTarget);
        controls.update();
        setReady(true);
        scheduleDraw();
      },
      undefined,
      () => {
        if (!disposed)
          setError(
            de
              ? 'Das Modell konnte nicht geladen werden. Bitte laden Sie die Seite erneut.'
              : 'The model could not be loaded. Please reload the page.',
          );
      },
    );
    const resize = () => {
      if (!element.clientWidth || !element.clientHeight) return;
      camera.aspect = element.clientWidth / element.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(element.clientWidth, element.clientHeight);
      scheduleDraw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        window.cancelAnimationFrame(animation);
        animation = 0;
      } else scheduleDraw();
    };
    document.addEventListener('visibilitychange', onVisibility);
    scheduleDraw();
    return () => {
      disposed = true;
      window.clearTimeout(messageTimer);
      window.cancelAnimationFrame(animation);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
      controls.removeEventListener('change', scheduleDraw);
      controls.dispose();
      actions.current = null;
      disposeScene(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [model, de]);

  async function fullscreen() {
    const el = host.current?.parentElement;
    if (!el) return;
    try {
      if (!document.fullscreenElement) await el.requestFullscreen();
      else await document.exitFullscreen();
    } catch {
      setError(
        de
          ? 'Vollbild ist in diesem Browser nicht verfügbar.'
          : 'Fullscreen is unavailable in this browser.',
      );
    }
  }
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const action = actions.current;
    if (!action) return;
    const step = 0.18;
    switch (event.key) {
      case 'ArrowLeft':
        action.orbit(-step, 0);
        break;
      case 'ArrowRight':
        action.orbit(step, 0);
        break;
      case 'ArrowUp':
        action.orbit(0, -step);
        break;
      case 'ArrowDown':
        action.orbit(0, step);
        break;
      case '+':
      case '=':
        action.zoom(0.85);
        break;
      case '-':
        action.zoom(1.18);
        break;
      case 'a':
      case 'A':
        action.pan(-1, 0);
        break;
      case 'd':
      case 'D':
        action.pan(1, 0);
        break;
      case 'w':
      case 'W':
        action.pan(0, 1);
        break;
      case 's':
      case 'S':
        action.pan(0, -1);
        break;
      case 'Home':
        action.reset();
        break;
      default:
        return;
    }
    event.preventDefault();
  }
  return (
    <div className={styles.viewerStage}>
      <div
        ref={host}
        className={styles.canvas}
        role="region"
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label={
          de
            ? 'Interaktives 3D-Modell. Pfeiltasten drehen, W A S D verschieben, Plus und Minus zoomen, Home setzt die Ansicht zurück.'
            : 'Interactive 3D model. Arrow keys orbit, W A S D pan, plus and minus zoom, Home resets the view.'
        }
      />
      {!ready && !error && (
        <p className={styles.viewerMessage}>{de ? 'Modell wird geladen …' : 'Loading model…'}</p>
      )}
      {error && (
        <>
          <Image
            className={styles.fallbackPoster}
            src={model.poster}
            alt={
              de
                ? 'Architekturillustration des Hofpavillons'
                : 'Architectural illustration of the courtyard pavilion'
            }
            fill
            sizes="100vw"
          />
          <p className={styles.viewerMessage} role="status">
            {error}
          </p>
        </>
      )}
      <div className={styles.controls} aria-label={de ? 'Modellsteuerung' : 'Model controls'}>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => actions.current?.orbit(-0.2, 0)}
          aria-label={de ? 'Nach links drehen' : 'Orbit left'}
        >
          ↶ {de ? 'Links drehen' : 'Orbit left'}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => actions.current?.orbit(0.2, 0)}
          aria-label={de ? 'Nach rechts drehen' : 'Orbit right'}
        >
          ↷ {de ? 'Rechts drehen' : 'Orbit right'}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => actions.current?.orbit(0, -0.18)}
          aria-label={de ? 'Nach oben drehen' : 'Orbit up'}
        >
          ↑ {de ? 'Oben drehen' : 'Orbit up'}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => actions.current?.orbit(0, 0.18)}
          aria-label={de ? 'Nach unten drehen' : 'Orbit down'}
        >
          ↓ {de ? 'Unten drehen' : 'Orbit down'}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => actions.current?.zoom(0.85)}
          aria-label={de ? 'Vergrößern' : 'Zoom in'}
        >
          +
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => actions.current?.zoom(1.18)}
          aria-label={de ? 'Verkleinern' : 'Zoom out'}
        >
          −
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => actions.current?.pan(-1, 0)}
          aria-label={de ? 'Nach links verschieben' : 'Pan left'}
        >
          ← {de ? 'Links' : 'Pan left'}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => actions.current?.pan(1, 0)}
          aria-label={de ? 'Nach rechts verschieben' : 'Pan right'}
        >
          → {de ? 'Rechts' : 'Pan right'}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => actions.current?.pan(0, 1)}
          aria-label={de ? 'Nach oben verschieben' : 'Pan up'}
        >
          ↑ {de ? 'Oben' : 'Pan up'}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => actions.current?.pan(0, -1)}
          aria-label={de ? 'Nach unten verschieben' : 'Pan down'}
        >
          ↓ {de ? 'Unten' : 'Pan down'}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => actions.current?.reset()}
        >
          {de ? 'Zurücksetzen' : 'Reset view'}
        </button>
        <button className="button button-secondary" type="button" onClick={() => void fullscreen()}>
          {de ? 'Vollbild' : 'Fullscreen'}
        </button>
        <button className="button button-secondary" type="button" onClick={onClose}>
          {de ? 'Schließen' : 'Close'}
        </button>
      </div>
    </div>
  );
}
