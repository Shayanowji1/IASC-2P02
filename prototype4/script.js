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
camera.position.set(0, 12, -20)

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

//Lights
const directionalLight = new THREE.DirectionalLight(0x404040 , 100)
scene.add(directionalLight)



//Meshe
//Cube geometry
const cubeGeometry = new THREE.BoxGeometry(0.5,0.5,0.5)
const drawCube = (height ,color) =>{
    //Create Cube Material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })
    //Create Cube
    const cube = new THREE.Mesh(cubeGeometry , material)
    //Position Cube
    cube.position.x = (Math.random()- 0.5)* 10
    cube.position.z = (Math.random()- 0.5)* 10
    cube.position.y = height - 10

    //Randomize cube rotation
    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI

    //ADD scene
    scene.add(cube)

}
//drawCube(0,'red')
//drawCube(1,'yellow')
//drawCube(2,'green')
//drawCube(3,'blue')

//UI//
const ui = new dat.GUI()
// Text AnaLYSIS
// Source Text
const sourceText = "Shayan was addicted to PlayStation, so his mother locked it away in a white anitque locker. Every night, he sneaked into her room, searching for the key. Eventually, he always found the golden key and played till morning."
///Variable
let parsedText , tokenizedText

// Parsed and Tokenize SourceText
const tokenizeSourceText = () =>{
    //Strip periods and Downcase sourcetext
    parsedText = sourceText.replaceAll("doge", "DOG").toLowerCase()
    //Tokenize Text
    tokenizedText = parsedText.split(/[^\w']+/)  
    console.log(tokenizedText)
}
/// Find Search Term in tokenizedText
const findSearchTerminTokenizedText = (term, color)=>{
    //use a forloop to go through tokenizedtext array
    for(let i=0; i<tokenizedText.length;i++){
        // IF match draw a cube
        if(tokenizedText[i] == term){
            const height = (100/ tokenizedText.length) * i * 0.2
            //Call drawcube function using 100 value
            for(let a =0; a<100; a++){
            drawCube(height, color)

        }
    }



}
}
tokenizeSourceText()
findSearchTerminTokenizedText('playstation', 'black')
findSearchTerminTokenizedText('locker', 'white')
findSearchTerminTokenizedText('golden', 'yellow')
findSearchTerminTokenizedText('morning', 'lightblue')


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