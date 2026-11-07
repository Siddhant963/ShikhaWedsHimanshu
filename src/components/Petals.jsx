import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Lightweight 3D: a single InstancedMesh of drifting petals (gold + rose) that
// react subtly to the pointer. One draw call; geometry/material disposed on unmount.

const pointer = { x: 0, y: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
  }, { passive: true });
}

const GOLD = new THREE.Color('#e3c27a');
const ROSE = new THREE.Color('#e8a6a0');
const IVORY = new THREE.Color('#fff1d2');

function petalGeometry() {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(0.5, 0.2, 0.55, 0.9, 0, 1.2);
  s.bezierCurveTo(-0.55, 0.9, -0.5, 0.2, 0, 0);
  const g = new THREE.ShapeGeometry(s, 8);
  g.center();
  return g;
}

function PetalField({ count }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geometry = useMemo(petalGeometry, []);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false }), []);
  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 11,
        z: -4 + Math.random() * 6,
        s: 0.12 + Math.random() * 0.22,
        speed: 0.15 + Math.random() * 0.35,
        sway: 0.4 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 1.4,
      })),
    [count]
  );

  useEffect(() => {
    data.forEach((d, i) => {
      const r = Math.random();
      mesh.current.setColorAt(i, r < 0.5 ? GOLD : r < 0.82 ? ROSE : IVORY);
    });
    mesh.current.instanceColor.needsUpdate = true;
    return () => { geometry.dispose(); material.dispose(); };
  }, [data, geometry, material]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const px = pointer.x, py = pointer.y;
    const t = state.clock.elapsedTime;
    data.forEach((d, i) => {
      d.y -= d.speed * dt;
      if (d.y < -6) { d.y = 6; d.x = (Math.random() - 0.5) * 16; }
      const depth = (d.z + 4) / 6;
      dummy.position.set(
        d.x + Math.sin(t * d.sway + d.phase) * 0.6 + px * depth * 0.8,
        d.y + py * depth * 0.4,
        d.z
      );
      dummy.rotation.set(t * d.spin * 0.6 + d.phase, t * d.spin + px * 0.3, t * d.spin * 0.4);
      dummy.scale.setScalar(d.s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={mesh} args={[geometry, material, count]} frustumCulled={false} />;
}

export default function Petals({ count = 36, active = true }) {
  return (
    <Canvas
      className="petals-canvas"
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      frameloop={active ? 'always' : 'never'}
      aria-hidden="true"
    >
      <PetalField count={count} />
    </Canvas>
  );
}
