'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface JewelryHero3DProps {
  onSelectMetal?: (metal: string) => void;
}

export function JewelryHero3D({ onSelectMetal }: JewelryHero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMetal, setActiveMetal] = useState<'yellow' | 'rose' | 'white'>('yellow');
  const [isDragging, setIsDragging] = useState(false);
  const ringGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<{ gold: THREE.MeshPhysicalMaterial; diamond: THREE.MeshPhysicalMaterial } | null>(null);

  const metalColors = {
    yellow: { color: 0xd4af37, name: '22K Guinea Gold (গিনি সোনা)' },
    rose: { color: 0xc27a6e, name: '18K Rose Gold' },
    white: { color: 0xe6e7eb, name: 'Platinum White Gold' },
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ROOT JEWELRY GROUP
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);
    ringGroupRef.current = ringGroup;

    // MATERIALS
    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: metalColors.yellow.color,
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.03,
      ior: 2.417, // Authentic diamond IOR
      reflectivity: 0.95,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    materialsRef.current = { gold: goldMaterial, diamond: diamondMaterial };

    // 1. MAIN RING BAND (Torus)
    const bandGeometry = new THREE.TorusGeometry(2.2, 0.28, 36, 100);
    const bandMesh = new THREE.Mesh(bandGeometry, goldMaterial);
    bandMesh.rotation.x = Math.PI / 2.3;
    ringGroup.add(bandMesh);

    // 2. INNER COMFORT BEVEL
    const innerBandGeometry = new THREE.TorusGeometry(2.18, 0.22, 24, 80);
    const innerBandMesh = new THREE.Mesh(innerBandGeometry, goldMaterial);
    innerBandMesh.rotation.x = Math.PI / 2.3;
    ringGroup.add(innerBandMesh);

    // 3. PAVÉ ACCENT DIAMONDS (Micro-diamonds embedded along band)
    const paveCount = 18;
    const paveRadius = 2.2;
    const paveGeo = new THREE.OctahedronGeometry(0.09, 1);
    for (let i = 0; i < paveCount; i++) {
      const angle = (i / paveCount) * Math.PI * 0.7 - Math.PI * 0.35;
      const paveMesh = new THREE.Mesh(paveGeo, diamondMaterial);
      paveMesh.position.set(
        Math.cos(angle) * paveRadius,
        Math.sin(angle) * paveRadius * 0.4 + 0.1,
        Math.sin(angle) * 0.9 + 0.2
      );
      ringGroup.add(paveMesh);
    }

    // 4. CROWN / HEAD PRONGS (Holding the diamond solitaire)
    const crownGroup = new THREE.Group();
    crownGroup.position.set(0, 2.3, 0.45);
    ringGroup.add(crownGroup);

    const prongCount = 6;
    const prongHeight = 0.75;
    const prongGeo = new THREE.CylinderGeometry(0.05, 0.07, prongHeight, 16);
    for (let i = 0; i < prongCount; i++) {
      const angle = (i / prongCount) * Math.PI * 2;
      const prong = new THREE.Mesh(prongGeo, goldMaterial);
      const pr = 0.55;
      prong.position.set(Math.cos(angle) * pr, prongHeight / 2 - 0.15, Math.sin(angle) * pr);
      prong.rotation.z = Math.cos(angle) * 0.22;
      prong.rotation.x = -Math.sin(angle) * 0.22;
      crownGroup.add(prong);
    }

    // 5. CROWN BASE COLLAR
    const collarGeo = new THREE.TorusGeometry(0.5, 0.06, 16, 32);
    const collarMesh = new THREE.Mesh(collarGeo, goldMaterial);
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.y = 0.05;
    crownGroup.add(collarMesh);

    // 6. MAIN SOLITAIRE DIAMOND (Brilliant Gemstone Facets)
    const diamondGroup = new THREE.Group();
    diamondGroup.position.set(0, 2.58, 0.45);
    ringGroup.add(diamondGroup);

    // Upper Crown
    const diamondTopGeo = new THREE.ConeGeometry(0.72, 0.45, 12);
    const diamondTop = new THREE.Mesh(diamondTopGeo, diamondMaterial);
    diamondTop.rotation.x = Math.PI;
    diamondTop.position.y = 0.12;
    diamondGroup.add(diamondTop);

    // Lower Pavilion (faceted point)
    const diamondBottomGeo = new THREE.ConeGeometry(0.72, 0.65, 12);
    const diamondBottom = new THREE.Mesh(diamondBottomGeo, diamondMaterial);
    diamondBottom.position.y = -0.32;
    diamondGroup.add(diamondBottom);

    // Table Facet (top cap)
    const tableGeo = new THREE.CylinderGeometry(0.48, 0.72, 0.1, 12);
    const tableMesh = new THREE.Mesh(tableGeo, diamondMaterial);
    tableMesh.position.y = 0.15;
    diamondGroup.add(tableMesh);

    // 7. GOLDEN DUST & STARDUST PARTICLES
    const particleCount = 260;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      scales[i] = Math.random() * 0.04 + 0.01;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xe8c77b,
      size: 0.08,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // LIGHTING SETUP
    const ambientLight = new THREE.AmbientLight(0xfff7e8, 1.2);
    scene.add(ambientLight);

    // Key Light (Warm Luxury Gold)
    const keyLight = new THREE.DirectionalLight(0xfff1cf, 3.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    // Rim Light (Emerald & Cool White glint)
    const rimLight = new THREE.DirectionalLight(0xa5f3dc, 2.0);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    // Sparkle Point Light (Moves around the diamond)
    const sparkleLight = new THREE.PointLight(0xffffff, 4.5, 8);
    scene.add(sparkleLight);

    const goldGlowLight = new THREE.PointLight(0xd4af37, 2.5, 6);
    goldGlowLight.position.set(0, 0, 3);
    scene.add(goldGlowLight);

    // INTERACTION VARIABLES
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.35;
    let targetRotationY = -0.4;
    let isPointerDown = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isPointerDown = true;
      setIsDragging(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerX = clientX;
      previousPointerY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;

      if (isPointerDown) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        previousPointerX = clientX;
        previousPointerY = clientY;
      }
    };

    const handlePointerUp = () => {
      isPointerDown = false;
      setIsDragging(false);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domEl.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle auto-rotation when not dragging
      if (!isPointerDown) {
        targetRotationY += 0.0045;
        targetRotationX = 0.25 + Math.sin(elapsedTime * 0.8) * 0.12 + mouseY * 0.25;
      }

      // Smooth damping interpolation
      ringGroup.rotation.y += (targetRotationY - ringGroup.rotation.y) * 0.08;
      ringGroup.rotation.x += (targetRotationX - ringGroup.rotation.x) * 0.08;
      ringGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.15;

      // Orbiting sparkle point light
      sparkleLight.position.x = Math.sin(elapsedTime * 2.2) * 2.8;
      sparkleLight.position.y = 2.4 + Math.cos(elapsedTime * 2.2) * 1.5;
      sparkleLight.position.z = Math.cos(elapsedTime * 2.2) * 2.8 + 1.2;

      // Rotate particle dust
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domEl.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      if (domEl.parentNode) {
        domEl.parentNode.removeChild(domEl);
      }
      renderer.dispose();
    };
  }, []);

  const changeMetal = (metal: 'yellow' | 'rose' | 'white') => {
    setActiveMetal(metal);
    if (materialsRef.current) {
      materialsRef.current.gold.color.setHex(metalColors[metal].color);
      if (metal === 'white') {
        materialsRef.current.gold.roughness = 0.12;
        materialsRef.current.gold.metalness = 0.98;
      } else {
        materialsRef.current.gold.roughness = 0.18;
        materialsRef.current.gold.metalness = 0.95;
      }
    }
    onSelectMetal?.(metal);
  };

  return (
    <div className="relative w-full h-[480px] md:h-[620px] flex items-center justify-center select-none overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          isDragging ? 'scale-[1.01]' : 'scale-100'
        }`}
        style={{ touchAction: 'none' }}
      />

      {/* Floating 3D Sparkle Effect Highlights */}
      <div className="absolute top-1/4 right-1/4 pointer-events-none animate-ping opacity-30">
        <svg className="w-5 h-5 text-[#f5d77f]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
      <div className="absolute bottom-1/3 left-1/4 pointer-events-none animate-pulse opacity-40">
        <svg className="w-4 h-4 text-[#ffffff]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      {/* Interactive Controls Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5 w-auto max-w-[90%]">
        {/* Metal Finish Selector */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111]/80 backdrop-blur-md border border-[#c9a96e]/30 shadow-xl shadow-black/60">
          <button
            type="button"
            onClick={() => changeMetal('yellow')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeMetal === 'yellow'
                ? 'bg-[#c9a96e] text-black font-semibold shadow-md'
                : 'text-[#d4af37] hover:text-white'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] border border-black/30" />
            22K Guinea Gold
          </button>

          <button
            type="button"
            onClick={() => changeMetal('rose')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeMetal === 'rose'
                ? 'bg-[#c27a6e] text-black font-semibold shadow-md'
                : 'text-[#d99f94] hover:text-white'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#c27a6e] border border-black/30" />
            Rose Gold
          </button>

          <button
            type="button"
            onClick={() => changeMetal('white')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeMetal === 'white'
                ? 'bg-white text-black font-semibold shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#e6e7eb] border border-black/30" />
            Platinum
          </button>
        </div>

        {/* 3D Drag Hint Badge */}
        <div className="inline-flex items-center gap-1.5 text-[11px] text-[#a0a0a0] bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 tracking-wider">
          <svg className="w-3.5 h-3.5 text-[#c9a96e] animate-spin" style={{ animationDuration: '6s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Drag or move cursor to rotate in 3D</span>
        </div>
      </div>
    </div>
  );
}

