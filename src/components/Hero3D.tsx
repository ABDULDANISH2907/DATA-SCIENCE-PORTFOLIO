import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BAR_COUNT = 36;
const GRID_SIZE = 6;
const SPACING = 1.2;

function DataBars() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const hoverRef = useRef({ x: 0, y: 0 });

  const { colors, initialHeights } = useMemo(() => {
    const c = new Float32Array(BAR_COUNT * 3);
    const h = new Float32Array(BAR_COUNT);
    const color1 = new THREE.Color('#05d9e8');
    const color2 = new THREE.Color('#ff2a6d');

    for (let i = 0; i < BAR_COUNT; i++) {
      const t = i / BAR_COUNT;
      const mixed = color1.clone().lerp(color2, t);
      c[i * 3] = mixed.r;
      c[i * 3 + 1] = mixed.g;
      c[i * 3 + 2] = mixed.b;
      // Deterministic pseudo-random based on index for stable renders
      const pseudoRandom = ((i * 9301 + 49297) % 233280) / 233280;
      h[i] = 0.5 + pseudoRandom * 2.5;
    }
    return { colors: c, initialHeights: h };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Smooth mouse follow
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 8;
    hoverRef.current.x += (targetX - hoverRef.current.x) * 0.05;
    hoverRef.current.y += (targetY - hoverRef.current.y) * 0.05;

    meshRef.current.rotation.y = hoverRef.current.x + time * 0.08;
    meshRef.current.rotation.x = hoverRef.current.y;

    let idx = 0;
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        const h =
          initialHeights[idx] +
          Math.sin(time * 1.2 + x * 0.5 + z * 0.3) * 0.3;
        dummy.position.set(
          (x - GRID_SIZE / 2) * SPACING,
          h / 2,
          (z - GRID_SIZE / 2) * SPACING
        );
        dummy.scale.set(0.6, h, 0.6);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, BAR_COUNT]}>
      <boxGeometry args={[1, 1, 1]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </boxGeometry>
      <meshStandardMaterial
        vertexColors
        metalness={0.6}
        roughness={0.2}
        emissive="#111111"
      />
    </instancedMesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#05d9e8" />
      <pointLight position={[5, -5, 5]} intensity={0.6} color="#ff2a6d" />
      <DataBars />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 6, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

