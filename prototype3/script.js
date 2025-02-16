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
scene.background = new THREE.Color('black')
//camera
const camera = new THREE.PerspectiveCamera(
    75,sizes.aspectRatio,0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width,sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

//update controls
controls.update()





//Meshe

//CAVE
const caveGeometry = new THREE.PlaneGeometry(15.5,7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color : new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry,caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)
//Objects 
const torusKnotgeometry = new THREE.SphereGeometry(0.5, 32, 16)
const torusKnotMaterial = new THREE.MeshBasicMaterial({
   color:  new THREE.Color('blue')
})
const torusKnot = new THREE.Mesh(torusKnotgeometry,torusKnotMaterial)
torusKnot.position.set(5, 2, 3)
torusKnot.castShadow = true
scene.add(torusKnot)

const spheregeometry = new THREE.SphereGeometry(0.5, 32, 16)
const sphereMaterial = new THREE.MeshBasicMaterial({
   color:  new THREE.Color('blue')
})
const sphareMaterial = new THREE.Mesh(spheregeometry,sphereMaterial)
sphareMaterial.position.set(5, 2, 1)
sphareMaterial.castShadow = true
scene.add(sphareMaterial)

const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setFromPoints([
    new THREE.Vector3(5, 0.5, 3), 
    new THREE.Vector3(5, 0.5, 1)])
const lineMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color('red')
});

// Create the Line Object
const line = new THREE.Line(lineGeometry, lineMaterial);
line.castShadow = true
scene.add(line);
///Lights///
//Ambient Light//
//const ambinetlight = new THREE.AmbientLight(
  //  new THREE.Color('white')
//)
//scene.add(ambinetlight)
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 512
directionalLight.shadow.mapSize.height = 512


//Directional helper
//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)






//UI//
const ui = new dat.GUI()
const lightPositionFolder = ui.addFolder('Light Position')
lightPositionFolder
.add(directionalLight.position, 'y')
.min(-10)
.max(10)
.step(0.1)
.name('Y')
lightPositionFolder
.add(directionalLight.position, 'z')
.min(-10)
.max(10)
.step(0.1)
.name('Z')

//animation loop

const clock = new THREE.Clock()

const animation = ()=>
{
    console.log("tick")
    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    //animate objects
    torusKnot.rotation.y = elapsedTime
    //update directional light helper//
    //directionalLightHelper.update()


    //renderer
    renderer.render(scene,camera)

    //request next frame
    window.requestAnimationFrame(animation)


}
animation()