var canvas = document.getElementById("renderCanvas");
var purpule = document.getElementById('purpule');
var white = document.getElementById('white');
var green = document.getElementById('green');
var red = document.getElementById('red');
var blue = document.getElementById('blue');
var light24 = document.getElementById('light-2-4');
var light610 = document.getElementById('light-6-10');
var plus = document.getElementById('plus');
var minus = document.getElementById('minus');
// var loading = document.getElementById('loading');

// setTimeout(function () {
//     loading.style.display = "none";
//   }, 2500);




var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
const createScene =  () => {
const scene = new BABYLON.Scene(engine);
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



var isabelleInterior;

// room
BABYLON.SceneLoader.ImportMesh("", "", "Isabelle_interior.glb", scene, function (newMeshes) {
    // Set the target of the camera to the first imported mesh
    // camera.target = newMeshes[0];
    isabelleInterior = newMeshes[0];
    isabelleInterior.scaling = new BABYLON.Vector3(100,100,100);
//     bomBox.dispose();
});

//light shape 6x10
var svetlo2x4;
BABYLON.SceneLoader.ImportMesh("", "", "Svetlo2x4.glb", scene, function (newMeshes) {
     svetlo2x4 = newMeshes[0];
     svetlo2x4.scaling = new BABYLON.Vector3(100,100,100);
});
//light shape 6x10
var svetlo6x10;
BABYLON.SceneLoader.ImportMesh("", "", "Svetlo6x10.glb", scene, function (newMeshes) {
     svetlo6x10 = newMeshes[0];
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
light24.addEventListener("click", 
        function () {
            svetlo2x4.dispose();
            svetlo6x10.dispose();
            
            BABYLON.SceneLoader.ImportMesh("", "", "Svetlo2x4.glb", scene, function (newMeshes) {
                svetlo2x4 = newMeshes[0];
                svetlo2x4.scaling = new BABYLON.Vector3(100,100,100);
           });
           lightShape.scaling = new BABYLON.Vector3(118,3,57);
});

light610.addEventListener("click", 
        function () {
            svetlo2x4.dispose();
            svetlo6x10.dispose();
            
            BABYLON.SceneLoader.ImportMesh("", "", "Svetlo6x10.glb", scene, function (newMeshes) {
                svetlo6x10 = newMeshes[0];
                svetlo6x10.scaling = new BABYLON.Vector3(100,100,100);
           });
           lightShape.scaling = new BABYLON.Vector3(295,3,171);
});

//change light collor on click
white.addEventListener("click", 
        function () {
        light2.diffuse = roomColors[0];
        light3.diffuse = roomColors[0];
});

purpule.addEventListener("click", 
        function () {
            light2.diffuse = roomColors[1];
            light3.diffuse = roomColors[1];
});

green.addEventListener("click", 
        function () {
            light2.diffuse = roomColors[2];
            light3.diffuse = roomColors[2];
});

red.addEventListener("click", 
        function () {
        light2.diffuse = roomColors[3];
        light3.diffuse = roomColors[3];
});

blue.addEventListener("click", 
        function () {
            light2.diffuse = roomColors[4];
            light3.diffuse = roomColors[4];
});

//change light intensity
plus.addEventListener("click", 
        function () {
            if (light3.intensity < 4) {
                light2.intensity += 0.2;
                light3.intensity += 0.2;
                // light4.intensity += 0.1;
                // light5.intensity += 0.1;
            }
        });

minus.addEventListener("click", 
    function () {
        if (light3.intensity > 0.21) {
            light2.intensity -= 0.2;
            light3.intensity -= 0.2;
            // light4.intensity -= 0.1;
            // light5.intensity -= 0.1;
        }
});

var myRange = document.getElementById('myRange');
console.log(myRange.value)
myRange.addEventListener("change",
    function () { 
        light2.intensity = myRange.value / 10;
        light3.intensity = myRange.value / 10;
        console.log(myRange.value)
    })
//light rays from source
var lightRays = new BABYLON.VolumetricLightScatteringPostProcess('lightRays', 1.0, camera, lightShape, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
lightRays._volumetricLightScatteringRTT.renderParticles = true;
// // // lightRays.exposure = 0.2;
// // // lightRays.decay = 0.5;
lightRays.weight = 0.2;
lightRays.density = 0.5;
//lightRays.useDiffuseColor = true; // False as default
//lightRays.mesh.material.diffuseColor = new BABYLON.Color3(0.0, 1.0, 0.0);

//execute change on click

return scene;
}
        




//nesto sto bilo vec kad sam skinuo kod
        var engine;
        var scene;
        initFunction = async function() {               
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
scene = createScene();};
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