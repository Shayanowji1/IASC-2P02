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
const sphereGeometry2 = new THREE.SphereGeometry(1)
const sphereMaterial2 = new THREE.MeshNormalMaterial()
const testSphere2 = new THREE.Mesh(sphereGeometry,sphereMaterial)

scene.add(testSphere)
scene.add(testSphere2)
testSphere2.position.set(0,4,-5)
testSphere.position.set(0, 1, -5)


//animation loop

const clock = new THREE.Clock()

const animation = ()=>
{
    console.log("tick")
    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    //animate testsphere
    testSphere.position.y = Math.sin(elapsedTime)
    testSphere2.position.x = Math.sin(elapsedTime)
    //renderer
    renderer.render(scene,camera)

    //request next frame
    window.requestAnimationFrame(animation)


}
animation()