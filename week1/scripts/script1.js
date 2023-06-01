import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

console.log(THREE);
console.log(OrbitControls);
console.log(dat);

//gui
const gui = new dat.GUI();

//scene
const scene = new THREE.Scene();

//lights
const ambient = new THREE.AmbientLight('white', 0.2);
const directionLight = new THREE.DirectionalLight('violet', 0.4);
scene.add(ambient,directionLight);

//Object
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color : "blue"})
)
scene.add(cube);
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10,10),
    new THREE.MeshStandardMaterial({color : "green"})
)
plane.rotation.x = Math.PI * -0.5;
plane.position.y = -1;
scene.add(plane);

//viewport
const size = {
    width : window.innerWidth,
    height : window.innerHeight
}
window.addEventListener('resize', () =>
{
    //update size
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    //update camera
    camera.aspect = size.width/size.height;

    //update renderer
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));

})
//fullscreen
window.addEventListener('dblclick', () =>
{
    if(!document.fullscreenElement){
        canvas.requestFullscreen();
    }else{
        document.exitFullscreen();
    }
})

//camera 
const camera = new THREE.PerspectiveCamera(75, size.width/size.height);
camera.position.z = 4;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(devicePixelRatio,2));

//Orbit controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;

//animation - clock
const clock = new THREE.Clock();
const tick = () => 
{
    const elapsedTime = clock.getElapsedTime();
    
    //update controls
    controls.update();

    //render
    renderer.render(scene,camera);

    //animation loop
    window.requestAnimationFrame(tick);
}
tick();