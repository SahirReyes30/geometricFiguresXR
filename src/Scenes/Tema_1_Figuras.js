
import React from "react";
import * as BABYLON from "babylonjs";
import * as MATERIALS from "babylonjs-materials"
import SceneComponent from "../Babylon_components/SceneComponent"; 
import * as Materials_Module from "../Modules/Materials_Module";
import * as GUI from "babylonjs-gui"

import {GizmoInterface} from "../Modules/GizmoInterface"
import * as Babylon_Components from "../Babylon_components"
import ammo from "ammo.js"
import * as XR_Module from "../Modules/XR_Module"
import { PlayGround } from "../Babylon_components/PlayGround";

import * as subscene1 from "./subscene1"

// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.


const onSceneReady = async (e = { engine: new BABYLON.Engine, scene: new BABYLON.Scene, canvas: new HTMLCanvasElement }) => {

  const { canvas, scene, engine } = e;
  // This creates and positions a free camera (non-mesh)
  const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, false);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;


  //playground = Babylon_Components.PlayGround();

  var playground = PlayGround({ playground_width: 100, playground_depth: 100 }, scene)
  playground.ground.physicsImpostor = new BABYLON.PhysicsImpostor(playground.ground, BABYLON.PhysicsImpostor.BoxImpostor, { restitution: 0.9, mass: 0 }, scene);

  scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.AmmoJSPlugin(true, await ammo()));
  
  var ground_impostor = new BABYLON.PhysicsImpostor(playground.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  playground.ground.physicsImpostor = ground_impostor;

  
  //scene.debugLayer.show();

  //scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.AmmoJSPlugin(true, await ammo()));
 
  //Display 3D axes
  //const axes3D = new BABYLON.AxesViewer(scene,2)

  // Our built-in shapes examples.
  var box_material = Materials_Module.MaterialRandom();
  var box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
  box.material = box_material;
  
  var box_impostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
  box.physicsImpostor = box_impostor;

  var sphere_material = Materials_Module.MaterialRandom();
  var sphere = BABYLON.MeshBuilder.CreateSphere("sphere",{diameterX:2,diameterY:2,diameterZ:2},scene)
  sphere.material = sphere_material;

  var sphere_impostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
  sphere.physicsImpostor = sphere_impostor;

  var cone_material = Materials_Module.MaterialRandom();
  var cone = BABYLON.MeshBuilder.CreateCylinder("cone",{height:2,diameterTop:0,diameterBottom:2,tessellation:4},scene)
  cone.material = cone_material;

  var cone_impostor = new BABYLON.PhysicsImpostor(cone, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, restitution: 0.9 }, scene);
  cone.physicsImpostor = cone_impostor;

  var cylinder_material = Materials_Module.MaterialRandom();
  var cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2, diameter: 2}, scene);
  cylinder.material = cylinder_material;

  var cylinder_impostor = new BABYLON.PhysicsImpostor(cylinder, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, restitution: 0.9 }, scene);
  cylinder.physicsImpostor = cylinder_impostor;
  
  //const XR = XR_Module.XR_Experience(playground.ground , skybox ,scene);

  //Gizmo
  var gizmointerface = GizmoInterface(scene);
  box.XRpickable = true;
  sphere.XRpickable = true;
  cone.XRpickable = true;
  cylinder.XRpickable = true;

  gizmointerface.gizmos.boundingBoxGizmo.setEnabledScaling(false);


  // Our built-in 'ground' shape.
  var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 30, height: 30,subdivisions:30 }, scene);

  // Move the position of each shape
  box.position.x = 0;
  box.position.y = 1;
  box.position.z = 0;



  sphere.setAbsolutePosition(new BABYLON.Vector3(-3,1,0));
  var newSpherePosition = sphere.position.addInPlace(new BABYLON.Vector3(0,0,0));
  console.log(newSpherePosition)

  cone.setAbsolutePosition(new BABYLON.Vector3(3,1,0));

  cylinder.setAbsolutePosition(new BABYLON.Vector3(6,1,0));
