import * as THREE from 'three';
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap";



//scene
const scene = new THREE.Scene();

//create sphere geometry, material and mesh
const sphereGeometry = new THREE.SphereGeometry(3, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: "#05e6d7",
    roughness: 0.5,
    // metalness: 0.2,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);




//adding sphere to the scene
scene.add(sphere);



//light
// const light = new THREE.HemisphereLight(0xffffff,0x000000,1);
const light = new THREE.SpotLight(0xffffff, 0.8);
light.position.set(10, 10, 10);
scene.add(light);

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;
scene.add(camera);


//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(2);
// document.body.appendChild(renderer.domElement);


//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.005;
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

//resize the window
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})




//animate
const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}
loop();


//timeline
const t1 = gsap.timeline({defaults: {duration: 1}});
t1.fromTo(sphere.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
t1.fromTo('nav', {y:"-100%"}, {y: "0%"});
t1.fromTo(".title", {opacity: 0}, {opacity: 1});


//mouse animation
let mousedown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mousedown = true));
window.addEventListener("mouseup", () => (mousedown = false));

//mouse move animation
window.addEventListener("mousemove", (e) => {
    if(mousedown){
        rgb = [
            Math.round((e.pageX / window.innerWidth) * 255), 
            Math.round((e.pageY / window.innerHeight) * 255), 
            150,
        ]
        console.log(rgb);

        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
        gsap.to(sphere.material.color, {r: newColor.r, g: newColor.g, b: newColor.b})
}
})