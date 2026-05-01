import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

function Bar({
  position,
  height,
  color,
  delay,
}: {
  position: [number, number, number];
  height: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const scaleY = 1 + Math.sin(t * 1.5 + delay) * 0.25;
    ref.current.scale.y = Math.max(0.3, scaleY);
    ref.current.position.y = position[1] + (scaleY - 1) * height * 0.5;
  });

  return (
    <mesh ref={ref} position={position}>
      <Box args={[0.3, height, 0.3]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Box>
    </mesh>
  );
}

function DataCubeScene() {
  const bars = useMemo(
    () => [
      { pos: [-0.8, 0, 0] as [number, number, number], h: 1.2, color: '#05d9e8', delay: 0 },
      { pos: [-0.4, 0, 0] as [number, number, number], h: 1.8, color: '#05d9e8', delay: 0.8 },
      { pos: [0, 0, 0] as [number, number, number], h: 1.4, color: '#ff2a6d', delay: 1.6 },
      { pos: [0.4, 0, 0] as [number, number, number], h: 2.0, color: '#05d9e8', delay: 2.4 },
      { pos: [0.8, 0, 0] as [number, number, number], h: 1.6, color: '#05d9e8', delay: 3.2 },
    ],
    []
  );

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ff2a6d" />
      <group ref={groupRef}>
        {bars.map((b, i) => (
          <Bar key={i} position={b.pos} height={b.h} color={b.color} delay={b.delay} />
        ))}
        {/* Base platform */}
        <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3, 1.5]} />
          <meshStandardMaterial color="#111" transparent opacity={0.3} />
        </mesh>
      </group>
    </>
  );
}

export default function DataCube() {
  return (
    <div className="w-full h-[200px] md:h-[250px]">
      <Canvas
        dpr={[1, 1.2]}
        camera={{ position: [0, 1, 4], fov: 45 }}
        gl={{ alpha: true, antialias: false }}
      >
        <DataCubeScene />
      </Canvas>
    </div>
  );
}

