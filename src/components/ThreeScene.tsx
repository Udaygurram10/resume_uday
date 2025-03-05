
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useTexture, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  rotationFactor?: number;
  size?: number;
}

const Shape = ({ position, color, speed = 1, rotationFactor = 1, size = 1 }: ShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 * speed) * 0.2 * rotationFactor;
    meshRef.current.rotation.y += 0.01 * speed;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1 * speed) * 0.1 * rotationFactor;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[size, 1]} />
      <meshPhysicalMaterial 
        color={color} 
        roughness={0.1} 
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transmission={0.2}
      />
    </mesh>
  );
};

const TorusKnot = ({ position, color, speed = 1, size = 1 }: ShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.005 * speed;
    meshRef.current.rotation.y += 0.01 * speed;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusKnotGeometry args={[size, size/3, 100, 16]} />
      <meshPhysicalMaterial 
        color={color} 
        roughness={0.1} 
        metalness={0.9}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <Float
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <group position={[0, 0, 0]}>
          <Shape position={[-2, 0, 0]} color="#04D9FF" speed={0.5} size={1.2} />
          <Shape position={[2, -0.5, -1]} color="#13BBC4" speed={0.7} rotationFactor={1.2} />
          <TorusKnot position={[0, 0.5, 0]} color="#0A4DAB" speed={0.3} size={1.5} />
        </group>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      <Environment preset="city" />
    </>
  );
};

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene = ({ className = "" }: ThreeSceneProps) => {
  return (
    <div className={`relative w-full h-full min-h-[400px] ${className}`}>
      <Canvas className="!touch-none">
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
