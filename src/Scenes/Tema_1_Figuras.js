
import React from "react";
import * as BABYLON from "babylonjs";
import * as MATERIALS from "babylonjs-materials"
import SceneComponent from "../Babylon_components/SceneComponent"; 
import * as Materials_Module from "../Modules/Materials_Module";
import * as GUI from "babylonjs-gui"
import "babylonjs-loaders";
import {GizmoInterface} from "../Modules/GizmoInterface"
import * as Babylon_Components from "../Babylon_components"
import ammo from "ammo.js"
import * as XR_Module from "../Modules/XR_Module"
import { PlayGround } from "../Babylon_components/PlayGround";
import { WindowUI, WindowUICreadorDeFiguras, WindowUIImagen, WindowUIVariasImagenes, VideoPlayerTexture, WindowUIVariasImagenesV2 } from "./WindowsUI";
import cesped from "../Modules/cesped.jpg"
import bienvenidaPreguntas from "../Modules/bienvenidoPreguntas.png"
import examenCubo from "../Modules/examenCubo.png"
import introduccionImg from "../Modules/introduccion.png"
import video from "../Modules/figurasGeometricas.mp4"
import * as AV_module from "../Scenes/AV_module";
import cuboImg from "../Modules/cuboImg.png"
import esferaImg from "../Modules/esferaImg.png"
import cilindroImg from "../Modules/cilindroImg.png"
import piramideImg from "../Modules/piramideImg.png"
import circuloImg from "../Modules/circuloImg.png"
import cuadradoImg from "../Modules/cuadradoImg.png"
import trianguloImg from "../Modules/trianguloImg.png"
import rectanguloImg from "../Modules/rectanguloImg.png"
import ayudaImg from "../Modules/ayuda.png"
import preguntas2 from "../Modules/preguntasV2.png"


import * as subscene1 from "./subscene1"


// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.


