// HeroScene.tsx
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
// import { useMousePosition } from '@/hooks/useMousePosition';
import * as THREE from 'three';

function Icosahedron() {
  const ref = useRef<THREE.Mesh>(null);
  const mouse = useThree((state) => state.pointer);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.28 + mouse.x * 0.55;
    ref.current.rotation.x = t * 0.14 + mouse.y * 0.38;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.34, 1]} />
      <meshBasicMaterial color="#aff33e" wireframe />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      style={{ background: 'transparent' }}
    >
      <Icosahedron />
      <mesh rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[2.05, 0.007, 4, 90]} />
        <meshBasicMaterial color="#aff33e" transparent opacity={0.18} />
      </mesh>
    </Canvas>
  );
}
