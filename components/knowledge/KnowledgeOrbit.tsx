"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function KnowledgeOrbit() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.72, 2),
      new THREE.MeshBasicMaterial({ color: 0x8bd7ff, wireframe: true, transparent: true, opacity: 0.7 })
    );
    group.add(core);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.43, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0x72caff, transparent: true, opacity: 0.1 })
    );
    group.add(glow);

    const rings: THREE.Mesh[] = [];
    const ringSpecs = [
      [2.0, 0.48, 0.15],
      [1.55, -0.7, 0.28],
      [2.45, 1.05, -0.18],
    ] as const;

    ringSpecs.forEach(([radius, tilt, speed], index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, index === 0 ? 0.008 : 0.006, 8, 96),
        new THREE.MeshBasicMaterial({ color: 0x8bd7ff, transparent: true, opacity: index === 0 ? 0.28 : 0.16 })
      );
      ring.rotation.x = tilt;
      ring.rotation.z = index * 0.8;
      ring.userData.speed = speed;
      group.add(ring);
      rings.push(ring);
    });

    const points = new THREE.Group();
    const labels = ["AI", "CODE", "SCIENCE", "CYBER", "TECH", "BUSINESS"];
    labels.forEach((label, index) => {
      const angle = (index / labels.length) * Math.PI * 2;
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xc9edff, transparent: true, opacity: 0.9 })
      );
      dot.position.set(Math.cos(angle) * 2.05, Math.sin(angle) * 0.92, Math.sin(angle) * 0.6);
      points.add(dot);
    });
    group.add(points);

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 260;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = 3.4 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.cos(phi);
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(
      starsGeometry,
      new THREE.PointsMaterial({ color: 0x9fdcff, size: 0.018, transparent: true, opacity: 0.42 })
    );
    scene.add(stars);

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    let frame = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.09;
      group.rotation.x = Math.sin(t * 0.22) * 0.08;
      core.rotation.x = t * 0.16;
      core.rotation.z = t * 0.11;
      rings.forEach((ring) => { ring.rotation.y += ring.userData.speed * 0.004; });
      points.rotation.y = -t * 0.045;
      stars.rotation.y = t * 0.012;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.dispose();
      core.geometry.dispose();
      (core.material as THREE.Material).dispose();
      glow.geometry.dispose();
      (glow.material as THREE.Material).dispose();
      rings.forEach((r) => { r.geometry.dispose(); (r.material as THREE.Material).dispose(); });
      starsGeometry.dispose();
      (stars.material as THREE.Material).dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} className="knowledge-orbit-3d" aria-label="A lightweight 3D constellation of Azka's interests" role="img" />;
}