////////////////////////////////////////////////////////////////////////////////////////
  // This creates a GUI3DManager for 3D controls
  var manager = new GUI.GUI3DManager(scene);
  // This section shows how to use a HolographicSlate as a dialog box
  var dialogSlate = new GUI.HolographicSlate("dialogSlate");
  dialogSlate.titleBarHeight = 0; // Hides default slate controls and title bar
  manager.addControl(dialogSlate);
  dialogSlate.dimensions = new BABYLON.Vector2(5, 5);
  dialogSlate.position = new BABYLON.Vector3(0, 15, 30);
  
  var contentGrid = new GUI.Grid("grid");
  //var buttonLeft = GUI.Button.CreateSimpleButton("left", "Accept");
  //var buttonRight = GUI.Button.CreateSimpleButton("right", "Decline");
  var title = new GUI.TextBlock("title");
  var text = new GUI.TextBlock("text");
  
  /*buttonLeft.width = 0.5;
  buttonLeft.height = 0.2;
  buttonLeft.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  buttonLeft.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
  buttonLeft.textBlock.color = "white";
  buttonLeft.onPointerUpObservable.add(()=>{
      alert("yay!");
      // dialogSlate.dispose();
  });

  buttonRight.width = 0.5;
  buttonRight.height = 0.2;
  buttonRight.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  buttonRight.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
  buttonRight.textBlock.color = "white";
  buttonRight.onPointerUpObservable.add(()=>{
      alert("aww...");
      // dialogSlate.dispose();
  });*/
  title.height = 0.2;
  title.color = "white";
  title.textWrapping = GUI.TextWrapping.WordWrap;
  title.setPadding("5%", "5%", "5%", "5%");
  title.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  title.text = "Zona de juegos?"
  title.fontWeight = "bold";

  text.height = 0.8;
  text.color = "white";
  text.textWrapping = GUI.TextWrapping.WordWrap;
  text.setPadding("5%", "5%", "5%", "5%");
  text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  text.text = "Que figura quieres conocer \n h ."

  // contentGrid.addControl(buttonLeft);
  // contentGrid.addControl(buttonRight);
  contentGrid.addControl(title);
  contentGrid.addControl(text);
  contentGrid.background = "#000080";
  dialogSlate.content = contentGrid;
  dialogSlate.position = new BABYLON.Vector3(0, 25, 30);

//////////////Rotacion de las figuras/////////////////////////
  //scene.onBeforeRenderObservable.add(() =>{
    //if (box !== undefined) {
    //  const deltaTimeInMillis = scene.getEngine().getDeltaTime();
  
   //    const rpm = 30
   //   box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000); 
     //cone.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);  
     //sphere.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);   
  // } 
  //});

  //on click event

  var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

  var sub1 = subscene1.createSubScene(engine, canvas);

  var mainUI = ChangeSceneUIDemo(1, advancedTexture, scene);
  var ui1 = ChangeSceneUIDemo(2, advancedTexture, sub1);

  var renderLoopController = RenderLoopController(engine, scene, mainUI);

  renderLoopController.addScene(sub1, ui1);
  

     /**
     * Function to control the render loop of the engine
     * @param {BABYLON.Engine} engine the main engine
     * @param {GUI.AdvancedDynamicTexture} onScreenUI the UI to be displayed on the screen
     * @returns functions to add and remove subscenes from the render loop
     */
     function RenderLoopController(engine, scene, onScreenUI) {

      var sceneindex = 0;
      var subScenes = [];
      var rendering = true;

      var currentScene = { scene, ui: onScreenUI }
      subScenes.push(currentScene);

      currentScene.ui.Create();

      function addScene(scene, ui) {

          var subScene = { scene, ui }
          subScenes.push(subScene);
      }

      function setSceneIndex(index) {

          rendering = false;

          console.log("changing scene to " + index + "");

          subScenes[sceneindex].ui.Dispose();

          console.log("current ui disposed");

          sceneindex = index;

          var currentUI = subScenes[sceneindex].ui;
          currentUI.Create();

          rendering = true;


      }

      function getSceneIndex() {
          return sceneindex;
      }

      function getSceneIndexLength() {
          return subScenes.length;
      }


      engine.runRenderLoop(() => {

          if (subScenes[sceneindex] && rendering) {

              subScenes[sceneindex].scene.render();

          }

      });

      //var view = engine.registerView(canvas, camera);
      //engine.activeView.target= view;

      return { addScene, setSceneIndex, getSceneIndex, getSceneIndexLength };


  }

    /**
     * 
     * @param {Number} index 
     * @param {GUI.AdvancedDynamicTexture} advancedTexture 
     * @param {BABYLON.Scene} scene 
     * @returns 
     */
    function ChangeSceneUIDemo(index, advancedTexture, scene) {


      function Create() {

          advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
          var button = null;

          //create a GUI button
          button = GUI.Button.CreateSimpleButton("but", "A la escena " + index + "");
          button.width = 0.2;
          button.height = "40px";
          button.color = "white";
          button.background = "green";
          button.top = "10px";
          button.left = "10px";
          button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
          button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

          button.onPointerUpObservable.add(function () {

              renderLoopController.setSceneIndex(index);
              /*
                  if (index > renderLoopController.getSceneIndexLength() - 1) {
                      index = 0;
                      renderLoopController.setSceneIndex(index);
                  } else {
                      renderLoopController.setSceneIndex(index);
                      index++;
                  } */

          });


          advancedTexture.addControl(button);


      }

      function Dispose() {
          advancedTexture.dispose();
          advancedTexture = null;

      }

      return { advancedTexture, Create, Dispose };
      
  }
}


function Scene() {

  return (
      <SceneComponent antialias onSceneReady={onSceneReady} />

  );
}

export default Scene;
