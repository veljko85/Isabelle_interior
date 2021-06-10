var canvas = document.getElementById("renderCanvas");
// var purpule = document.getElementById('purpule');
// // var white = document.getElementById('white');
// var green = document.getElementById('green');
// var red = document.getElementById('red');
// var blue = document.getElementById('blue');
// var light24 = document.getElementById('light-2-4');
// var light610 = document.getElementById('light-6-10');
// var plus = document.getElementById('plus');
// var minus = document.getElementById('minus');
// var loading = document.getElementById('loading');

// setTimeout(function () {
//     loading.style.display = "none";
//   }, 2500);




var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
const createScene =  () => {

//from here goes on babylon.js playground





const scene = new BABYLON.Scene(engine);
var cliWid = document.body.clientWidth;
var cliHei = document.body.clientHeight;
//create an AdvancedDynamicTexture in fullscreen mode
var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");

//scene color
scene.clearColor = new BABYLON.Color3(0.64, 0.51, 0.51);

/**** Set camera and light *****/

// var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 150, 0), scene);
// camera.setTarget(new BABYLON.Vector3(-50, 150, 0));
// camera.attachControl(canvas, true);
                                                                                //0,200,0
var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 100, 0), scene);
         //180,50,-200   
camera.setPosition(new BABYLON.Vector3(180, -170, -200));
            camera.attachControl(canvas, true);
  //camera field of view for mobile devices          
if (document.body.clientWidth < 768){
    camera.fov = 1.5;
}
            
//denie scroll
camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius = 0; 

//set lights
//default room color
var roomColor = new BABYLON.Color3(0.4, 0.4, 0.4);

const light2 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 1));
light2.intensity = 2;
light2.diffuse = roomColor;
const light4 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 1));
light4.intensity = 0;
const light3 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-1, -1, -1));
light3.intensity = 2;
light3.diffuse = roomColor;
const light5 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-1, -1, -1));
light5.intensity = 0;

//room lights to change
var roomColors = [
   /* normalRoom */ new BABYLON.Color3(0.4, 0.4, 0.4),
  /*  purpleRoom */ new BABYLON.Color3(0.74, 0.33, 1),
  /*  greenRoom */ new BABYLON.Color3(0.74, 1, 0.33),
  /*  redRoom */ new BABYLON.Color3(1, 0.1, 0.1),
  /*  blueRoom */ new BABYLON.Color3(0.33, 0.74, 1)
];
//light shape 6x10
var svetlo2x4;
BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/veljko85/Isabelle_interior/gh-pages/", "Svetlo2x4.glb").then((result) => {   
    svetlo2x4 = result.meshes[0];
    svetlo2x4.scaling = new BABYLON.Vector3(100,100,100);

});
//light shape 6x10
var svetlo6x10;
// BABYLON.SceneLoader.ImportMesh("", "", "Svetlo6x10.glb", scene, function (newMeshes) {
BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/veljko85/Isabelle_interior/gh-pages/", "Svetlo6x10.glb").then((result) => {   
     svetlo6x10 = result.meshes[0];
     svetlo6x10.scaling = new BABYLON.Vector3(100,100,100);
     svetlo6x10.dispose();
});
//light shape
var lightShape = BABYLON.MeshBuilder.CreateBox("lightShape", scene);
lightShape.scaling = new BABYLON.Vector3(118,3,57);
lightShape.material = new BABYLON.StandardMaterial("lightShapeMat", scene);
lightShape.material.emissiveColor = roomColor;
lightShape.position = new BABYLON.Vector3(-224, 411, 243.5);
//change light shape on click
var light24 = BABYLON.GUI.Button.CreateSimpleButton("light24", "2-4");
light24.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
light24.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
light24.top = cliHei / 1.6 + "px";
light24.left = (cliWid / 25) + "px";
light24.width = cliWid / 20 + "px";
light24.height = cliWid / 20 + "px";
light24.cornerRadius = 50;
light24.thickness = 4;
light24.children[0].color = "#DFF9FB";
light24.children[0].fontSize = 30;
light24.color = "#FF7979";
light24.background = "#EB4D4B";
gui.addControl(light24);
light24.onPointerClickObservable.add(function () {
    if (light3.intensity < 4) {
        svetlo2x4.dispose();
        svetlo6x10.dispose();
        BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/veljko85/Isabelle_interior/gh-pages/", "Svetlo2x4.glb").then((result) => {   
            svetlo2x4 = result.meshes[0];
            svetlo2x4.scaling = new BABYLON.Vector3(100,100,100);
        });
        lightShape.scaling = new BABYLON.Vector3(118,3,57);
    }
});
var light610 = BABYLON.GUI.Button.CreateSimpleButton("light610", "6-10");
light610.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
light610.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
light610.top = cliHei / 1.37 + "px";
light610.left = (cliWid / 25) + "px";
light610.width = cliWid / 20 + "px";
light610.height = cliWid / 20 + "px";
light610.cornerRadius = 50;
light610.thickness = 4;
light610.children[0].color = "#DFF9FB";
light610.children[0].fontSize = 30;
light610.color = "#FF7979";
light610.background = "#EB4D4B";
gui.addControl(light610);
light610.onPointerClickObservable.add(function () {
    if (light3.intensity < 4) {
        svetlo2x4.dispose();
        svetlo6x10.dispose();
        BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/veljko85/Isabelle_interior/gh-pages/", "Svetlo6x10.glb").then((result) => {   
            svetlo6x10 = result.meshes[0];
            svetlo6x10.scaling = new BABYLON.Vector3(100,100,100);
        });
        lightShape.scaling = new BABYLON.Vector3(295,3,171);
    }
});
// room
var isabelleInterior;
BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/veljko85/Isabelle_interior/gh-pages/", "Isabelle_interior.glb").then((result) => {
    isabelleInterior = result.meshes[0];
    isabelleInterior.scaling = new BABYLON.Vector3(100,100,100);
});

