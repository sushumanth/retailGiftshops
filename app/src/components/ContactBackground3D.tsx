import { memo, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import type { Mesh } from 'three';

function FloatingOrb({
  color,
  position,
  scale,
  speed,
}: {
  color: string;
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.x += delta * speed * 0.25;
    meshRef.current.rotation.y += delta * speed * 0.35;
  });

  return (
    <Float speed={speed} rotationIntensity={0.35} floatIntensity={0.7}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.35}
          roughness={0.25}
          transparent
          opacity={0.2}
          emissive={color}
          emissiveIntensity={0.08}
        />
      </mesh>
    </Float>
  );
}

function DustParticles() {
  const positions = useMemo(() => {
    const count = 90;
    const points = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      points[i * 3] = (Math.random() - 0.5) * 16;
      points[i * 3 + 1] = (Math.random() - 0.5) * 10;
      points[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }

    return points;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#D7C29A"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.25}
      />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2.5, 3.5, 2]} intensity={0.85} color="#ffffff" />
      <directionalLight position={[-3, -2, 1]} intensity={0.35} color="#F2C94C" />

      <group position={[0, 0, -1.5]}>
        <FloatingOrb color="#F2C94C" position={[-2.6, 1.5, -0.5]} scale={0.9} speed={0.9} />
        <FloatingOrb color="#A890FF" position={[2.4, -1.2, -0.8]} scale={1.1} speed={0.7} />
        <FloatingOrb color="#FFA07A" position={[0.8, 1.8, -1.1]} scale={0.65} speed={1.1} />

        <mesh position={[0.6, -1.8, -1.5]} rotation={[1.18, 0.2, 0]}>
          <torusGeometry args={[3.5, 0.035, 18, 100]} />
          <meshBasicMaterial color="#F2C94C" transparent opacity={0.2} />
        </mesh>
      </group>

      <DustParticles />
    </>
  );
}

function ContactBackground3DComponent() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.8], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#F6F6F2', 7, 16]} />
        <SceneContent />
      </Canvas>
    </div>
  );
}

export const ContactBackground3D = memo(ContactBackground3DComponent);
