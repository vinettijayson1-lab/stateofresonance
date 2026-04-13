<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const container = ref<HTMLElement | null>(null);
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let composer: EffectComposer;

let outerShell: THREE.Mesh;
let innerCore: THREE.Mesh;
let particles: THREE.Points;
let requestID: number;

const mouse = { x: 0, y: 0 };
const target = { x: 0, y: 0 };

const handleMouseMove = (e: MouseEvent) => {
  mouse.x = (e.clientX - window.innerWidth / 2) / 100;
  mouse.y = (e.clientY - window.innerHeight / 2) / 100;
};

const init = () => {
  if (!container.value) return;

  // Scene & Camera
  scene = new THREE.Scene();
  // Deep space background to let bloom breathe
  scene.background = new THREE.Color(0x020202);

  camera = new THREE.PerspectiveCamera(60, container.value.clientWidth / container.value.clientHeight, 0.1, 1000);
  camera.position.z = 6;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // Important for physical lighting
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.value.appendChild(renderer.domElement);

  // -----------------------------------------------------
  // 1. OUTERSHELL: PBR Material (Refractive Glass/Quartz)
  // -----------------------------------------------------
  const shellGeo = new THREE.IcosahedronGeometry(2, 2);
  const shellMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.05,
    envMapIntensity: 1.0,
    transparent: true,
    opacity: 0.9,
    transmission: 0.98, // Glass-like transmission
    ior: 1.5, // Quartz IOR
    thickness: 1.5,
    side: THREE.DoubleSide
  });
  outerShell = new THREE.Mesh(shellGeo, shellMat);
  scene.add(outerShell);

  // -----------------------------------------------------
  // 2. INNER CORE: Plasma / Energy Source (Glowing Gold)
  // -----------------------------------------------------
  const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xffdd88, // Base warm yellow
    emissive: 0xffa500, // Emit orange/gold
    emissiveIntensity: 2.0,
    wireframe: true
  });
  innerCore = new THREE.Mesh(coreGeo, coreMat);
  scene.add(innerCore);

  // -----------------------------------------------------
  // 3. SURROUNDING FREQUENCY DUST (Particles)
  // -----------------------------------------------------
  const partGeom = new THREE.BufferGeometry();
  const partCount = 2000;
  const posArray = new Float32Array(partCount * 3);
  for (let i = 0; i < partCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
  }
  partGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const partMat = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xD4AF37,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  particles = new THREE.Points(partGeom, partMat);
  scene.add(particles);

  // -----------------------------------------------------
  // LIGHTING
  // -----------------------------------------------------
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  const mainLight = new THREE.PointLight(0xffdf00, 5, 20);
  mainLight.position.set(0, 0, 0); // Bursting from the center
  scene.add(mainLight);

  // -----------------------------------------------------
  // POST-PROCESSING: THE BLOOM COMETH
  // -----------------------------------------------------
  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,  // strength
    0.4,  // radius
    0.85  // threshold
  );
  
  composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  window.addEventListener('mousemove', handleMouseMove);
  animate();
};

const animate = () => {
  requestID = requestAnimationFrame(animate);
  const time = Date.now() * 0.001;

  // Smoothing mouse physics
  target.x += (mouse.x - target.x) * 0.02;
  target.y += (mouse.y - target.y) * 0.02;

  // Rotations
  outerShell.rotation.y = time * 0.15 + target.x * 0.4;
  outerShell.rotation.x = time * 0.10 + target.y * 0.3;

  // Inner core rotates aggressively backwards simulating counter-frequency
  innerCore.rotation.y = -time * 0.4;
  innerCore.rotation.z = time * 0.2;

  // Procedural Shimmer mapping
  const pulse = 1 + Math.sin(time * 3) * 0.03;
  innerCore.scale.set(pulse, pulse, pulse);

  particles.rotation.y = -time * 0.05;

  // Replace renderer.render with composer.render for Post-processing!
  composer.render();
};

const handleResize = () => {
  if (!container.value) return;
  camera.aspect = container.value.clientWidth / container.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  composer.setSize(container.value.clientWidth, container.value.clientHeight);
};

onMounted(() => {
  init();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('resize', handleResize);
  cancelAnimationFrame(requestID);
  
  // Hard cleanup to prevent Vue hot-reload memory leaks from WebGL
  geometryCleanup();
  renderer.dispose();
});

const geometryCleanup = () => {
    scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
            (object as THREE.Mesh).geometry.dispose();
            if ((object as THREE.Mesh).material instanceof THREE.Material) {
                ((object as THREE.Mesh).material as THREE.Material).dispose();
            }
        }
    });
}
</script>

<template>
  <div ref="container" class="omniscience-canvas-wrapper">
    <div class="canvas-overlay"></div>
  </div>
</template>

<style scoped>
.omniscience-canvas-wrapper {
  width: 100%;
  height: 500px;
  position: relative;
  cursor: grab;
  /* Dark backdrop to accentuate the bloom threshold */
  background-color: #020202;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.1);
}

.omniscience-canvas-wrapper:active {
  cursor: grabbing;
}

.canvas-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 30%, #020202 100%);
  pointer-events: none;
}
</style>
