import * as THREE from "three"
import {OrbitControls} from "OrbitControls"
import * as dat from "lil-gui"
/* Setup*/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio:window.innerWidth / window.innerHeight
}
/********
 * Scene*
 */
//canvas
const canvas = document.querySelector('.webgl')
//scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('pink')
//camera
const camera = new THREE.PerspectiveCamera(
    75,sizes.aspectRatio,0.1,
    100
)
scene.add(camera)
camera.position.set(-2, 2, -5)

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width,sizes.height)
//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

//update controls
controls.update()

//UI OBJECt
const uiObject = {
    speed: 1,
    distance: 1 , 
    rotation: 1
}





//Meshe

//testSphere
//const sphereGeometry = new THREE.SphereGeometry(1)
//const sphereMaterial = new THREE.MeshNormalMaterial()
//const testSphere = new THREE.Mesh(sphereGeometry,sphereMaterial)

//scene.add(testSphere)
const geometry = new THREE.BoxGeometry(2,2,1)
const material = new THREE.MeshBasicMaterial({
    color : new THREE.Color("blue")
})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)
//testSphere.position.set(0, 1, -5)

//PLANE
const planeGeometry = new THREE.PlaneGeometry(10,10,50,50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color : new THREE.Color ("white"),
    side: THREE.DoubleSide,
    wireframe : true
})
const plane = new THREE.Mesh(planeGeometry,planeMaterial)
plane.rotation.x = Math.PI * 0.5
scene.add(plane)

//UI//
const ui = new dat.GUI()
//Plane ui
const planeFolder = ui.addFolder('plane')
planeFolder
    .add(planeMaterial,'wireframe')
    .name("Toggle Wireframe")


//Testsphere UI
const spherefolder  = ui.addFolder('Sphere')
spherefolder
    .add(uiObject,'rotation')
    .min(0.1)
    .max(100)
    .step(1)
    .name('Rotation')

spherefolder
    .add(uiObject,'speed')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Speed')
spherefolder
    .add(uiObject,'distance')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Distance')

  
const clock = new THREE.Clock()


const animation = ()=>
{
    console.log("tick")
    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    mesh.position.y = Math.sin(elapsedTime * uiObject.speed ) * uiObject.distance
    mesh.rotation.y = 0.1 * uiObject.rotation

    //renderer
    renderer.render(scene,camera)

    //request next frame
    window.requestAnimationFrame(animation)


}
animation()