'use client';

import { Center, Text3D } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

export function FloatingText({
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
}

export default function NotFoundScene() {
  const fontUrl = '/fonts/JetBrainsMono-Bold.json';

  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 45 }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <Center>
        <FloatingText text="404" fontUrl={fontUrl} />
      </Center>
    </Canvas>
  );
}
