import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


//Every project needs scene, camera, renderer

const scene = new THREE.Scene();

//This projection mode is designed to mimic the way the human eye sees. 
//It is the most common projection mode used for rendering a 3D scene.
// PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
// fov — Camera field of view. FLOAT
// aspect — Camera aspect ratio. FLOAT
// near — Camera near plane (the closest object that will be visble with this camera). FLOAT
// far — Camera frustum far plane (the the farthest object that will be visble with this camera). FLOAT

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(0,0,0);

renderer.render(scene, camera);


//Creating donut

const geometry = new THREE.TorusGeometry(10, 3, 30, 100);
// const material = new THREE.MeshBasicMaterial({color: 0xff555, side: THREE.DoubleSide, wireframe: true}); //does not react with light bouncing of it 
const material = new THREE.MeshStandardMaterial({color: 0xfcbc5, side: THREE.DoubleSide});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

torus.position.set(-20,-20,-20);

//Adding Point Light & Ambient Light

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(33,15,9);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);


//Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper, gridHelper)


//Controling space with mouse, need import ^
const controls = new OrbitControls(camera, renderer.domElement)


//creating Stars

function addStar() {
    const sphere = new THREE.SphereGeometry(0.1, 20, 20);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(sphere, material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    if (x>10 || y>10 || z>10 || x<-10 || y<-10 || z<-10) {
        star.material.color.setHex( 0xFFFFFF );
    }if (x>20 || y>20 || z>20 || x<-20 || y<-20 || z<-20) {
        star.material.color.setHex( 0xcccccc );
    }if (x>30 || y>30 || z>30 || x<-30 || y<-30 || z<-30) {
        star.material.color.setHex( 0x999999 );
    }if (x>40 || y>40 || z>40 || x<-40 || y<-40 || z<-40) {
        star.material.color.setHex( 0x666666 );
    }

    //WHITE PALETTE
    //FFFFFF   cccccc  999999  666666  333333


    star.position.set(x,y,z);

    scene.add(star)
}

Array(1000).fill().forEach(addStar);



//BACKGROUND SCENE

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//Creating cube

const geometryB = new THREE.BoxGeometry(3,3,3);
const boxTexture = new THREE.TextureLoader().load('threejslogo.png');
const materialB = new THREE.MeshStandardMaterial({map: boxTexture, side: THREE.DoubleSide});
const box = new THREE.Mesh(geometryB, materialB);

box.position.set(9,6,2)

scene.add(box)

//Creating moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalMoonTexture = new THREE.TextureLoader().load('moonstructure.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,20,20),
    new THREE.MeshStandardMaterial({
        map: moonTexture, 
        normalMap: normalMoonTexture,
        side: THREE.DoubleSide
    }),

);

moon.position.set(19,20,25)

scene.add(moon);

//Camera movement

function moveCamer(){
    const t = document.body.getBoundingClientRect().top;
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;

    box.rotation.x -= 0.02;
    box.rotation.y -= 0.04;
    box.rotation.z -= 0.02;

    moon.rotation.x -= 0.02;
    moon.rotation.y += 0.02;
    moon.rotation.z -= 0.02;


    console.log(camera.position.x, camera.position.y, camera.position.z);

    if(t * -0.03 >= 0){
        camera.position.x = t * -0.03;
        camera.position.y = t * -0.03;
        camera.position.z = t * -0.03;
    }
    
    torus.position.x = t * 0.03;
    torus.position.y = t * 0.03;
    torus.position.z = t * 0.03;
}

document.body.onscroll = moveCamer

//Animate Loop

function animate() {
    requestAnimationFrame(animate);

    // torus.rotation.x += 0.01;
    // torus.rotation.y += 0.01;
    // torus.rotation.z += 0.01;

    // box.rotation.x -= 0.02;
    // box.rotation.y -= 0.04;
    // box.rotation.z -= 0.02;

    // moon.rotation.x -= 0.02;
    // moon.rotation.y += 0.02;
    // moon.rotation.z -= 0.02;

    controls.update();

    renderer.render(scene, camera);
}

animate();
