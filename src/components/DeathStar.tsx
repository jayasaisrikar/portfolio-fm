import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../lib/useIsMobile';

function DeathStarGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const dishRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
    }
  });

  useEffect(() => {
    if (dishRef.current) {
      // Look away from center
      dishRef.current.lookAt(new THREE.Vector3(1.44 * 2, 1.44 * 2, 1.44 * 2));
    }
  }, []);

  const baseMat = new THREE.MeshStandardMaterial({
    color: '#080808',
    roughness: 0.8,
    metalness: 0.5,
  });

  const trenchMat = new THREE.MeshStandardMaterial({
    color: '#020202',
    roughness: 0.9,
    metalness: 0.8,
  });
  
  const laserMat = new THREE.MeshBasicMaterial({ color: '#ff0000' });

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0]}>
      {/* Top Hemisphere */}
      <mesh material={baseMat} position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2 - 0.02]} />
      </mesh>
      
      {/* Bottom Hemisphere */}
      <mesh material={baseMat} position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 64, 32, 0, Math.PI * 2, Math.PI / 2 + 0.02, Math.PI / 2]} />
      </mesh>

      {/* Holographic grid for 'GSAP/Framer Asset' vibe */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.52, 32, 16]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Trench */}
      <mesh material={trenchMat}>
        <cylinderGeometry args={[2.45, 2.45, 0.15, 64]} />
      </mesh>

      {/* Trench glow */}
      <mesh position={[0, 0, 0]}>
         <cylinderGeometry args={[2.48, 2.48, 0.02, 64]} />
         <meshBasicMaterial color="#ff0000" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Superlaser Dish */}
      {/* x,y,z = 1.44 gives radius 2.5 distance from origin */}
      <group ref={dishRef} position={[1.40, 1.40, 1.40]}>
        {/* Dark Circle acting as dish interior */}
        <mesh material={trenchMat} position={[0, 0, 0]}>
          <circleGeometry args={[0.7, 32]} />
        </mesh>
        
        {/* Central emitter hole */}
        <mesh material={new THREE.MeshBasicMaterial({ color: '#000000' })} position={[0, 0, 0.01]}>
          <circleGeometry args={[0.15, 32]} />
        </mesh>
        
        {/* Tiny laser glow */}
        <mesh material={laserMat} position={[0, 0, 0.02]}>
          <sphereGeometry args={[0.04, 8, 8]} />
        </mesh>

        {/* Dish Rings */}
        <mesh material={baseMat} position={[0, 0, 0.01]}>
          <torusGeometry args={[0.7, 0.04, 16, 32]} />
        </mesh>
        <mesh material={baseMat} position={[0, 0, 0.01]}>
          <torusGeometry args={[0.3, 0.02, 16, 32]} />
        </mesh>
        
        {/* Green laser buildup rays */}
        <mesh position={[0, 0, 0.03]} rotation={[0, 0, Math.PI / 3]}>
           <boxGeometry args={[0.6, 0.01, 0.01]} />
           <meshBasicMaterial color="#00ff00" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, 0, 0.03]} rotation={[0, 0, -Math.PI / 3]}>
           <boxGeometry args={[0.6, 0.01, 0.01]} />
           <meshBasicMaterial color="#00ff00" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, 0, 0.03]} rotation={[0, 0, Math.PI / 2]}>
           <boxGeometry args={[0.6, 0.01, 0.01]} />
           <meshBasicMaterial color="#00ff00" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </mesh>

      </group>
    </group>
  );
}

export default function DeathStar() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-radial-gradient" style={{ background: 'radial-gradient(ellipse at center, #00d4ff08 0%, transparent 70%)' }} />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 w-full h-full opacity-60 select-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
        <spotLight position={[-5, 5, -5]} intensity={3} color="#00d4ff" />
        <spotLight position={[5, -5, 5]} intensity={2} color="#ff0000" />
        
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <DeathStarGeometry />
        </Float>
      </Canvas>
    </div>
  );
}
