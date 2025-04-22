import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

const CartModel = () => {
  const { scene } = useGLTF("/scene.gltf");
  const cartRef = useRef();

  useFrame(() => {
    if (cartRef.current) {
      cartRef.current.rotation.y += 0.01;
    }
  });

  return <primitive object={scene} ref={cartRef} scale={10} position={[0, -2, 0]} />; 
};

export default function ShoppingCart() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 5, 15] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls />
        <CartModel />
      </Canvas>
    </div>
  );
}