console.log(cliWid)
var lightButtons = [];
var lightButtonsColor = ["#fff", "#BC53FF", "#BCFF53", "#FF0000", "#53BCFF"];
var x = -(cliWid / 3.5);

for (let i = 0; i < 5; i++) {
    x += cliWid / 18;
    lightButtons[i] = BABYLON.GUI.Button.CreateSimpleButton("button", "");
    lightButtons[i].horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    lightButtons[i].top = cliHei / 2.4 + "px";
    lightButtons[i].left = x + "px";
    lightButtons[i].width = cliWid / 20 + "px";
    lightButtons[i].height = cliWid / 20 + "px";
    lightButtons[i].cornerRadius = 20;
    // lightButtons[i].thickness = 4;
    // lightButtons[i].color = "#000";
    lightButtons[i].background = lightButtonsColor[i];
    // lightButtons[i].children[0].color = "#DFF9FB";
    // lightButtons[i].children[0].fontSize = 24;
    gui.addControl(lightButtons[i]);
    lightButtons[i].onPointerClickObservable.add(function () {
        light2.diffuse = roomColors[i];
        light3.diffuse = roomColors[i];
    });
    lightButtons[i].onPointerEnterObservable.add(function () {
        lightButtons[i].color = "#FF7979";
        lightButtons[i].thickness = 4;
    });
    lightButtons[i].onPointerOutObservable.add(function () {
        lightButtons[i].thickness = 0;
    });
}
var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var panel = new BABYLON.GUI.StackPanel();
    panel.width = cliWid / 9 + "px";
    panel.isVertical = true;
    panel.left = -(cliWid / 100) + "px";
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(panel);    

    var picker = new BABYLON.GUI.ColorPicker();
    picker.value = light2.diffuse && light3.diffuse;
    picker.height = cliWid / 9 + "px";
    picker.width = cliWid / 9 + "px";
    picker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    picker.onValueChangedObservable.add(function(value) { // value is a color3
        light2.diffuse.copyFrom(value);
        light3.diffuse.copyFrom(value);
    });

    panel.addControl(picker);  
    
    
var lightPlus = BABYLON.GUI.Button.CreateSimpleButton("lightPlus", "+");
lightPlus.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
lightPlus.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
lightPlus.top = cliHei / 1.6 + "px";
lightPlus.left = -(cliWid / 25) + "px";
lightPlus.width = cliWid / 20 + "px";
lightPlus.height = cliWid / 20 + "px";
lightPlus.cornerRadius = 50;
lightPlus.thickness = 4;
lightPlus.children[0].color = "#DFF9FB";
lightPlus.children[0].fontSize = 40;
lightPlus.color = "#FF7979";
lightPlus.background = "#EB4D4B";
gui.addControl(lightPlus);
lightPlus.onPointerClickObservable.add(function () {
    if (light3.intensity < 4) {
            light2.intensity += 0.2;
            light3.intensity += 0.2;
            // light4.intensity += 0.1;
            // light5.intensity += 0.1;
    }
});

var lightMinus = BABYLON.GUI.Button.CreateSimpleButton("lightMinus", "-");
lightMinus.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
lightMinus.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
lightMinus.top = cliHei / 1.37 + "px";
lightMinus.left = -(cliWid / 25) + "px";
lightMinus.width = cliWid / 20 + "px";
lightMinus.height = cliWid / 20 + "px";
lightMinus.cornerRadius = 50;
lightMinus.thickness = 4;
lightMinus.children[0].color = "#DFF9FB";
lightMinus.children[0].fontSize = 40;
lightMinus.color = "#FF7979";
lightMinus.background = "#EB4D4B";
gui.addControl(lightMinus);
lightMinus.onPointerClickObservable.add(function () {
    if (light3.intensity > 0.21) {
            light2.intensity -= 0.2;
            light3.intensity -= 0.2;
            // light4.intensity -= 0.1;
            // light5.intensity -= 0.1;
        }
});

// var myRange = document.getElementById('myRange');

// myRange.addEventListener("change",
//     function () { 
//         light2.intensity = myRange.value / 10;
//         light3.intensity = myRange.value / 10;
//     })
//light rays from source
var lightRays = new BABYLON.VolumetricLightScatteringPostProcess('lightRays', 1.0, camera, lightShape, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
lightRays._volumetricLightScatteringRTT.renderParticles = true;
// // // lightRays.exposure = 0.2;
// // // lightRays.decay = 0.5;
lightRays.weight = 0.2;
lightRays.density = 0.5;
//lightRays.useDiffuseColor = true; // False as default
//lightRays.mesh.material.diffuseColor = new BABYLON.Color3(0.0, 1.0, 0.0);



return scene;
}
        




//nesto sto bilo vec kad sam skinuo kod
window.initFunction = async function() {               
    var asyncEngineCreation = async function() {
        try {
        return createDefaultEngine();
        } catch(e) {
        console.log("the available createEngine function failed. Creating the default engine instead");
        return createDefaultEngine();
        }
    }

    window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene        
engine.runRenderLoop(function () {
if (sceneToRender && sceneToRender.activeCamera) {
    sceneToRender.render();
}
});
});

// Resize
window.addEventListener("resize", function () {
engine.resize();
});