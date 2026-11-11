'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

// Module-level constants — no new objects created on re-renders
const CAMERA = { position: [0, 0, 5.2] as [number, number, number], fov: 45 };
const CANVAS_STYLE = { background: 'transparent' } as const;
const RING1_ROTATION: [number, number, number] = [Math.PI / 2.6, 0, 0];
const RING2_ROTATION: [number, number, number] = [
  Math.PI / 1.7,
  0,
  Math.PI / 4.5,
];

// Tirées une seule fois au chargement du module : le rendu reste pur.
const PARTICLE_POSITIONS = (() => {
  const count = 140;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 2.7 + Math.random() * 1.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
  }
  return pos;
})();

function Scene() {
  const icoRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const wireMat = useRef<THREE.MeshBasicMaterial>(null);
  const trx = useRef(0);
  const tryY = useRef(0);

  const particles = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      'position',
      new THREE.BufferAttribute(PARTICLE_POSITIONS, 3),
    );
    return new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: 0x0072ec,
        size: 0.025,
        transparent: true,
        opacity: 0.4,
      }),
    );
  }, []);

  // Dispose imperatively created Three.js objects on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      particles.geometry.dispose();
      (particles.material as THREE.Material).dispose();
    };
  }, [particles]);

  // Read pointer directly from useFrame state — no useThree subscription needed
  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    trx.current += (pointer.x * 0.55 - trx.current) * 0.06;
    tryY.current += (pointer.y * 0.38 - tryY.current) * 0.06;

    if (icoRef.current) {
      icoRef.current.rotation.y = t * 0.28 + trx.current;
      icoRef.current.rotation.x = t * 0.14 + tryY.current;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.11 + trx.current * 0.45;
      outerRef.current.rotation.x = t * 0.07 + tryY.current * 0.45;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.22;
    if (ring2Ref.current) ring2Ref.current.rotation.y = t * 0.17;
    if (wireMat.current) {
      wireMat.current.opacity = 0.48 + Math.sin(t * 1.1) * 0.07;
    }
  });

  return (
    <>
      {/* Inner solid — occludes back-facing edges */}
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#0a0d14" side={THREE.BackSide} />
      </mesh>

      {/* Primary wireframe icosahedron */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.02, 1]} />
        <meshBasicMaterial
          ref={wireMat}
          color="#0072ec"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Outer ghost shell — counter-rotates for depth */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.28, 1]} />
        <meshBasicMaterial
          color="#263044"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Ring 1 - primary */}
      <mesh ref={ring1Ref} rotation={RING1_ROTATION}>
        <torusGeometry args={[1.4, 0.007, 4, 90]} />
        <meshBasicMaterial color="#0072ec" transparent opacity={0.18} />
      </mesh>

      {/* Ring 2 - foreground */}
      <mesh ref={ring2Ref} rotation={RING2_ROTATION}>
        <torusGeometry args={[1.5, 0.007, 4, 90]} />
        <meshBasicMaterial color="#e4eaf4" transparent opacity={0.1} />
      </mesh>

      {/* Floating particle cloud */}
      <primitive object={particles} />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas camera={CAMERA} style={CANVAS_STYLE}>
      <Scene />
    </Canvas>
  );
}
