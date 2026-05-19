import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useIsMobile } from '../lib/useIsMobile';

function VaderGeometry() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
      groupRef.current.rotation.x = Math.sin(t * 0.8) * 0.1;
    }
  });

  // Create a procedural noise map for imperfections
  const noiseMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d')!;
    for (let x = 0; x < 256; x++) {
      for (let y = 0; y < 256; y++) {
        const c = Math.floor(Math.random() * 255);
        context.fillStyle = `rgb(${c},${c},${c})`;
        context.fillRect(x, y, 1, 1);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, []);

  const blackGloss = new THREE.MeshPhysicalMaterial({
    color: '#080808',
    roughness: 0.15,
    metalness: 0.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.2,
    bumpMap: noiseMap,
    bumpScale: 0.001,
  });

  const blackMatte = new THREE.MeshPhysicalMaterial({
    color: '#050505',
    roughness: 0.8,
    metalness: 0.3,
    bumpMap: noiseMap,
    bumpScale: 0.005,
  });

  const lensMat = new THREE.MeshStandardMaterial({
    color: '#000000',
    roughness: 0.05,
    metalness: 0.9,
    emissive: '#ff0000',
    emissiveIntensity: 6.0, // High intensity for bloom
  });

  const silverMat = new THREE.MeshPhysicalMaterial({
    color: '#bbbbbb',
    roughness: 0.3,
    metalness: 0.9,
    clearcoat: 0.5,
  });

  return (
    <group ref={groupRef} dispose={null} scale={[1.8, 1.8, 1.8]} position={[0, -0.2, 0]}>
      {/* Dome */}
      <mesh material={blackGloss} position={[0, 1.2, -0.2]}>
        <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
      </mesh>
      
      {/* Dome flare (bottom edge of the helmet) */}
      <mesh material={blackGloss} position={[0, 0.7, -0.4]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[1.05, 1.3, 0.8, 32, 1, true, Math.PI * 0.75, Math.PI * 1.5]} />
      </mesh>
      
      {/* Face Mask Base */}
      <mesh material={blackMatte} position={[0, 0.4, 0.3]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[1.2, 1.2, 0.8]} />
      </mesh>

      {/* Eyes / Lenses */}
      {/* Left Eye */}
      <mesh material={lensMat} position={[-0.3, 0.65, 0.75]} rotation={[-0.1, -0.3, -0.1]}>
        <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
      </mesh>
      {/* Right Eye */}
      <mesh material={lensMat} position={[0.3, 0.65, 0.75]} rotation={[-0.1, 0.3, 0.1]}>
        <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
      </mesh>

      {/* Nose Bridge */}
      <mesh material={blackGloss} position={[0, 0.5, 0.8]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.3]} />
      </mesh>

      {/* Mouth grill area */}
      <mesh material={blackGloss} position={[0, 0.1, 0.8]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.5, 0.6, 0.4]} />
      </mesh>

      {/* Tusks / Silver pins */}
      <mesh material={silverMat} position={[-0.4, 0.1, 0.85]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2]} />
      </mesh>
      <mesh material={silverMat} position={[0.4, 0.1, 0.85]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2]} />
      </mesh>
    </group>
  );
}

export default function VaderHelmet() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="w-64 h-64 rounded-full bg-[#ff0000]/10 blur-[80px] absolute" />
        <div className="w-40 h-40 rounded-full bg-[#00d4ff]/10 blur-[60px] absolute" />
        <div className="text-[120px] select-none opacity-20">🎭</div>
      </div>
    );
  }
  return (
    <div className="w-full h-full relative cursor-move">
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.5 }}
        style={{ background: 'transparent' }}
      >
        <Stars radius={50} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={2} color="#ff0000" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <VaderGeometry />
        </Float>
        
        <Environment preset="city" />
        
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={2} />
        </EffectComposer>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
