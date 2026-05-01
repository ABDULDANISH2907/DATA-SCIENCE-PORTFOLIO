import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MorphingSphereScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.IcosahedronGeometry>(null);

  const originalPositions = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.2, 4);
    return geo.attributes.position.array.slice();
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !geoRef.current) return;
    const t = state.clock.elapsedTime;

    const positions = geoRef.current.attributes.position;
    const arr = positions.array as Float32Array;

    for (let i = 0; i < arr.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];
      const z = originalPositions[i + 2];
      const noise =
        Math.sin(x * 2 + t * 0.8) *
        Math.cos(y * 2 + t * 0.6) *
        Math.sin(z * 2 + t * 0.4);
      const scale = 1 + noise * 0.12;
      arr[i] = x * scale;
      arr[i + 1] = y * scale;
      arr[i + 2] = z * scale;
    }
    positions.needsUpdate = true;

    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#05d9e8" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#ff2a6d" />
      <mesh ref={meshRef}>
        <icosahedronGeometry ref={geoRef} args={[1.2, 4]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#05d9e8"
          emissiveIntensity={0.15}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </>
  );
}

export default function MorphingSphere() {
  return (
    <div className="w-full h-[220px] md:h-[280px]">
      <Canvas
        dpr={[1, 1.2]}
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        gl={{ alpha: true, antialias: false }}
      >
        <MorphingSphereScene />
      </Canvas>
    </div>
  );
}

