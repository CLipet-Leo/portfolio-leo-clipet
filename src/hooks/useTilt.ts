'use client';

import { useMotionValue, useSpring } from 'motion/react';
import { useCallback, useRef } from 'react';

const TILT_MAX = 10;

export function useTilt() {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(50);

  const rotateX = useSpring(rawX, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(rawY, { stiffness: 300, damping: 25 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      rawX.set(-dy * TILT_MAX);
      rawY.set(dx * TILT_MAX);
      lightX.set(((e.clientX - rect.left) / rect.width) * 100);
      lightY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [rawX, rawY, lightX, lightY],
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    lightX.set(50);
    lightY.set(50);
  }, [rawX, rawY, lightX, lightY]);

  return { ref, rotateX, rotateY, lightX, lightY, onMouseMove, onMouseLeave };
}