const onSceneReady = async (e = { engine: new BABYLON.Engine, scene: new BABYLON.Scene, canvas: new HTMLCanvasElement }) => {

  const { canvas, scene, engine } = e;
  // This creates and positions a free camera (non-mesh)
  const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 2, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
  camera.minZ = 0.45;
  
  //cambiar velocidad de movimiento
  
  camera.speed = 0.5;

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  //Display 3D axes
  //const axes3D = new BABYLON.AxesViewer(scene, 2)

  


  //playground = Babylon_Components.PlayGround();

  var playground = PlayGround({ playground_width: 30, playground_depth: 30 }, scene)
  playground.ground.material = new BABYLON.StandardMaterial("ground_material", scene);
  playground.ground.material.diffuseTexture = new BABYLON.Texture(cesped, scene);
  playground.ground.material.diffuseTexture.uScale = 20;
  playground.ground.material.diffuseTexture.vScale = 20;
  playground.ground.physicsImpostor = new BABYLON.PhysicsImpostor(playground.ground, BABYLON.PhysicsImpostor.BoxImpostor, { restitution: 0.9, mass: 0 }, scene);

  scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.AmmoJSPlugin(true, await ammo()));
  
  var ground_impostor = new BABYLON.PhysicsImpostor(playground.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  playground.ground.physicsImpostor = ground_impostor;

  // Sky material
  var skyboxMaterial = new MATERIALS.SkyMaterial("skyMaterial", scene);
  skyboxMaterial.backFaceCulling = false;
  
  // Sky mesh (box)
  var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
  skybox.material = skyboxMaterial;

  skybox.material.inclination = -0.35;

  var indexScene = 0;

  //scene.debugLayer.show();

  // Our built-in shapes examples.
  var box_material = Materials_Module.MaterialRandom();
  var box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
  box.material = box_material;
  
  //var box_impostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
  //box.physicsImpostor = box_impostor;

  var sphere_material = Materials_Module.MaterialRandom();
  var sphere = BABYLON.MeshBuilder.CreateSphere("sphere",{diameterX:2,diameterY:2,diameterZ:2},scene)
  sphere.material = sphere_material;

  //var sphere_impostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
  //sphere.physicsImpostor = sphere_impostor;

  var cone_material = Materials_Module.MaterialRandom();
  var cone = BABYLON.MeshBuilder.CreateCylinder("cone",{height:2,diameterTop:0,diameterBottom:2,tessellation:4},scene)
  cone.material = cone_material;

 // var cone_impostor = new BABYLON.PhysicsImpostor(cone, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, restitution: 0.9 }, scene);
 // cone.physicsImpostor = cone_impostor;

  var cylinder_material = Materials_Module.MaterialRandom();
  var cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2, diameter: 2}, scene);
  cylinder.material = cylinder_material;

  //var cylinder_impostor = new BABYLON.PhysicsImpostor(cylinder, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, restitution: 0.9 }, scene);
  //cylinder.physicsImpostor = cylinder_impostor;

  //modelos 2d 

  var circulo = BABYLON.MeshBuilder.CreateDisc("circulo", {radius: 1.5, tessellation: 1000, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
  circulo.position = new BABYLON.Vector3(-13,1.5,-11);
  circulo.rotation = new BABYLON.Vector3(0, 92.7, 0);
  circulo.material = Materials_Module.MaterialRandom();
  //circulo.physicsImpostor = new BABYLON.PhysicsImpostor(circulo, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, restitution: 0.9 }, scene)

  var cuadrado = BABYLON.MeshBuilder.CreatePlane("cuadrado", {size: 3, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
  cuadrado.position = new BABYLON.Vector3(-13, 1.5, -5);
  cuadrado.rotation = new BABYLON.Vector3(0, 92.7, 0);
  cuadrado.material = Materials_Module.MaterialRandom();
  //cuadrado.physicsImpostor = new BABYLON.PhysicsImpostor(cuadrado, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);

  var rectangulo = BABYLON.MeshBuilder.CreatePlane("rectangulo", {size: 3, width: 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
  rectangulo.position = new BABYLON.Vector3(-13, 1.5, 1);
  rectangulo.rotation = new BABYLON.Vector3(0, 92.7, 0);
  rectangulo.material = Materials_Module.MaterialRandom();
  //rectangulo.physicsImpostor = new BABYLON.PhysicsImpostor(rectangulo, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);

  var triangulo = BABYLON.MeshBuilder.CreateDisc("triangulo", {radius: 2, tessellation: 3, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
  triangulo.position = new BABYLON.Vector3(-13, 1, 7);
  triangulo.rotation = new BABYLON.Vector3(0, 92.7, 1.5708);
  triangulo.material = Materials_Module.MaterialRandom();
  //triangulo.physicsImpostor = new BABYLON.PhysicsImpostor(triangulo, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
  /*
  var pentagono = BABYLON.MeshBuilder.CreateDisc("pentagono", {radius: 2, tessellation: 5}, scene);
  pentagono.position = new BABYLON.Vector3(25, 2, 0);
  pentagono.rotation = new BABYLON.Vector3(0, 0, 0.628319);
  pentagono.material = Materials_Module.MaterialRandom();
  //pentagono.physicsImpostor = new BABYLON.PhysicsImpostor(pentagono, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);

  var hexagono = BABYLON.MeshBuilder.CreateDisc("hexagono", {radius: 2, tessellation: 6}, scene);
  hexagono.position = new BABYLON.Vector3(30, 2, 0);
  hexagono.rotation = new BABYLON.Vector3(0, 0, 0.523599);
  circulo.material.sideOrientation = BABYLON.Material.DOUBLESIDE;
  hexagono.material = Materials_Module.MaterialRandom();
    //hexagono.physicsImpostor = new BABYLON.PhysicsImpostor(hexagono, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);

  var heptagono = BABYLON.MeshBuilder.CreateDisc("heptagono", {radius: 2, tessellation: 7}, scene);
  heptagono.position = new BABYLON.Vector3(35, 2, 0);
  heptagono.rotation = new BABYLON.Vector3(0, 0, 0.448799);
  heptagono.material = Materials_Module.MaterialRandom();
   // heptagono.physicsImpostor = new BABYLON.PhysicsImpostor(heptagono, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);

  var octagono = BABYLON.MeshBuilder.CreateDisc("octagono", {radius: 2, tessellation: 8}, scene);
  octagono.position = new BABYLON.Vector3(40, 2, 0);
  octagono.rotation = new BABYLON.Vector3(0, 0, 0.392699);
  octagono.material = Materials_Module.MaterialRandom();
  //octagono.physicsImpostor = new BABYLON.PhysicsImpostor(octagono, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
*/
  //const XR = XR_Module.XR_Experience(playground.ground , skybox ,scene);



  //checkcollisions
    scene.collisionsEnabled = true;
    box.checkCollisions = true;
    sphere.checkCollisions = true;
    cone.checkCollisions = true;
    cylinder.checkCollisions = true;
    circulo.checkCollisions = true;
    cuadrado.checkCollisions = true;
    rectangulo.checkCollisions = true;
    triangulo.checkCollisions = true;
    
    //XR Module
    const XR = XR_Module.XR_Experience(playground.ground, skybox, scene);

    //Gizmo
    var gizmointerface = GizmoInterface(scene);
    box.XRpickable = false;
    sphere.XRpickable = false;
    cone.XRpickable = false;
    cylinder.XRpickable = false;
    circulo.XRpickable = false;
    cuadrado.XRpickable = false;
    rectangulo.XRpickable = false;
    triangulo.XRpickable = false;
    /*
    pentagono.XRpickable = true;
    hexagono.XRpickable = true;
    heptagono.XRpickable = true;
    octagono.XRpickable = true;
*/

  gizmointerface.gizmos.boundingBoxGizmo.setEnabledScaling(false);


  // Our built-in 'ground' shape.
  //var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 30, height: 30,subdivisions:30 }, scene);
  //ground.material = Materials_Module.MaterialRandom();
/*
    //poner textura al suelo\
    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture(cesped, scene);
    //groundMaterial.diffuseTexture.uScale = 10;
    //groundMaterial.diffuseTexture.vScale = 10;
    //groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = groundMaterial;
    ground.checkCollisions = true;
  */
  scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
  scene.collisionsEnabled = true;

  camera.applyGravity = true;
  camera.checkCollisions = true;
  camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
  
  playground.checkCollisions = true;

  // Move the position of each shape
  box.position.x = 13;
  box.position.y = 1;
  box.position.z = 9;



  sphere.setAbsolutePosition(new BABYLON.Vector3(13,1,-10));
  //var newSpherePosition = sphere.position.addInPlace(new BABYLON.Vector3(0,0,0));
  //console.log(newSpherePosition)

  cone.setAbsolutePosition(new BABYLON.Vector3(13,1,-3));

  cylinder.setAbsolutePosition(new BABYLON.Vector3(13,1,3));

  ////////////////////////////////////////Paneles de texto////////////////////////////////////////


  var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  var cuboInfo = new GUI.Rectangle();
  cuboInfo.background = "white";
  cuboInfo.isVisible = false;
  advancedTexture.addControl(cuboInfo);

  var cuboInfoText = new GUI.TextBlock();
  cuboInfoText.text = "Cubo";
  cuboInfoText.color = "black";
  cuboInfoText.fontSize = 24;
  
  cuboInfo.addControl(cuboInfoText);
  cuboInfo.parent = box;
  cuboInfo.linkOffsetY = -50;
  cuboInfo.linkOffsetX = 0;
  cuboInfo.linkWithMesh(box);
  cuboInfo.parent = box;

  cuboInfo.onPointerClickObservable.add(function() {
    cuboInfo.isVisible = true;

});

    var esferaInfo = new GUI.Rectangle();
    esferaInfo.background = "white";
    esferaInfo.isVisible = false;
    advancedTexture.addControl(esferaInfo);

    var esferaInfoText = new GUI.TextBlock();
    esferaInfoText.text = "Esfera";
    esferaInfoText.color = "black";
    esferaInfoText.fontSize = 24;

    esferaInfo.addControl(esferaInfoText);
    esferaInfo.parent = sphere;
    esferaInfo.linkOffsetY = -50;
    esferaInfo.linkOffsetX = 0;
    esferaInfo.linkWithMesh(sphere);
    esferaInfo.parent = sphere;

    esferaInfo.onPointerClickObservable.add(function() {
        esferaInfo.isVisible = true;

});

  //on click event

  var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

  
  
////////////////////////////////////////-GUI-/////////////////////////////////////////////

var panelCaja = null;
var panelCajaImg = null;

var verPreguntas2 = false;

advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
var buttonPreguntas = null;

//create a GUI button
buttonPreguntas = GUI.Button.CreateSimpleButton("but", "A las preguntas!");
buttonPreguntas.width = 0.2;
buttonPreguntas.height = "40px";
buttonPreguntas.color = "white";
buttonPreguntas.background = "green";
buttonPreguntas.top = "10px";
buttonPreguntas.left = "10px";
buttonPreguntas.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
buttonPreguntas.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

var enZonaDePreguntas = false;
buttonPreguntas.onPointerUpObservable.add(function () {
    
    enZonaDePreguntas = true;
//   indexScene = 1;
//   window.sceneIndices = 1;
//   button.textBlock.text = "Siguiente";
//   containerMeshesAreajuegos.addAllToScene();
//   console.log(window.sceneIndices);

//containerMeshesAreajuegos.removeAllFromScene();
//containerMeshesPreguntas.addAllToScene();
buttonPreguntas.isVisible = false;
buttonAJuegos.isVisible = true;

panelExamen.isVisible = true;
barraExamen.isVisible = true;

if (panelExamen2 !== undefined){
    panelExamen2.isVisible = true;
    barraExamen2.isVisible = true;   
}
	
if (panelCaja !== null){
    panelCaja.isVisible = false;
    panelCajaImg.isVisible = false;
}
if (panelCajaEsfera !== null){
    panelCajaEsfera.isVisible = false;
    panelEsferaImg.isVisible = false;
}
if (panelCajaCilinder !== null){
    panelCajaCilinder.isVisible = false;
    panelCilindroImg.isVisible = false;
}
if (panelCajaPiramid !== null){
    panelCajaPiramid.isVisible = false;
    panelPiramideImg.isVisible = false;
}
if (panelCajaCirculo !== null){
    panelCajaCirculo.isVisible = false;
    panelCirculoImg.isVisible = false;
}
if (panelCajaCuadrado !== null){
    panelCajaCuadrado.isVisible = false;
    panelCuadradoImg.isVisible = false;
}
if (panelCajaTriangulo !== null){
    panelCajaTriangulo.isVisible = false;
    panelTrianguloImg.isVisible = false;
}
if (panelCajaRectangulo !== null){
    panelCajaRectangulo.isVisible = false;
    panelRectanguloImg.isVisible = false;
}


});

advancedTexture.addControl(buttonPreguntas);

var buttonAJuegos = null;


//create a GUI button
buttonAJuegos = GUI.Button.CreateSimpleButton("but", "A la zona de juegos!");
buttonAJuegos.isVisible = false;
buttonAJuegos.width = 0.2;
buttonAJuegos.height = "40px";
buttonAJuegos.color = "white";
buttonAJuegos.background = "green";
buttonAJuegos.top = "10px";
buttonAJuegos.left = "10px";
buttonAJuegos.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
buttonAJuegos.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;



buttonAJuegos.onPointerUpObservable.add(function () {
    enZonaDePreguntas = false;
//containerMeshesAreajuegos.isVisible = true;
//containerMeshesPreguntas.addAllToScene();

buttonAJuegos.isVisible = false;
buttonPreguntas.isVisible = true;

panelExamen.isVisible = false;
barraExamen.isVisible = false;

if (panelExamen2 !== undefined){
    panelExamen2.isVisible = false;
    barraExamen2.isVisible = false;
}


if (panelCaja !== null){
    panelCaja.isVisible = true;
    panelCajaImg.isVisible = true;
}
if (panelCajaEsfera !== null){
    panelCajaEsfera.isVisible = true;
    panelEsferaImg.isVisible = true;
}
if (panelCajaCilinder !== null){
    panelCajaCilinder.isVisible = true;
    panelCilindroImg.isVisible = true;
}
if (panelCajaPiramid !== null){
    panelCajaPiramid.isVisible = true;
    panelPiramideImg.isVisible = true;
}
if (panelCajaCirculo !== null){
    panelCajaCirculo.isVisible = true;
    panelCirculoImg.isVisible = true;
}
if (panelCajaCuadrado !== null){
    panelCajaCuadrado.isVisible = true;
    panelCuadradoImg.isVisible = true;
}
if (panelCajaTriangulo !== null){
    panelCajaTriangulo.isVisible = true;
    panelTrianguloImg.isVisible = true;
}
if (panelCajaRectangulo !== null){
    panelCajaRectangulo.isVisible = true;
    panelRectanguloImg.isVisible = true;
}


});

advancedTexture.addControl(buttonAJuegos);
//buttonAJuegos.isVisible = false;

  // GUI box
    
  var meshGUIBox = BABYLON.MeshBuilder.CreatePlane("plano piso", {
    width: 1 * 1.8,
    height: 1,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
}, scene);

meshGUIBox.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

var advancedTextureCubo = GUI.AdvancedDynamicTexture.CreateForMesh(meshGUIBox);

var container = new GUI.Rectangle("container");
container.width = 1;
container.height = 1;
container.thickness = 0;
container.background = "white";
container.alpha = 0.05;
container.zIndex = -1;

advancedTextureCubo.addControl(container);
advancedTextureCubo.scaleTo(300, 150);

var button1 = GUI.Button.CreateSimpleButton("but1", "Cubo");
//button1.width = "400px";
//button1.height = "100px";
button1.color = "white";
button1.fontSize = 28;
button1.background = "green";

button1.onPointerUpObservable.add(function () {

    if (panelCaja == null) {

    [panelCaja,panelCajaImg]  = WindowUIImagen ("Panel cubo",1920,1080,cuboImg,scene);
    }

    //renderisar el panel de la caja con la caja

    scene.onBeforeRenderObservable.add(function () {
        panelCaja.position.x = box.position.x - 2;
        panelCaja.position.y = box.position.y + 2;
        panelCaja.position.z = box.position.z - 2;
        

    });
});

advancedTextureCubo.addControl(button1);

meshGUIBox.parent = box;
meshGUIBox.position.addInPlaceFromFloats(0, 2, 0);

// GUI sphere

var meshGUISphere = BABYLON.MeshBuilder.CreatePlane("plane sphere", {
    width: 1 * 1.8,
    height: 1,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
}, scene);

meshGUISphere.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

var advancedTextureSphere = GUI.AdvancedDynamicTexture.CreateForMesh(meshGUISphere);

var containerSphere = new GUI.Rectangle("container");
containerSphere.width = 1;
containerSphere.height = 1;
containerSphere.thickness = 0;
containerSphere.background = "white";
containerSphere.alpha = 0.05;
containerSphere.zIndex = -1;

advancedTextureSphere.addControl(containerSphere);
advancedTextureSphere.scaleTo(300, 150);

var buttonSphere = GUI.Button.CreateSimpleButton("but1", "Esfera");
//button1.width = "400px";
//button1.height = "100px";
buttonSphere.color = "white";
buttonSphere.fontSize = 28;
buttonSphere.background = "green";
var panelCajaEsfera = null;
var panelEsferaImg = null;
buttonSphere.onPointerUpObservable.add(function () {
    //alert("Lo hiciste!");
    
    if (panelCajaEsfera == null) {

        [panelCajaEsfera,panelEsferaImg]  = WindowUIImagen ("Panel esfera",1920,1080,esferaImg,scene);
    }
    
        scene.onBeforeRenderObservable.add(function () {
            panelCajaEsfera.position.x = sphere.position.x - 2;
            panelCajaEsfera.position.y = sphere.position.y + 2;
            panelCajaEsfera.position.z = sphere.position.z - 2;
        });

    /* .*/
    
});

advancedTextureSphere.addControl(buttonSphere);

meshGUISphere.parent = sphere;
meshGUISphere.position.addInPlaceFromFloats(0, 2, 0);

// GUI cilinder

var meshGUICilinder = BABYLON.MeshBuilder.CreatePlane("plane cilinder", {
    width: 1 * 1.8,
    height: 1,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
}, scene);

meshGUICilinder.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

var advancedTextureCilinder = GUI.AdvancedDynamicTexture.CreateForMesh(meshGUICilinder);

var containerCilinder = new GUI.Rectangle("container");
containerCilinder.width = 1;
containerCilinder.height = 1;
containerCilinder.thickness = 0;
containerCilinder.background = "white";
containerCilinder.alpha = 0.05;
containerCilinder.zIndex = -1;

advancedTextureCilinder.addControl(containerCilinder);
advancedTextureCilinder.scaleTo(300, 150);

var buttonCilinder = GUI.Button.CreateSimpleButton("but1", "Cilindro");
//button1.width = "400px";
//button1.height = "100px";
buttonCilinder.color = "white";
buttonCilinder.fontSize = 28;
buttonCilinder.background = "green";
var panelCajaCilinder = null;
var panelCilindroImg = null;
buttonCilinder.onPointerUpObservable.add(function () {
   // alert("Lo hiciste!");

    if (panelCajaCilinder == null) {

        [panelCajaCilinder,panelCilindroImg]  = WindowUIImagen ("Panel cilindro",1920,1080,cilindroImg,scene);
    }

        //renderisar el panel de la caja con la caja

        scene.onBeforeRenderObservable.add(function () {
            panelCajaCilinder.position.x = cylinder.position.x - 2;
            panelCajaCilinder.position.y = cylinder.position.y + 2;
            panelCajaCilinder.position.z = cylinder.position.z - 2;
        });

});

advancedTextureCilinder.addControl(buttonCilinder);

meshGUICilinder.parent = cylinder;
meshGUICilinder.position.addInPlaceFromFloats(0, 2, 0);

// GUI piramid

var meshGUIPiramid = BABYLON.MeshBuilder.CreatePlane("plane cone", {
    width: 1 * 1.8,
    height: 1,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
}, scene);

meshGUIPiramid.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

var advancedTextureCone = GUI.AdvancedDynamicTexture.CreateForMesh(meshGUIPiramid);

var containerPiramid = new GUI.Rectangle("container");
containerPiramid.width = 1;
containerPiramid.height = 1;
containerPiramid.thickness = 0;
containerPiramid.background = "white";
containerPiramid.alpha = 0.05;
containerPiramid.zIndex = -1;

advancedTextureCone.addControl(containerPiramid);
advancedTextureCone.scaleTo(300, 150);

var buttonCone = GUI.Button.CreateSimpleButton("but1", "Piramide");
//button1.width = "400px";
//button1.height = "100px";
buttonCone.color = "white";
buttonCone.fontSize = 28;
buttonCone.background = "green";
var panelCajaPiramid = null;
var panelPiramideImg = null;
buttonCone.onPointerUpObservable.add(function () {

    if (panelCajaPiramid == null) {

        [panelCajaPiramid,panelPiramideImg]  = WindowUIImagen ("Panel piramide",1920,1080,piramideImg,scene);
    }
        
        scene.onBeforeRenderObservable.add(function () {
            panelCajaPiramid.position.x = cone.position.x - 2;
            panelCajaPiramid.position.y = cone.position.y + 2;
            panelCajaPiramid.position.z = cone.position.z - 2;
        });
});

advancedTextureCone.addControl(buttonCone);

meshGUIPiramid.parent = cone;
meshGUIPiramid.position.addInPlaceFromFloats(0, 2, 0);

//GUI circulo

var meshGUICirculo = BABYLON.MeshBuilder.CreatePlane("plane circulo", {
    width: 1 * 1.8,
    height: 1,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
}, scene);

meshGUICirculo.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

var advancedTextureCirculo = GUI.AdvancedDynamicTexture.CreateForMesh(meshGUICirculo);

var containerCirculo = new GUI.Rectangle("container");
containerCirculo.width = 1;
containerCirculo.height = 1;
containerCirculo.thickness = 0;
containerCirculo.background = "white";
containerCirculo.alpha = 0.05;
containerCirculo.zIndex = -1;

advancedTextureCirculo.addControl(containerCirculo);
advancedTextureCirculo.scaleTo(300, 150);

var buttonCirculo = GUI.Button.CreateSimpleButton("but1", "Circulo");
//button1.width = "400px";
//button1.height = "100px";
buttonCirculo.color = "white";
buttonCirculo.fontSize = 28;
buttonCirculo.background = "green";
var panelCajaCirculo = null;
var panelCirculoImg = null;
buttonCirculo.onPointerUpObservable.add(function () {

    if (panelCajaCirculo == null) {

        [panelCajaCirculo,panelCirculoImg]  = WindowUIImagen ("Panel circulo",1920,1080,circuloImg,scene);

        }
        scene.onBeforeRenderObservable.add(function () {
            panelCajaCirculo.position.x = circulo.position.x + 2;
            panelCajaCirculo.position.y = circulo.position.y + 2;
            panelCajaCirculo.position.z = circulo.position.z + 2;
        });

});

advancedTextureCirculo.addControl(buttonCirculo);

meshGUICirculo.parent = circulo;
meshGUICirculo.position.addInPlaceFromFloats(0, 2, 0);

// GUI cuadrado

var meshGUICuadrado = BABYLON.MeshBuilder.CreatePlane("plane cuadrado", {
    width: 1 * 1.8,
    height: 1,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
}, scene);

meshGUICuadrado.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

var advancedTextureCuadrado = GUI.AdvancedDynamicTexture.CreateForMesh(meshGUICuadrado);

var containerCuadrado = new GUI.Rectangle("container");
containerCuadrado.width = 1;
containerCuadrado.height = 1;
containerCuadrado.thickness = 0;
containerCuadrado.background = "white";
containerCuadrado.alpha = 0.05;
containerCuadrado.zIndex = -1;

advancedTextureCuadrado.addControl(containerCuadrado);
advancedTextureCuadrado.scaleTo(300, 150);

var buttonCuadrado = GUI.Button.CreateSimpleButton("but1", "Cuadrado");
//button1.width = "400px";
//button1.height = "100px";
buttonCuadrado.color = "white";
buttonCuadrado.fontSize = 28;
buttonCuadrado.background = "green";
var panelCajaCuadrado = null;
var panelCuadradoImg = null;
buttonCuadrado.onPointerUpObservable.add(function () {

    if (panelCajaCuadrado == null) {

        [panelCajaCuadrado,panelCuadradoImg]  = WindowUIImagen ("Panel cuadrado",1920,1080,cuadradoImg,scene);

        }
        scene.onBeforeRenderObservable.add(function () {
            panelCajaCuadrado.position.x = cuadrado.position.x + 2;
            panelCajaCuadrado.position.y = cuadrado.position.y + 2;
            panelCajaCuadrado.position.z = cuadrado.position.z + 2;
        });

    /*"El cuadrado es una figura geométrica de cuatro lados iguales y cuatro ángulos rectos (de 90 grados).\n"  +
    "Todos los lados del cuadrado tienen la misma longitud. \n" + 
    "Las diagonales del cuadrado tienen la misma longitud y se cruzan en un ángulo de 90 grados. \n" +
    "El área del cuadrado se calcula multiplicando la longitud de uno de sus lados por sí mismo. \n" +
    "El perímetro del cuadrado se calcula sumando la longitud de sus cuatro lados.");*/
});

advancedTextureCuadrado.addControl(buttonCuadrado);

meshGUICuadrado.parent = cuadrado;
meshGUICuadrado.position.addInPlaceFromFloats(0, 2, 0);


// GUI Rectangulo

var meshGUIRectangulo = BABYLON.MeshBuilder.CreatePlane("plane rectangulo", {
    width: 1 * 1.8,
    height: 1,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
}, scene);

meshGUIRectangulo.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

var advancedTextureRectangulo = GUI.AdvancedDynamicTexture.CreateForMesh(meshGUIRectangulo);

var containerRectangulo = new GUI.Rectangle("container");
containerRectangulo.width = 1;
containerRectangulo.height = 1;
containerRectangulo.thickness = 0;
containerRectangulo.background = "white";
containerRectangulo.alpha = 0.05;
containerRectangulo.zIndex = -1;

advancedTextureRectangulo.addControl(containerRectangulo);
advancedTextureRectangulo.scaleTo(300, 150);

var buttonRectangulo = GUI.Button.CreateSimpleButton("but1", "Rectangulo");
//button1.width = "400px";
//button1.height = "100px";
buttonRectangulo.color = "white";
buttonRectangulo.fontSize = 28;
buttonRectangulo.background = "green";
var panelCajaRectangulo = null;
var panelRectanguloImg = null;
buttonRectangulo.onPointerUpObservable.add(function () {

    if (panelCajaRectangulo == null) {

        [panelCajaRectangulo,panelRectanguloImg]  = WindowUIImagen ("Panel rectangulo",1920,1080,rectanguloImg,scene);
        }
        scene.onBeforeRenderObservable.add(function () {
            panelCajaRectangulo.position.x = rectangulo.position.x + 2;
            panelCajaRectangulo.position.y = rectangulo.position.y + 2;
            panelCajaRectangulo.position.z = rectangulo.position.z + 2;
        });

    /*"El rectángulo es un polígono de cuatro lados, con dos pares de lados paralelos y de igual longitud. \n" +
    "Los lados paralelos se llaman bases y los otros dos lados se llaman lados. \n" +
    "El área del rectángulo se calcula multiplicando la longitud de la base por la altura. \n" +
    "El perímetro del rectángulo se calcula sumando la longitud de sus cuatro lados.");*/
});

advancedTextureRectangulo.addControl(buttonRectangulo);

meshGUIRectangulo.parent = rectangulo;
meshGUIRectangulo.position.addInPlaceFromFloats(0, 2, 0);


// GUI triangulo

var meshGUITriangulo = BABYLON.MeshBuilder.CreatePlane("plane triangulo", {
    width: 1 * 1.8,
    height: 1,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
}, scene);

meshGUITriangulo.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

var advancedTextureTriangulo = GUI.AdvancedDynamicTexture.CreateForMesh(meshGUITriangulo);

var containerTriangulo = new GUI.Rectangle("container");
containerTriangulo.width = 1;
containerTriangulo.height = 1;
containerTriangulo.thickness = 0;

containerTriangulo.background = "white";
containerTriangulo.alpha = 0.05;
containerTriangulo.zIndex = -1;

advancedTextureTriangulo.addControl(containerTriangulo);
advancedTextureTriangulo.scaleTo(300, 150);

var buttonTriangulo = GUI.Button.CreateSimpleButton("but1", "Triangulo");
//button1.width = "400px";
//button1.height = "100px";
buttonTriangulo.color = "white";
buttonTriangulo.fontSize = 28;
buttonTriangulo.background = "green";
var panelCajaTriangulo = null;
var panelTrianguloImg = null;
buttonTriangulo.onPointerUpObservable.add(function () {
    
    if (panelCajaTriangulo == null) {
        
        [panelCajaTriangulo,panelTrianguloImg]  = WindowUIImagen ("Panel triangulo",1920,1080,trianguloImg,scene);
        }
        scene.onBeforeRenderObservable.add(function () {
            panelCajaTriangulo.position.x = triangulo.position.x + 2;
            panelCajaTriangulo.position.y = triangulo.position.y + 2;
            panelCajaTriangulo.position.z = triangulo.position.z + 2;
        });

});

advancedTextureTriangulo.addControl(buttonTriangulo);

meshGUITriangulo.parent = triangulo;
meshGUITriangulo.position.addInPlaceFromFloats(0, 2.6, 0);


//////////////////////////////////////////////////////Panel creador de figuras///////////////////////////////////////////

// Crea un panel para los botones
var panel = new GUI.StackPanel();
panel.width = "220px";
panel.fontSize = "14px";
panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
advancedTexture.addControl(panel);

// Crea un botón para crear un cubo
var createCubeBtn = GUI.Button.CreateSimpleButton("createCubeBtn", "Crear Cubo");
createCubeBtn.width = "200px";
createCubeBtn.height = "40px";
createCubeBtn.color = "white";
createCubeBtn.background = "blue";
var EstaCuboCreado = false;
createCubeBtn.onPointerUpObservable.add(function() {

    var cube = BABYLON.MeshBuilder.CreateBox("cube", { height: 2, width: 2, depth: 2 }, scene);
    cube.position.y = 5;
    cube.position.x = 0;
    cube.position.z = 0;
    cube.checkCollisions = true;
    cube.material = Materials_Module.MaterialRandom();
    if (cube){

        cube.checkCollisions = true;
        cube.XRpickable = true;
        var cubo_impostor = new BABYLON.PhysicsImpostor(cube, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
        cone.physicsImpostor = cubo_impostor;
        console.log("Cubo creado");
    }
    

});
panel.addControl(createCubeBtn);

// Crea un botón para crear un cono
var createConeBtn = GUI.Button.CreateSimpleButton("createConeBtn", "Crear Cono");
createConeBtn.width = "200px";
createConeBtn.height = "40px";
createConeBtn.color = "white";
createConeBtn.background = "green";
createConeBtn.onPointerUpObservable.add(function() {

    var cone = BABYLON.MeshBuilder.CreateCylinder("cone", { diameterTop: 0, diameterBottom: 2, height: 3 }, scene);
    cone.position.y = 5;
    cone.position.x = 0;
    cone.position.z = 0;
    cone.checkCollisions = true;
    cone.material = Materials_Module.MaterialRandom();
    if (cone){
        
        cone.checkCollisions = true;
        cone.XRpickable = true;
        var cone_impostor = new BABYLON.PhysicsImpostor(cone, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, restitution: 0.9 }, scene);
        cone.physicsImpostor = cone_impostor;
        console.log("Cono creado");
    }
});
panel.addControl(createConeBtn);

// Crea un botón para crear un cilindro
var createCylinderBtn = GUI.Button.CreateSimpleButton("createCylinderBtn", "Crear Cilindro");
createCylinderBtn.width = "200px";
createCylinderBtn.height = "40px";
createCylinderBtn.color = "white";  
createCylinderBtn.background = "red";
createCylinderBtn.onPointerUpObservable.add(function() {
  
    var cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop: 2, diameterBottom: 2, height: 3 }, scene);
    cylinder.position.y = 5;
    cylinder.position.x = 0;
    cylinder.position.z = 0;
    cylinder.checkCollisions = true;
    cylinder.material = Materials_Module.MaterialRandom();
    if (cylinder){
        
        cylinder.checkCollisions = true;
        cylinder.XRpickable = true;
        var cylinder_impostor = new BABYLON.PhysicsImpostor(cylinder, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, restitution: 0.9 }, scene);
        cylinder.physicsImpostor = cylinder_impostor;
        console.log("Cilindro creado");
    }
});
panel.addControl(createCylinderBtn);


/////////containerscene////////
var containerMeshesAreajuegos = new BABYLON.AssetContainer(scene);
containerMeshesAreajuegos.meshes.push(meshGUITriangulo, meshGUIRectangulo, meshGUICuadrado, meshGUICirculo, meshGUIPiramid, meshGUISphere, meshGUICilinder, meshGUICirculo, meshGUIRectangulo, meshGUITriangulo, meshGUICuadrado, meshGUICirculo, meshGUIPiramid, meshGUISphere, meshGUICilinder, meshGUIRectangulo,meshGUIBox, meshGUITriangulo, meshGUICuadrado, meshGUICirculo, meshGUIPiramid, meshGUISphere, meshGUICilinder, meshGUIRectangulo, meshGUITriangulo, meshGUICuadrado, meshGUICirculo, meshGUIPiramid, meshGUISphere, meshGUICilinder, meshGUIRectangulo, meshGUITriangulo, meshGUICuadrado, meshGUICirculo, meshGUIPiramid, meshGUISphere, meshGUICilinder, meshGUIRectangulo, meshGUITriangulo, meshGUICuadrado, meshGUICirculo, meshGUIPiramid, meshGUISphere, meshGUICilinder);
containerMeshesAreajuegos.addAllToScene();
//containerMeshesAreajuegos.removeAllFromScene();

var containerMeshesPreguntas = new BABYLON.AssetContainer(scene);
containerMeshesPreguntas.meshes.push( panelImagen, panelExamen, barraExamen);
//containerMeshesPreguntas.removeAllFromScene();


///////panel de preguntas///////
//var panelPreguntas = WindowUICreadorDeFiguras("Panel preguntas",1920,1080,"¿Qué figura quieres crear?",scene);

var panelImagen = WindowUIImagen("Panel imagen",1920,1080,introduccionImg,scene);

var [barraExamen, panelExamen,barraExamen2 ,panelExamen2] = WindowUIVariasImagenes("Panel examen",1920,1080,bienvenidaPreguntas,scene);

barraExamen.position.x = 0;
barraExamen.position.y = 2;
barraExamen.position.z = -12;
barraExamen.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.LOCAL);
barraExamen.rotate(BABYLON.Axis.X, Math.PI/6, BABYLON.Space.LOCAL);

barraExamen.isVisible = false;
panelExamen.isVisible = false;

/////////segundo panel de preguntas///////

// var [barraExamen2 ,panelExamen2] = WindowUIVariasImagenesV2("Panel segundo examen",1920,1080,preguntas2,scene);



// barraExamen2.position.x = 3;
// barraExamen2.position.y = 2;
// barraExamen2.position.z = -12;
// barraExamen2.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.LOCAL);
// barraExamen2.rotate(BABYLON.Axis.X, Math.PI/6, BABYLON.Space.LOCAL);

// barraExamen2.isVisible = false;
// panelExamen2.isVisible = false;





///////////////////////////////boton de ayuda ////////////////////////////
var buttonAyuda = null
buttonAyuda = GUI.Button.CreateSimpleButton("ayuda", "ayuda");
buttonAyuda.width = "150px"
buttonAyuda.height = "40px";
buttonAyuda.color = "white";
buttonAyuda.background = "green";
buttonAyuda.top = "-15px";
buttonAyuda.left = "15px";
////buttonAyuda.right = "15px";
buttonAyuda.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
buttonAyuda.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;


var panelAyuda = null;

buttonAyuda.onPointerUpObservable.add(function () {
    if (panelAyuda == null) {
        panelAyuda = WindowUIImagen("Panel ayuda",1920,1080,ayudaImg,scene);
    }
    panelAyuda.isVisible = !panelAyuda.isVisible;
});

advancedTexture.addControl(buttonAyuda);


////////////////////////////////video de introduccion///////////////////////////////


var videoSize = 1;

let videoTextureSettings = {
    loop: false,
    autoPlay: false,
    autoUpdateTexture: true,
    muted: true,
    poster: ''
};

var AudioSettings = {
    loop: false,
    autoPlay: false,
    spatialSound: true,
    distanceModel: "exponential",
    maxDistance: 10,
    refDistance: 5,
    rolloffFactor: 0.8,
};

var videoPlaneOptions = {
    height: videoSize,
    width: videoSize * 1.77,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
};


//var videoPlayer = AV_module.VideoPlayerTexture(video, null, videoTextureSettings, AudioSettings, videoPlaneOptions, scene);
//////////////prueba de video//////////////

var pruebaVideo = AV_module.VideoTexture(video, scene);



////////subsescena////////

var sceneIndices = 0;
window.sceneIndices = sceneIndices;

var renderActual
engine.runRenderLoop(() => {


switch(window.sceneIndices){
    case 2:
        scene.isVisible = true;

        
        break;
    case 1:
        console.log("entro a la subescena");
        var sub1 = subscene1.createSubScene(engine, canvas);
        renderActual = sub1;
        sub1.render();
        window.sceneIndices = 5;
        console.log("render actual"+window.sceneIndices);
        break;

        
    case 5:
        console.log("render actual"+renderActual);
        renderActual.render();
        break;

      }
});

}

export function mandarIndex(index) {
    console.log(index);
    return index;
}


function Scene() {

  return (
      <SceneComponent antialias onSceneReady={onSceneReady} />

  );
}

export default Scene;
