// import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

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
  1750,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.z = 500;

// CONTROLS
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;
// controls.screenSpacePanning = false;
// controls.minDistance = 0.1;
// controls.maxDistance = 3000;
// controls.maxPolarAngle = Math.PI / 6;

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
  // raycaster.setFromCamera(mouse, camera);
  // const intersects = raycaster.intersectObjects(scene.children);
  // if (intersects.length > 0) {
  //   scene.remove(intersects[0].object);
  // }
  // points.rotateY(3.14 / 10000);c
  // points.rotateZ(3.14 / 20000);

  camera.position.z -= 0.5;

  if (animateStep) {
    if (camera.position.z >= 1250) {
      animateStep = false;
    }
    camera.position.y += 5;
    camera.position.z += 25;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
