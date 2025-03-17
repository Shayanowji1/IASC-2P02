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
let preset = {}
const uiObj = {
    sourceText: "The quick brown fox jumper over the lazy dog",
    saveSourceText() {
        saveSourceText()

    },
    term1: 'fox',
    color1: '#aa00ff',
    term2:'dog',
    color2:'#00ffaa',
    term3: '',
    color3: '',
    saveTerms(){
        saveTerms()
    }

}
//Ui Function
const saveSourceText = () =>{
    
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    VisualizeFolder.show()

//Text analysis
tokenizeSourceText(uiObj.sourceText)
}
const saveTerms = ()=>{
    //UI
    preset = ui.save
    VisualizeFolder.hide()

    //Text Analysis
    findSearchTerminTokenizedText(uiObj.term1,uiObj.color1)
    findSearchTerminTokenizedText(uiObj.term2,uiObj.color2)
    findSearchTerminTokenizedText(uiObj.term3,uiObj.color3)


}
// Text Folder
const textFolder = ui.addFolder("Source Text")
textFolder
    .add(uiObj, 'sourceText')
    .name("Source Text")
textFolder
    .add(uiObj, 'saveSourceText')
    .name('Save')
    
//Terms and visualize Folder
const termsFolder = ui.addFolder("Search Terms")
const VisualizeFolder = ui.addFolder("Visualize")
termsFolder
    .add(uiObj,'term1')
    .name("Term 1")

termsFolder
    .addColor(uiObj,'color1')
    .name('Term 1 Color')

    termsFolder
    .add(uiObj,'term2')
    .name("Term 2")
    termsFolder
    .addColor(uiObj,'color2')
    .name('Term 2 Color')
    termsFolder
    .add(uiObj,'term3')
    .name("Term 3")
    termsFolder
    .addColor(uiObj,'color3')
    .name('Term 3 Color')
VisualizeFolder
    .add(uiObj, 'saveTerms')
    .name("Visualize")

//Terms and visualize Folder
termsFolder.hide()
VisualizeFolder.hide()
// Source Text

///Variable
let parsedText , tokenizedText

// Parsed and Tokenize SourceText
const tokenizeSourceText = (sourceText) =>{
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