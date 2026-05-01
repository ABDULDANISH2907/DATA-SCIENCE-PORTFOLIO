import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

// Deterministic pseudo-random generator (seeded by index)
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface ShapeProps {
  position: [number, number, number];
  rotationSpeed: [number, number, number];
  floatSpeed: number;
  floatAmp: number;
  color: string;
  type: 'icosahedron' | 'torus' | 'box';
  scale?: number;
  floatOffset: number;
}

function FloatingShape({
  position,
  rotationSpeed,
  floatSpeed,
  floatAmp,
  color,
  type,
  scale = 1,
  floatOffset,
}: ShapeProps) {
  const ref = useRef<THREE.Group>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x += rotationSpeed[0] * 0.01;
    ref.current.rotation.y += rotationSpeed[1] * 0.01;
    ref.current.rotation.z += rotationSpeed[2] * 0.01;
    ref.current.position.y = initialY + Math.sin(t * floatSpeed + floatOffset) * floatAmp;
  });

  const geom = useMemo(() => {
    switch (type) {
      case 'torus':
        return <Torus args={[0.5, 0.2, 8, 24]} />;
      case 'box':
        return <Box args={[0.8, 0.8, 0.8]} />;
      default:
        return <Icosahedron args={[0.6, 0]} />;
    }
  }, [type]);

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        {geom}
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

interface FloatingShapesProps {
  count?: number;
  colors?: string[];
  seed?: number;
}

function Scene({ count = 5, colors = ['#05d9e8', '#ff2a6d', '#05d9e8'], seed = 42 }: FloatingShapesProps) {
  const shapes = useMemo(() => {
    const types: Array<'icosahedron' | 'torus' | 'box'> = ['icosahedron', 'torus', 'box'];
    return Array.from({ length: count }, (_, i) => {
      const r = seededRandom(seed + i * 997);
      return {
        position: [
          (r() - 0.5) * 8,
          (r() - 0.5) * 4,
          (r() - 0.5) * 3 - 2,
        ] as [number, number, number],
        rotationSpeed: [
          r() * 0.5 + 0.2,
          r() * 0.5 + 0.2,
          r() * 0.3,
        ] as [number, number, number],
        floatSpeed: r() * 0.8 + 0.4,
        floatAmp: r() * 0.4 + 0.2,
        floatOffset: r() * Math.PI * 2,
        color: colors[i % colors.length],
        type: types[i % types.length],
        scale: r() * 0.5 + 0.6,
      };
    });
  }, [count, colors, seed]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} />
      ))}
    </>
  );
}

export default function FloatingShapes({ count = 5, colors, seed = 42 }: FloatingShapesProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        dpr={[1, 1.2]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false }}
      >
        <Scene count={count} colors={colors} seed={seed} />
      </Canvas>
    </div>
  );
}

