// plane.js

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Scene və Kamera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ObjectLoader
const objLoader = new THREE.ObjectLoader();

// Scene.json yüklə
objLoader.load(
  '/plane/Scene.json',
  (loadedScene) => {
    loadedScene.children.forEach((child) => scene.add(child));

    // Model (sari boz.glb.json) yüklə
    objLoader.load(
      '/plane/sari boz.glb.json',
      (model) => {
        scene.add(model);
        animate();
      },
      undefined,
      (err) => console.error('Model yüklənmə xətası:', err)
    );
  },
  undefined,
  (err) => console.error('Scene.json xətası:', err)
);

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
