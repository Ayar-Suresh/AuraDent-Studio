"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function ToothShape() {
  const meshRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle auto-rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      // Interactive mouse follow
      const targetRotationX = (mouse.y * Math.PI) / 6;
      const targetRotationZ = -(mouse.x * Math.PI) / 6;
      
      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.08;
      meshRef.current.rotation.z += (targetRotationZ - meshRef.current.rotation.z) * 0.08;
    }
  });

  const toothGeometry = useMemo(() => {
    // Create a sphere geometry with high subdivision for smooth organic curves
    const geometry = new THREE.SphereGeometry(1.25, 80, 80);
    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      const x = vertex.x;
      const y = vertex.y;
      const z = vertex.z;
      const r_xz = Math.sqrt(x * x + z * z);
      const theta = Math.atan2(z, x);

      let nx = x;
      let ny = y;
      let nz = z;

      // Neck constriction is centered at y = -0.15
      const neckConstriction = 1.0 - 0.25 * Math.exp(-Math.pow(y + 0.15, 2) / 0.1);

      if (y > -0.15) {
        // CROWN SECTION
        const t_crown = (y + 0.15) / 1.4; // normalized 0 to 1

        // Squarish molar chewing surface outline
        const squarish = 1.0 + 0.09 * Math.cos(4 * theta);
        nx *= squarish * neckConstriction;
        nz *= squarish * neckConstriction;

        // Smooth crown bulge peaking in the middle
        const crownBulge = 1.0 + 0.14 * Math.sin(t_crown * Math.PI);
        nx *= crownBulge;
        nz *= crownBulge;

        // Occlusal Surface details (Cusps and Central Groove)
        if (y > 0.15) {
          const relativeHeight = Math.max(0, y - 0.15);
          // 4 distinct cusps (peaks) on the chewing surface corners
          const cuspStrength = 0.35 * Math.pow(r_xz / 1.25, 2) * relativeHeight;
          ny += cuspStrength * Math.cos(4 * theta);

          // Central depression (groove) in the center of the crown
          const centerDepression = 0.28 * (1.0 - Math.pow(r_xz / 1.25, 2)) * relativeHeight;
          ny -= centerDepression;
        }
      } else {
        // ROOT SECTION
        const t = Math.min(1.0, Math.abs(y + 0.15) / 1.1); // root progression 0 to 1

        // Neck constriction
        nx *= neckConstriction;
        nz *= neckConstriction;

        // Bifurcation: split roots along the X axis
        const rootSpread = 0.6 * Math.sin(t * Math.PI / 2);
        const distFromCenter = Math.abs(x);

        if (x > 0) {
          nx += rootSpread;
          // Taper the root tip
          nx -= (nx - rootSpread) * 0.52 * t;
        } else {
          nx -= rootSpread;
          // Taper the root tip
          nx -= (nx + rootSpread) * 0.52 * t;
        }

        // Taper roots along Z axis
        nz *= (1.0 - 0.52 * t);

        // Hollow out the bifurcation crotch on Z axis for organic look
        const zPinch = 1.0 - 0.75 * Math.exp(-Math.pow(distFromCenter, 2) / 0.08) * t;
        nz *= zPinch;

        // Curve the roots slightly inwards/outwards to look organic
        ny += 0.06 * Math.sin(t * Math.PI);
        nz += 0.06 * t;

        // Bifurcation arch: pull the center crotch upwards
        const archPull = 0.45 * Math.exp(-Math.pow(distFromCenter, 2) / 0.08) * t;
        ny += archPull;
      }

      positionAttribute.setXYZ(i, nx, ny, nz);
    }

    // Recompute normals for smooth reflections and lighting
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  return (
    <Float speed={2.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={meshRef} scale={1.85}>
        <mesh geometry={toothGeometry}>
          {/* Using native MeshPhysicalMaterial for beautiful glass-enamel rendering */}
          {/* This is extremely robust and avoids Drei's headless WebGL transmission fallback bugs */}
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.06}
            metalness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            transmission={0.65}
            thickness={1.6}
            ior={1.62} // Index of refraction of enamel
            sheen={0.4}
            sheenColor="#e0f2fe"
            specularIntensity={1.0}
            specularColor="#ffffff"
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function Tooth3D() {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.45} />
        {/* Balanced studio lighting */}
        <spotLight position={[8, 12, 10]} angle={0.25} penumbra={1} intensity={1.8} color="#ffffff" />
        <spotLight position={[-8, -10, -5]} angle={0.3} penumbra={1} intensity={0.8} color="#bae6fd" />
        <pointLight position={[0, 4, -4]} intensity={0.6} color="#38bdf8" />
        <pointLight position={[3, -3, 3]} intensity={0.4} color="#7dd3fc" />
        
        <ToothShape />
        
        <Sparkles count={50} scale={7} size={2} speed={0.3} opacity={0.6} color="#38bdf8" />
        
        <Environment preset="city" />
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.6} mipmapBlur intensity={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
