import * as THREE from 'three';
import "./style.css";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

// Escena
const scene = new THREE.Scene();

// Esfera
const geometry = new THREE.SphereGeometry(4, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: 0xFFBF00,
    roughness:0.5,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Tamaños
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Luz
const light = new THREE.DirectionalLight(0xffffff, 2, 100);
light.position.set(0, 10, 10);
light.intensity = 3.25;
scene.add(light);

// Cámara
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// Renderizador
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// Ajustar el tamaño al redimensionar la ventana
window.addEventListener('resize', () => {
    // Actualizar tamaños
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Actualizar cámara
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Actualizar renderizador
    renderer.setSize(sizes.width, sizes.height);
});
// Controles de órbita
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// Bucle de animación
const loop = () => {
    // Renderizar la escena desde la perspectiva de la cámara
    renderer.render(scene, camera);
    // Solicitar el siguiente cuadro de animación
    window.requestAnimationFrame(loop);
    // Actualizar controles de órbita
    controls.update();
};



// Llamada inicial al bucle de animación
loop();

// Animación con GSAP
const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(mesh.scale, {x:0, y:0, z:0}, {z:1, y:1, x:1});
tl.fromTo('nav', {y: '-100%'}, {y: '0%'});
tl.fromTo(".title", {opacity: 0}, {opacity: 1});

//animacion mouse color
let mouseDown = false;
let rgb=[]
window.addEventListener('mousedown', () => {mouseDown = true});
window.addEventListener('mouseup', () => {mouseDown = true});
window.addEventListener('mousemove', (e) => {
    if (mouseDown){
        rgb = [
        Math.round((e.pageX / sizes.width) * 255),
        Math.round((e.pageY / sizes.height) * 255),
        150,
     ]
     let newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
     gsap.to(mesh.material.color, {
        r: newColor.r,
        g: newColor.g,
        b: newColor.b,
        });
    }
});


