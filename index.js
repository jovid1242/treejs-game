import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const Ballloader = new GLTFLoader();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(1, 1, 5);
camera.lookAt(scene.position);
camera.position.y = 5;
camera.position.x = 3;
camera.position.z = 8;

// Loading textures
const Textureloader = new THREE.TextureLoader().load("/texture/fon.jpg"); // фон карта игру
const Cubeloader = new THREE.TextureLoader().load("/texture/brick.png");
const ironTexture = new THREE.TextureLoader().load("/texture/ball.png");

// Scene добавляем свет и фон
scene.background = Textureloader;
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(1, 1, 1.3);
scene.add(light);

const ballRadius = 0.7;
const g = new THREE.SphereGeometry(ballRadius, 32, 16);
const m = new THREE.MeshPhongMaterial({ map: ironTexture });
const ballMesh = new THREE.Mesh(g, m);
ballMesh.position.set(1, 1, ballRadius);
scene.add(ballMesh);

// Update camera and light positions.
camera.position.x += (ballMesh.position.x - camera.position.x) * 0.1;
camera.position.y += (ballMesh.position.y - camera.position.y) * 0.1;
camera.position.z += (13 - camera.position.z) * 0.1;
light.position.x = camera.position.x;
light.position.y = camera.position.y;
light.position.z = camera.position.z - 3.7;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function generateCube() {
  // cube
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  var material = new THREE.MeshPhongMaterial({ map: Cubeloader });
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.x = -0.2;
  cube.rotation.y = 1.6;
  cube.rotation.z = 0.3;
  scene.add(cube);
}

// управление мяча по кноку
function setupKeyLogger() {
  document.onkeydown = function (e) {
    console.log(e);
    switch (e.keyCode) {
      case 37:
        camera.rotation.z += 0.1;
        break;
      case 38:
        camera.rotation.x -= 0.1;
        break;
      case 39:
        camera.rotation.z -= 0.1;
        break;
      case 40:
        camera.rotation.x += 0.1;
        break;
    }
  };
}

// настраиваем камеру и рендерер, и отображаем сцену
camera.position.z = 13;
renderer.setPixelRatio(window.devicePixelRatio);

function animate() {
  requestAnimationFrame(animate);

  // проверяем, нажата ли клавиша стрелки вправо
  //   createRenderWorld();
  generateCube()
  setupKeyLogger();
  renderer.render(scene, camera);
}

animate();

// загружаем 3D-модель Ball
// var ball = null;
// Ballloader.load(
//   "/model/scene.gltf",
//   (gltf) => {
//     ball = gltf.scene;
//     scene.add(ball);
//   },
//   undefined,
//   (error) => {
//     console.error(error);
//   }
// );
