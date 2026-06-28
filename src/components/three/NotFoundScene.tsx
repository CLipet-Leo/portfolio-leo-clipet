'use client';

import { Center, Text3D } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { memo, Suspense, useRef } from 'react';
import { Mesh } from 'three';

// Module-level constants — no new objects created on re-renders
const CAMERA = { position: [0, 0, 12] as [number, number, number], fov: 45 };
const CANVAS_STYLE = {
  background: 'transparent',
  width: '100%',
  height: '100%',
} as const;
const LIGHT_POSITION: [number, number, number] = [5, 5, 5];
const FONT_URL = '/fonts/JetBrainsMono-Bold.json';

export const FloatingText = memo(function FloatingText({
  text,
  fontUrl,
}: {
  text: string;
  fontUrl: string;
}) {
  const textRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (!textRef.current) return;
    textRef.current.position.y = Math.sin(time * 0.7) * 0.25;
    textRef.current.position.x = Math.cos(time * 0.5) * 0.15;
  });

  return (
    <Text3D
      ref={textRef}
      font={fontUrl}
      size={6}
      height={0.5}
      curveSegments={12}
    >
      {text}
      <meshStandardMaterial
        color="#AFF33E"
        emissive="#AFF33E"
        emissiveIntensity={0.15}
      />
    </Text3D>
  );
});

export default function NotFoundScene() {
  return (
    <Canvas camera={CAMERA} style={CANVAS_STYLE}>
      <ambientLight intensity={0.6} />
      <directionalLight position={LIGHT_POSITION} intensity={1.5} />
      {/* Suspense required — Text3D loads the font file asynchronously */}
      <Suspense fallback={null}>
        <Center>
          <FloatingText text="404" fontUrl={FONT_URL} />
        </Center>
      </Suspense>
    </Canvas>
  );
}
