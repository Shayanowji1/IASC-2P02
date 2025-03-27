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
const drawCube = (height ,params) =>{
    //Create Cube Material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(params.color)
    })
    //Create Cube
    const cube = new THREE.Mesh(cubeGeometry , material)
    //Position Cube
    cube.position.x = (Math.random()- 0.5)* params.diamater
    cube.position.z = (Math.random()- 0.5)* params.diamater
    cube.position.y = height - 10
    //Scale cube
    cube.scale.x = params.scale
    cube.scale.y = params.scale
    cube.scale.z = params.scale

    //Randomize cube rotation
    if(params.randomized){
        cube.rotation.x = Math.random() * 2 * Math.PI
        cube.rotation.z = Math.random() * 2 * Math.PI
        cube.rotation.y = Math.random() * 2 * Math.PI
    }
    if (params.term === 'revolution') {
        cube.userData.originalScale = params.scale;
    }
    
    if (params.term === 'people') {
        cube.userData.floatSpeed = Math.random() * 0.05 + 0.01;
        cube.userData.maxHeight = 10;
    }
    if (params.term === 'shah') {
        cube.userData.shrinkSpeed = 0.999;
        cube.userData.fallSpeed = 0.0009;
    }
    

    //ADD Cube to group
    params.group.add(cube)
    
} 
//drawCube(0,'red')
//drawCube(1,'yellow')
//drawCube(2,'green')
//drawCube(3,'blue')

//UI//
const ui = new dat.GUI()
let preset = {}
//Groups
const group1 = new THREE.Group()
scene.add(group1)
const group2 = new THREE.Group()
scene.add(group2)
const group3 = new THREE.Group()
scene.add(group3)

const uiObj = {
    sourceText: "The Iranian Revolution of 1979 marked the fall of the Shah and the end of the Pahlavi dynasty. The Shah s rule had been characterized by corruption, political repression, and economic inequality. As the Shah imposed strict policies, the people grew increasingly dissatisfied.Mass protests erupted across Iran, with the people demanding justice and the removal of the Shah. The Revolution gained momentum as thousands of people took to the streets. Religious leaders, particularly Ayatollah Ruhollah Khomeini, became symbols of resistance against the Shah.Despite violent crackdowns, the Revolution intensified. The Shah fled the country in January 1979, leaving the people victorious. By February, the monarchy collapsed, and the Revolution reshaped Iran s political future. The Shah s departure symbolized the triumph of the people and the overwhelming force of the Revolution.",
    saveSourceText() {
        saveSourceText()

    },
    term1:{
        term:'shah',
        color: '#ff0000',
        diamater: 20,
        group : group1,
        nCubes: 200,
        randomized: true,
        scale : 2
    },
    term2:{
        term:'revolution',
        color: '#0000ff',
        diamater: 10,
        group : group2,
        nCubes: 100,
        randomized: true,
        scale : 1
        
    },
    term3:{
        term:'people',
        color: '#00ff00',
        diamater: 10,
        group : group3,
        nCubes: 100,
        randomized: true,
        scale : 1
    },
   
    saveTerms(){
        saveTerms()
    },
    rotateCamera : false

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
    cameraFolder.show()

    //Text Analysis
    findSearchTerminTokenizedText(uiObj.term1)
    findSearchTerminTokenizedText(uiObj.term2)
    findSearchTerminTokenizedText(uiObj.term3)


}
// Text Folder
const textFolder = ui.addFolder("Source Text")
textFolder
    .add(uiObj, 'sourceText')
    .name("Source Text")
textFolder
    .add(uiObj, 'saveSourceText')
    .name('Save')
    
//Terms and visualize Folder, camera folder
const termsFolder = ui.addFolder("Search Terms")
const VisualizeFolder = ui.addFolder("Visualize")
const cameraFolder = ui.addFolder("Camera")

termsFolder
    .add(uiObj.term1,'term')
    .name("Term 1")
termsFolder
    .add(group1,'visible')
    .name("Term 1 visibility")

termsFolder
    .addColor(uiObj.term1,'color')
    .name('Term 1 Color')

termsFolder
    .add(uiObj.term2,'term')
    .name("Term 2")
    termsFolder
    .add(group2,'visible')
    .name("Term 2 visibility")

termsFolder
    .addColor(uiObj.term2,'color')
    .name('Term 2 Color')
termsFolder
    .add(uiObj.term3,'term')
    .name("Term 3")
    termsFolder
    .add(group3,'visible')
    .name("Term 3 visibility")
termsFolder
    .addColor(uiObj.term3,'color')
    .name('Term 3 Color')
VisualizeFolder
    .add(uiObj, 'saveTerms')
    .name("Visualize")
cameraFolder
    .add(uiObj,'rotateCamera')
    .name("Turntable")

//Terms and visualize Folder
termsFolder.hide()
VisualizeFolder.hide()
cameraFolder.hide()
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
const findSearchTerminTokenizedText = (params)=>{
    //use a forloop to go through tokenizedtext array
    for(let i=0; i<tokenizedText.length;i++){
        // IF match draw a cube
        if(tokenizedText[i] == params.term){
            const height = (100/ tokenizedText.length) * i * 0.2
            //Call drawcube function using 100 value
            for(let a =0; a<params.nCubes; a++){
            drawCube(height, params)

        }
    }



}
}


//animation loop

const clock = new THREE.Clock()

const animation = ()=>
{
    
    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    //Update Orbit controlls
    controls.update()
    
    //scaling down and falling down animation
    group1.children.forEach(cube => {
        // Shrinking Effect
        cube.scale.multiplyScalar(cube.userData.shrinkSpeed);
    
        // Falling Effect
        cube.position.y -= cube.userData.fallSpeed;
    
        // Prevent cubes from disappearing completely
        if (cube.scale.x < 0.1) {
            cube.scale.set(0.1, 0.1, 0.1);
        }
    
        // Stop cubes from falling too low
        if (cube.position.y < -10) {
            cube.position.y = -10;
        }
    });
    //Group 2 glowing cubes
    group2.children.forEach(cube => {
        const pulseScale = 0.2 * Math.sin(elapsedTime * 2) + 1;
        cube.scale.set(
            cube.userData.originalScale * pulseScale,
            cube.userData.originalScale * pulseScale,
            cube.userData.originalScale * pulseScale
        );
    });
    
    //Animate people
    
// Animate People: Floating Up and Stop at Max Height
group3.children.forEach(cube => {
    if (cube.position.y < cube.userData.maxHeight) {
        cube.position.y += 0.0008; // Float up
    } else {
        cube.position.y = cube.userData.maxHeight; // Stop at max height
    }
})


    
    

    //Rotate camera
    if(uiObj.rotateCamera){
        camera.position.x = Math.sin(elapsedTime*0.1)*20
        camera.position.z = Math.cos(elapsedTime*0.1)*20
        camera.position.y= 5
        camera.lookAt(0,0,0)
        
    }


    //renderer
    renderer.render(scene,camera)

    //request next frame
    window.requestAnimationFrame(animation)


}
animation()