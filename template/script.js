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


//Resizing//
window.addEventListener('resize',()=>{
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight
    //update camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()
    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))



})


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
camera.position.set(0, 0, 5)

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





//Meshe

//testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry,sphereMaterial)

scene.add(testSphere)
testSphere.position.set(0, 1, -5)

//UI//
const ui = new dat.GUI()


//animation loop

const clock = new THREE.Clock()

const animation = ()=>
{
    console.log("tick")
    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //renderer
    renderer.render(scene,camera)

    //request next frame
    window.requestAnimationFrame(animation)


}
animation()