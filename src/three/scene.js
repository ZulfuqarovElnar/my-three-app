import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ObjectLoader } from 'three';

export async function initScene() {
  const canvas = document.getElementById('three-canvas');
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // ✅ İşığı JSON-dan yükləyirik
  try {
    const response = await fetch('lights/DirectionalLight.json');
    const lightJson = await response.json();

    const loader = new ObjectLoader();
    const lightObject = loader.parse(lightJson);
    scene.add(lightObject);

    console.log('İşıq uğurla əlavə edildi:', lightObject);
  } catch (error) {
    console.error('Işıq yüklənmədi:', error);
  }

  // ✅ GLB modelini yükləyirik
  const gltfLoader = new GLTFLoader();
  let model;
  gltfLoader.load(
    'models/SARI.glb',
    (gltf) => {
      model = gltf.scene;
      scene.add(model);
    },
    undefined,
    (error) => {
      console.error('Model yüklənmədi:', error);
    }
  );

  function animate() {
    requestAnimationFrame(animate);
    if (model) {
      model.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
