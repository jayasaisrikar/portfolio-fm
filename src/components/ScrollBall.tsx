import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, useTransform } from 'motion/react';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

function createDiceTexture(number: number) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Base metal (warmer, slightly tarnished dark grey)
  ctx.fillStyle = '#555550';
  ctx.fillRect(0, 0, 512, 512);

  // Large tarnish blobs / Patina
  for(let i=0; i<15; i++) {
    ctx.beginPath();
    ctx.arc(Math.random()*512, Math.random()*512, Math.random()*150 + 50, 0, Math.PI*2);
    ctx.fillStyle = `rgba(30, 25, 10, ${Math.random()*0.15})`; // brownish/dark green tarnish
    ctx.fill();
  }

  // Small Dents / Pitting
  for(let i=0; i<120; i++) {
    ctx.beginPath();
    const r = Math.random() * 2.5 + 0.5;
    ctx.arc(Math.random()*512, Math.random()*512, r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(15, 15, 15, ${Math.random() * 0.8 + 0.2})`;
    ctx.fill();
  }

  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;

  // Add noise, scratches, and subtle imperfections
  for (let i = 0; i < data.length; i += 4) {
    let noise = (Math.random() - 0.5) * 35;
    
    // Vignette/Wear on edges
    const x = (i / 4) % 512;
    const y = Math.floor((i / 4) / 512);
    const dist = Math.sqrt(Math.pow(x - 256, 2) + Math.pow(y - 256, 2));
    if (dist > 180) {
      noise -= (dist - 180) * 0.8; // Darken edges more intensely
    }
    
    // Vertical / Horizontal brushed metal scratches
    if (Math.random() < 0.05) {
      if (Math.random() > 0.5) {
        noise -= (Math.random() * 30); // light horizontal scratch
      } else {
        noise += (Math.random() * 30); // dark horizontal
      }
    }

    // Apply noise with subtle color shifting (greenish/yellowish shift for tarnish)
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise * 0.95)); // slightly less green
    data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise * 0.85)); // less blue -> warmer
  }
  ctx.putImageData(imgData, 0, 0);

  // Draw dots (indented style)
  const drawDot = (x: number, y: number) => {
    // Outer shadow (engraved effect)
    ctx.beginPath();
    ctx.arc(x, y, 46, 0, Math.PI * 2);
    const grad = ctx.createLinearGradient(x-46, y-46, x+46, y+46);
    grad.addColorStop(0, 'rgba(10,10,10,0.95)');
    grad.addColorStop(1, 'rgba(50,50,50,0.85)');
    ctx.fillStyle = grad;
    ctx.fill();
    
    // Inner dark dot
    ctx.beginPath();
    ctx.arc(x, y, 38, 0, Math.PI * 2);
    ctx.fillStyle = '#080808';
    ctx.fill();
    
    // Highlight for the indent edge
    ctx.beginPath();
    ctx.arc(x - 6, y - 6, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(120,120,120,0.4)';
    ctx.fill();
    
    // Inner shadow depth
    ctx.beginPath();
    ctx.arc(x + 4, y + 4, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fill();
  };

  const center = 256;
  const offset = 120;

  if (number === 1 || number === 3 || number === 5) drawDot(center, center);
  if (number === 2 || number === 3 || number === 4 || number === 5 || number === 6) {
    drawDot(center - offset, center - offset);
    drawDot(center + offset, center + offset);
  }
  if (number === 4 || number === 5 || number === 6) {
    drawDot(center - offset, center + offset);
    drawDot(center + offset, center - offset);
  }
  if (number === 6) {
    drawDot(center - offset, center);
    drawDot(center + offset, center);
  }

  // Border edges
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, 500, 500);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const { scrollYProgress } = useScroll();
  
  // Create a transform that peaks in the middle of the page (Projects section)
  const projectFactor = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.6, 0.8],
    [0, 1, 1, 0]
  );

  const materials = useMemo(() => {
    return [
      createDiceTexture(1),
      createDiceTexture(6),
      createDiceTexture(2),
      createDiceTexture(5),
      createDiceTexture(3),
      createDiceTexture(4),
    ].map(tex => new THREE.MeshStandardMaterial({
      map: tex,
      bumpMap: tex,
      bumpScale: 0.025, // More pronounced imperfections for aged look
      metalness: 0.9,
      roughness: 0.45,  // Sheen variation (duller for aged metal)
    }));
  }, []);

  useFrame((state) => {
    const scroll = scrollYProgress.get();
    const pFactor = projectFactor.get();
    
    if (meshRef.current) {
      // Roll effect based on scroll
      meshRef.current.rotation.x = scroll * Math.PI * 4;
      meshRef.current.rotation.y = scroll * Math.PI * 6;
      
      // Constant slow rotation
      meshRef.current.rotation.z += 0.002;
      
      // Dynamic shape changing - morphing dimensions slightly based on scroll
      const distort = scroll * 0.2;
      const targetScaleX = 1.6 + Math.sin(scroll * Math.PI * 2) * distort + pFactor * 0.5;
      const targetScaleY = 1.6 + Math.cos(scroll * Math.PI * 2) * distort + pFactor * 0.5;
      const targetScaleZ = 1.6 + Math.sin(scroll * Math.PI * 3) * distort + pFactor * 0.5;
      
      meshRef.current.scale.lerp(new THREE.Vector3(targetScaleX, targetScaleY, targetScaleZ), 0.1);

      // Spiral motion mapping
      const targetY = 3.5 - (scroll * 7);
      const targetX = Math.sin(scroll * Math.PI * 3) * 3;
      const targetZ = Math.cos(scroll * Math.PI * 3) * 2;

      meshRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.1);

      // Color change based on scroll
      const baseColor = new THREE.Color("#666666"); // Steel metal
      const scrollColor = new THREE.Color("#E0FF00"); // Yellow/Lime accent
      
      (meshRef.current.material as THREE.MeshStandardMaterial[]).forEach(mat => {
        // Interpolate color directly using the scroll factor
        mat.color.lerpColors(baseColor, scrollColor, scroll * 0.8);
        mat.emissive = scrollColor;
        mat.emissiveIntensity = scroll * 0.4;
      });
    }
  });

  return (
    <Float floatIntensity={2} speed={2} rotationIntensity={1}>
      <mesh ref={meshRef} position={[0, 4, 0]} material={materials}>
        {/* We use rounded-looking box parameters if we want, or just a straight box, but let's stick to standard Box for faces */}
        <boxGeometry args={[1, 1, 1, 8, 8, 8]} />
      </mesh>
    </Float>
  );
}

export default function ScrollBall() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#E0FF00" />
        <AnimatedShape />
      </Canvas>
    </div>
  );
}
