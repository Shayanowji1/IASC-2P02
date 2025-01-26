import * as THREE from "three"
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
    75,window.innerWidth / window.innerHeight,0.1,
    100
)
scene.add(camera)
camera.position.set(0, 0, 5)

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth,window.innerHeight)
//Meshe

//testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry,sphereMaterial)

scene.add(testSphere)
testSphere.position.set(0, 1, -5)


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