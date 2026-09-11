import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.8, 6.2);

    // 2. WebGL Renderer with capped pixel ratio for buttery 60fps & no lag
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.2);
    scene.add(ambientLight);

    // Main key light (cool white/cyan)
    const keyLight = new THREE.DirectionalLight(0x93c5fd, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Fill light (deep blue/violet)
    const fillLight = new THREE.DirectionalLight(0x6366f1, 1.8);
    fillLight.position.set(-5, 2, -2);
    scene.add(fillLight);

    // Cyan rim light from bottom
    const rimLight = new THREE.PointLight(0x38bdf8, 3.2, 10);
    rimLight.position.set(0, -2, 2);
    scene.add(rimLight);

    // Screen glow point light (glows from the monitor down onto keyboard deck as lid opens)
    const screenGlowLight = new THREE.PointLight(0x38bdf8, 0, 4);
    screenGlowLight.position.set(0, 0.8, -0.6);
    scene.add(screenGlowLight);

    // 4. Laptop Root Group
    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);

    // Position laptop slightly below center for optimal background composition
    laptopGroup.position.set(0, -0.2, 0);

    // Material Definitions
    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1d24,
      metalness: 0.88,
      roughness: 0.28,
    });

    const darkAluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d0f14,
      metalness: 0.92,
      roughness: 0.35,
    });

    const keyboardDeckMaterial = new THREE.MeshStandardMaterial({
      color: 0x111318,
      metalness: 0.6,
      roughness: 0.45,
    });

    const keyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e222d,
      metalness: 0.4,
      roughness: 0.3,
      emissive: 0x1e293b,
      emissiveIntensity: 0.2,
    });

    const keyAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.5,
      roughness: 0.2,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.4,
    });

    const trackpadMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c1f28,
      metalness: 0.7,
      roughness: 0.2,
    });

    // --- 4.A Laptop Base Chassis ---
    const baseWidth = 3.6;
    const baseDepth = 2.4;
    const baseHeight = 0.12;

    const baseGeometry = new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth);
    const baseMesh = new THREE.Mesh(baseGeometry, aluminumMaterial);
    baseMesh.position.set(0, 0, 0);
    laptopGroup.add(baseMesh);

    // Base bottom chamfer / bevel rim
    const bottomGeometry = new THREE.BoxGeometry(baseWidth * 0.96, baseHeight * 0.4, baseDepth * 0.96);
    const bottomMesh = new THREE.Mesh(bottomGeometry, darkAluminumMaterial);
    bottomMesh.position.set(0, -baseHeight * 0.6, 0);
    laptopGroup.add(bottomMesh);

    // Keyboard well indent
    const wellGeometry = new THREE.BoxGeometry(baseWidth * 0.88, 0.02, baseDepth * 0.54);
    const wellMesh = new THREE.Mesh(wellGeometry, keyboardDeckMaterial);
    wellMesh.position.set(0, baseHeight / 2 + 0.005, -0.3);
    laptopGroup.add(wellMesh);

    // Individual Keyboard Keys Grid
    const keyRows = 5;
    const keyCols = 14;
    const keyW = (baseWidth * 0.84) / keyCols;
    const keyD = (baseDepth * 0.48) / keyRows;
    const keyGap = 0.025;

    const keysGroup = new THREE.Group();
    keysGroup.position.set(0, baseHeight / 2 + 0.015, -0.3);

    for (let r = 0; r < keyRows; r++) {
      for (let c = 0; c < keyCols; c++) {
        const isSpace = r === keyRows - 1 && c >= 4 && c <= 9;
        if (isSpace && c !== 4) continue; // Single wide spacebar

        const widthMultiplier = isSpace ? 6.0 : 1.0;
        const kw = keyW * widthMultiplier - keyGap;
        const kd = keyD - keyGap;

        const kGeom = new THREE.BoxGeometry(kw, 0.025, kd);
        const isSpecialKey = (r === 0 && c === 0) || (r === 4 && (c === 0 || c === keyCols - 1));
        const kMesh = new THREE.Mesh(kGeom, isSpecialKey ? keyAccentMaterial : keyMaterial);

        const xPos = isSpace
          ? 0
          : (c - (keyCols - 1) / 2) * keyW;
        const zPos = (r - (keyRows - 1) / 2) * keyD;

        kMesh.position.set(xPos, 0, zPos);
        keysGroup.add(kMesh);
      }
    }
    laptopGroup.add(keysGroup);

    // Glass Trackpad
    const trackpadW = 1.35;
    const trackpadD = 0.85;
    const trackpadGeom = new THREE.BoxGeometry(trackpadW, 0.015, trackpadD);
    const trackpadMesh = new THREE.Mesh(trackpadGeom, trackpadMaterial);
    trackpadMesh.position.set(0, baseHeight / 2 + 0.006, 0.65);
    laptopGroup.add(trackpadMesh);

    // Front lid notch
    const notchGeom = new THREE.BoxGeometry(0.5, 0.04, 0.04);
    const notchMesh = new THREE.Mesh(notchGeom, darkAluminumMaterial);
    notchMesh.position.set(0, baseHeight / 2, baseDepth / 2 - 0.02);
    laptopGroup.add(notchMesh);

    // --- 4.B Laptop Screen / Lid Assembly (Rotates on Hinge) ---
    const hingeGroup = new THREE.Group();
    hingeGroup.position.set(0, baseHeight / 2, -baseDepth / 2 + 0.08);
    laptopGroup.add(hingeGroup);

    // Hinge cylinder
    const hingeGeom = new THREE.CylinderGeometry(0.04, 0.04, baseWidth * 0.88, 16);
    hingeGeom.rotateZ(Math.PI / 2);
    const hingeMesh = new THREE.Mesh(hingeGeom, darkAluminumMaterial);
    hingeMesh.position.set(0, 0, 0);
    hingeGroup.add(hingeMesh);

    const lidHeight = 2.35;
    const lidThickness = 0.07;

    const lidPivot = new THREE.Group();
    hingeGroup.add(lidPivot);

    // Lid open/close angle constants
    // CLOSED: ~88 degrees forward (+1.54 rad), resting flush on top of the keyboard base
    // OPEN: -0.28 rad (~106 degrees open), smoothly rising through the 90° L-shape and pressing to the back a little at the end
    const CLOSED_LID_ANGLE = Math.PI * 0.49;
    const OPEN_LID_ANGLE = -0.28;

    // Start with laptop completely closed
    lidPivot.rotation.x = CLOSED_LID_ANGLE;

    // Metallic back lid
    const lidBackGeom = new THREE.BoxGeometry(baseWidth, lidHeight, lidThickness);
    const lidBackMesh = new THREE.Mesh(lidBackGeom, aluminumMaterial);
    lidBackMesh.position.set(0, lidHeight / 2, -lidThickness / 2);
    lidPivot.add(lidBackMesh);

    // Glowing Tsmak Tech Logo on back of lid (visible on top when laptop is closed)
    const logoGeom = new THREE.CircleGeometry(0.18, 24);
    const logoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const logoMesh = new THREE.Mesh(logoGeom, logoMat);
    logoMesh.position.set(0, lidHeight / 2, -lidThickness - 0.002);
    logoMesh.rotation.y = Math.PI;
    lidPivot.add(logoMesh);

    // Outer cyber ring around logo
    const logoRingGeom = new THREE.RingGeometry(0.22, 0.245, 32);
    const logoRingMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });
    const logoRingMesh = new THREE.Mesh(logoRingGeom, logoRingMat);
    logoRingMesh.position.set(0, lidHeight / 2, -lidThickness - 0.002);
    logoRingMesh.rotation.y = Math.PI;
    lidPivot.add(logoRingMesh);

    // Screen bezel (front)
    const bezelGeom = new THREE.BoxGeometry(baseWidth * 0.98, lidHeight * 0.98, 0.02);
    const bezelMesh = new THREE.Mesh(bezelGeom, darkAluminumMaterial);
    bezelMesh.position.set(0, lidHeight / 2, 0.01);
    lidPivot.add(bezelMesh);

    // Webcam dot
    const camGeom = new THREE.CircleGeometry(0.02, 16);
    const camMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const camMesh = new THREE.Mesh(camGeom, camMat);
    camMesh.position.set(0, lidHeight - 0.06, 0.022);
    lidPivot.add(camMesh);

    // Dynamic High-Tech Canvas Texture for the Display
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 680;
    const screenCtx = screenCanvas.getContext('2d')!;

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;

    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });

    const screenGeom = new THREE.PlaneGeometry(baseWidth * 0.92, lidHeight * 0.88);
    const screenMesh = new THREE.Mesh(screenGeom, screenMaterial);
    screenMesh.position.set(0, lidHeight / 2 - 0.02, 0.023);
    lidPivot.add(screenMesh);

    // Draw IDE Screen Content
    const drawScreenContent = (time: number) => {
      screenCtx.fillStyle = '#0a0d14';
      screenCtx.fillRect(0, 0, 1024, 680);

      // Top Window Header / Tabs
      screenCtx.fillStyle = '#111520';
      screenCtx.fillRect(0, 0, 1024, 48);

      // Window Control Dots
      screenCtx.fillStyle = '#ef4444';
      screenCtx.beginPath();
      screenCtx.arc(28, 24, 6, 0, Math.PI * 2);
      screenCtx.fill();

      screenCtx.fillStyle = '#eab308';
      screenCtx.beginPath();
      screenCtx.arc(50, 24, 6, 0, Math.PI * 2);
      screenCtx.fill();

      screenCtx.fillStyle = '#22c55e';
      screenCtx.beginPath();
      screenCtx.arc(72, 24, 6, 0, Math.PI * 2);
      screenCtx.fill();

      // Active Editor Tab
      screenCtx.fillStyle = '#171e2e';
      screenCtx.fillRect(100, 8, 220, 40);
      screenCtx.fillStyle = '#38bdf8';
      screenCtx.font = 'bold 15px "Courier New", monospace';
      screenCtx.fillText('QuantumEngine.ts', 125, 33);

      // Secondary Tab
      screenCtx.fillStyle = '#64748b';
      screenCtx.font = '14px "Courier New", monospace';
      screenCtx.fillText('TsmakCluster.rs', 350, 33);
      screenCtx.fillText('AppRouter.tsx', 510, 33);

      // Breadcrumb Bar
      screenCtx.fillStyle = '#0f1422';
      screenCtx.fillRect(0, 48, 1024, 32);
      screenCtx.fillStyle = '#94a3b8';
      screenCtx.font = '13px "Courier New", monospace';
      screenCtx.fillText('src > core > distributed > neural-pipeline.ts', 24, 70);

      // Code Lines with Syntax Colors
      const codeLines = [
        { num: '01', type: 'comment', text: '// TSMAK TECH NEXT-GEN CLOUD INFRASTRUCTURE' },
        { num: '02', type: 'keyword', text: 'import { QuantumCore, NeuralCluster } from "@tsmak/studio";' },
        { num: '03', type: 'keyword', text: 'import { RealtimeSync, EdgeMesh } from "@tsmak/protocol";' },
        { num: '04', type: 'plain', text: '' },
        { num: '05', type: 'keyword', text: 'export async function bootHypervisor(): Promise<SystemCluster> {' },
        { num: '06', type: 'var', text: '  const studio = await QuantumCore.initialize({' },
        { num: '07', type: 'prop', text: '    architecture: "high-throughput-reactive",' },
        { num: '08', type: 'prop', text: '    redundancy: "active-active-failover",' },
        { num: '09', type: 'prop', text: '    latencyBudgetMs: 4.8,' },
        { num: '10', type: 'prop', text: '    security: "military-grade-aes256",' },
        { num: '11', type: 'var', text: '  });' },
        { num: '12', type: 'plain', text: '' },
        { num: '13', type: 'keyword', text: '  const nodes = await studio.deployEdgeWorkers([' },
        { num: '14', type: 'string', text: '    "frankfurt-eu-central", "virginia-us-east", "tokyo-ap-east"' },
        { num: '15', type: 'keyword', text: '  ]);' },
        { num: '16', type: 'plain', text: '' },
        { num: '17', type: 'keyword', text: '  return studio.connectStream({ telemetry: true });' },
        { num: '18', type: 'keyword', text: '}' },
      ];

      screenCtx.font = '16px "Courier New", monospace';
      let y = 110;

      for (let i = 0; i < codeLines.length; i++) {
        const item = codeLines[i];
        // Line number
        screenCtx.fillStyle = '#475569';
        screenCtx.fillText(item.num, 24, y);

        // Highlight
        if (item.type === 'comment') {
          screenCtx.fillStyle = '#64748b';
        } else if (item.type === 'keyword') {
          screenCtx.fillStyle = '#38bdf8';
        } else if (item.type === 'var') {
          screenCtx.fillStyle = '#f8fafc';
        } else if (item.type === 'prop') {
          screenCtx.fillStyle = '#93c5fd';
        } else if (item.type === 'string') {
          screenCtx.fillStyle = '#34d399';
        } else {
          screenCtx.fillStyle = '#cbd5e1';
        }

        screenCtx.fillText(item.text, 68, y);
        y += 26;
      }

      // Live Blinking Cursor on Active Line
      const cursorAlpha = (Math.sin(time * 6) + 1) * 0.5;
      screenCtx.fillStyle = `rgba(56, 189, 248, ${cursorAlpha})`;
      screenCtx.fillRect(525, 110 + 17 * 26 - 15, 9, 18);

      // Bottom Status / Telemetry Bar
      screenCtx.fillStyle = '#1e293b';
      screenCtx.fillRect(0, 642, 1024, 38);

      screenCtx.fillStyle = '#22c55e';
      screenCtx.beginPath();
      screenCtx.arc(24, 661, 5, 0, Math.PI * 2);
      screenCtx.fill();

      screenCtx.fillStyle = '#f8fafc';
      screenCtx.font = 'bold 13px "Courier New", monospace';
      screenCtx.fillText('TSMAK-STUDIO ACTIVE', 38, 666);

      screenCtx.fillStyle = '#94a3b8';
      screenCtx.font = '12px "Courier New", monospace';
      screenCtx.fillText('LATENCY: 4.2ms  •  FPS: 60.0  •  BRANCH: main', 220, 665);
      screenCtx.fillText('UTF-8  •  TypeScript  •  Cloud Run Edge', 710, 665);

      // Subtle cyber scanline sweep across screen
      const scanY = (time * 120) % 680;
      const grad = screenCtx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.08)');
      grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      screenCtx.fillStyle = grad;
      screenCtx.fillRect(0, scanY - 30, 1024, 60);

      screenTexture.needsUpdate = true;
    };

    // Initial screen render
    drawScreenContent(0);

    // --- 4.C Subtle Floating Holographic Elements around Laptop ---
    const holoRingGeom = new THREE.RingGeometry(2.8, 2.84, 64);
    const holoRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
    });
    const holoRing = new THREE.Mesh(holoRingGeom, holoRingMat);
    holoRing.rotation.x = Math.PI / 2;
    holoRing.position.set(0, -0.4, 0);
    scene.add(holoRing);

    const outerRingGeom = new THREE.RingGeometry(3.6, 3.63, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    });
    const outerRing = new THREE.Mesh(outerRingGeom, outerRingMat);
    outerRing.rotation.x = Math.PI / 2;
    outerRing.position.set(0, -0.45, 0);
    scene.add(outerRing);

    // Subtle floating tech particles around laptop
    const particleCount = 45;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
    });
    const particlePoints = new THREE.Points(particleGeom, particleMat);
    scene.add(particlePoints);

    // 5. Scroll & Mouse Tracking
    // Start with laptop completely closed and at the resting 3D angle
    let targetRotationY = -0.35;
    let targetRotationX = 0.22;
    let targetPositionY = -0.15;
    let targetLidAngle = CLOSED_LID_ANGLE;

    let currentRotationY = targetRotationY;
    let currentRotationX = targetRotationX;
    let currentPositionY = targetPositionY;
    let currentLidAngle = targetLidAngle;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates (-1 to 1)
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1000);
      const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // 1. Maintain exact 3D rotation, pitch, and parallax behavior as before
      targetRotationY = -0.35 + scrollProgress * 1.8;
      targetRotationX = 0.2 + Math.sin(scrollProgress * Math.PI * 2) * 0.15;
      targetPositionY = -0.15 - scrollProgress * 0.4;

      // 2. Progressive opening into an L-shape:
      // Calibrated to open much more slowly and gently across the scroll ("small small")
      // Reaches the crisp 90° perpendicular L-shape smoothly without rushing
      const openFactor = Math.min(Math.max(scrollProgress * 0.95, scrollY / 2200), 1);
      const smoothOpen = openFactor * openFactor * (3 - 2 * openFactor);
      targetLidAngle = CLOSED_LID_ANGLE + (OPEN_LID_ANGLE - CLOSED_LID_ANGLE) * smoothOpen;

      // 3. Screen glow illuminates as the lid opens
      screenGlowLight.intensity = smoothOpen * 2.4;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;

      // Adjust camera distance for mobile vs desktop for optimal framing
      if (width < 640) {
        camera.position.z = 7.8;
      } else if (width < 1024) {
        camera.position.z = 6.8;
      } else {
        camera.position.z = 5.8;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Initial sizing & sync state immediately
    handleResize();
    handleScroll();
    currentLidAngle = targetLidAngle;
    currentRotationY = targetRotationY;
    currentRotationX = targetRotationX;
    currentPositionY = targetPositionY;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // 6. Animation Loop
    let animationFrameId: number;
    let lastScreenUpdate = 0;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = time * 0.001;

      // Gentle continuous floating hover oscillation
      const floatHover = Math.sin(elapsed * 1.2) * 0.08;
      const tiltHover = Math.cos(elapsed * 0.9) * 0.03;

      // Smooth mouse influence
      const mouseInfluenceX = mouseX * 0.25;
      const mouseInfluenceY = mouseY * 0.18;

      // Smooth exponential lerp (prevents any sudden lag or jerkiness)
      currentRotationY += (targetRotationY + mouseInfluenceX + tiltHover - currentRotationY) * 0.05;
      currentRotationX += (targetRotationX - mouseInfluenceY - currentRotationX) * 0.05;
      currentPositionY += (targetPositionY + floatHover - currentPositionY) * 0.05;
      currentLidAngle += (targetLidAngle - currentLidAngle) * 0.038;

      laptopGroup.rotation.y = currentRotationY;
      laptopGroup.rotation.x = currentRotationX;
      laptopGroup.position.y = currentPositionY;

      lidPivot.rotation.x = currentLidAngle;

      // Slow orbital rotation of tech rings
      holoRing.rotation.z = elapsed * 0.15;
      outerRing.rotation.z = -elapsed * 0.1;

      // Update screen content periodically (every ~80ms) for smooth cursor & scanline without overloading canvas
      if (time - lastScreenUpdate > 75) {
        drawScreenContent(elapsed);
        lastScreenUpdate = time;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 7. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      renderer.dispose();
      baseGeometry.dispose();
      bottomGeometry.dispose();
      wellGeometry.dispose();
      trackpadGeom.dispose();
      notchGeom.dispose();
      hingeGeom.dispose();
      lidBackGeom.dispose();
      logoGeom.dispose();
      logoRingGeom.dispose();
      bezelGeom.dispose();
      camGeom.dispose();
      screenGeom.dispose();
      screenTexture.dispose();
      holoRingGeom.dispose();
      outerRingGeom.dispose();
      particleGeom.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep charcoal background canvas */}
      <div className="absolute inset-0 bg-[#07090e]" />

      {/* 3D Laptop WebGL Canvas Container with high visibility */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-95 transition-opacity duration-700"
        style={{ willChange: 'transform' }}
      />

      {/* Ambient breathing lighting gradients for depth and atmosphere */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[950px] h-[550px] pointer-events-none opacity-40 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37, 99, 235, 0.22) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 left-0 w-[550px] h-[550px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle at 10% 50%, rgba(37, 99, 235, 0.12) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute top-2/3 right-0 w-[600px] h-[600px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle at 90% 50%, rgba(37, 99, 235, 0.12) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
