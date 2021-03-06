import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

let ready = false;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
});
renderer.setClearColor(0x090909);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//CAMERA
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.z = 10;

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 0.1;
controls.maxDistance = 3000;
controls.maxPolarAngle = Math.PI / 2;

//SCENE
const scene = new THREE.Scene();

//LIGHTS
const light1 = new THREE.AmbientLight(0xffffff, 0.5);
const light2 = new THREE.PointLight(0xffffff, 1);
scene.add(light1);
scene.add(light2);

// OBJECTS
const vertices = [];
for (let i = 0; i < 10000; i++) {
  const x = THREE.MathUtils.randFloatSpread(2000);
  const y = THREE.MathUtils.randFloatSpread(2000);
  const z = THREE.MathUtils.randFloatSpread(2000);
  vertices.push(x, y, z);
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3)
);
const material = new THREE.PointsMaterial({ color: 0xc7c7c7 });
const points = new THREE.Points(geometry, material);
scene.add(points);

const loader = new THREE.TextureLoader();
const sphere = new THREE.SphereGeometry(1.5, 32, 32);
let cube;
loader.load(
  "./texture1.jpg",
  function (texture) {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    cube = new THREE.Mesh(sphere, material);
    cube.position.z = 0;
    scene.add(cube);
    ready = true;
  },
  undefined,
  function (err) {
    console.error("An error happened.");
  }
);

// RAYCASTER
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener("mousemove", onMouseMove, false);

let animateStep = false;
document.getElementById("ctaBtn").addEventListener("click", () => {
  document.getElementsByClassName("splashDiv")[0].style.display = "none";
  document.getElementsByClassName("infoDiv")[0].classList.add("appearAnim");
  document.getElementsByClassName("infoDiv")[0].style.display = "flex";
  animateStep = true;
});
//RENDER LOOP
requestAnimationFrame(render);
function render() {
  if (ready) {
    document.getElementsByClassName("loader")[0].style.display = "none";
    document.getElementsByClassName("container")[0].style.display = "flex";
  }
  // raycaster.setFromCamera(mouse, camera);
  // const intersects = raycaster.intersectObjects(scene.children);
  // if (intersects.length > 0) {
  //   scene.remove(intersects[0].object);
  // }
  points.rotateY(3.14 / 10000);
  points.rotateZ(3.14 / 20000);

  // camera.position.z -= 0.05;

  // if (animateStep) {
  //   if (camera.position.z >= 1250) {
  //     animateStep = false;
  //   }
  //   camera.position.y += 5;
  //   camera.position.z += 25;
  // }
  if (cube) {
    cube.rotateY(3.14 / 1000);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
