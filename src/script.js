import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

// Debug
const gui = new dat.GUI()
/**
 * const parameters ={
    color:0xff0000
}

gui.addColor(parameters,'color')

.onChange(()=>
{

    cubeMaterial.color.set(parameters.color)
})

 */

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Objects
 */
// Material
const cubeMaterial = new THREE.MeshStandardMaterial()
cubeMaterial.roughness = 0.4

const planeMaterial = new THREE.MeshStandardMaterial()
planeMaterial.roughness = 0.4
/**
 * 
 */
// Objects
//const sphere = new THREE.Mesh(
//    new THREE.SphereGeometry(0.5, 32, 32),
//    material
//)
//sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    cubeMaterial
)



//const torus = new THREE.Mesh(
//    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
//    material
//)
//torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    planeMaterial
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(cube,plane)

//Debug

gui.add(cubeMaterial,'wireframe')
//  gui.add(pointLight,'Light')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
function changeColor(color) {
    cube.material.color.setHex(color);
  }

const blueButton = document.getElementById("blueButton")
blueButton.addEventListener("click", () => {
  changeColor(0x0000ff); // Change color to blue
});

let isRotating= true

// Create the red button
const redButton = document.getElementById("redButton")
redButton.addEventListener("click", () => {
  changeColor(0xff0000); // Change color to red
});

// Create the rotation on button
const rotationOnButton = document.getElementById("rotationOnButton");
rotationOnButton.addEventListener("click", () => {
  isRotating = true; // Enable rotation
});

// Create the rotation off button
const rotationOffButton = document.getElementById("rotationOffButton");
rotationOffButton.addEventListener("click", () => {
  isRotating = false; // Disable rotation
});


// Function to animate the cube rotation
function animateRotation() {
    if (isRotating) {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animateRotation);
  }
  
/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
  requestAnimationFrame(animateRotation);

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = 0.1 * elapsedTime
    //cube.rotation.y = 0.1 * elapsedTime
    //torus.rotation.y = 0.1 * elapsedTime

   // sphere.rotation.x = 0.15 * elapsedTime
    //cube.rotation.x = 0.15 * elapsedTime
    //torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  
}

tick()