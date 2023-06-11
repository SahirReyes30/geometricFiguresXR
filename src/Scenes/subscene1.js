import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import "babylonjs-loaders";



 //FUNCTION TO CREATE A SUBSCENE
 export  function createSubScene(engine,canvas) {

    var canvas = canvas
    //instance of a scene
    var subScene = new BABYLON.Scene(engine);

    //first we create a camera
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 10, BABYLON.Vector3.Zero(), subScene);

    camera.attachControl(canvas, true);

    //then we create a light
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), subScene);
    //then we create a box
    var box = BABYLON.MeshBuilder.CreateBox("box1", { size: 2 }, subScene);
    //then we create a ground
    var ground = BABYLON.MeshBuilder.CreateGround("ground1", { width: 6, height: 6 }, subScene);

    //then we create a material
    var material = new BABYLON.StandardMaterial("material1", subScene);
    material.diffuseColor = new BABYLON.Color3(1, 0, 0);    
    //then we apply the material to the box
    box.material = material;

    //create a panel 





    //crear boton
    /*
      var advancedTextureFullScreen = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, subScene);

      var button1 = GUI.Button.CreateSimpleButton("but1", "A modo XR");
      button1.width = "150px"
      button1.height = "40px";
      button1.color = "white";
      button1.background = "green";
      button1.onPointerUpObservable.add(function() {
         //indexScene = 0;
         engine.switchFullscreen(true);
         engine.enterFullscreen(true);
         engine.enterXR();
      });
      advancedTextureFullScreen.addControl(button1);
      */
      // GUI

      var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, subScene);
      var button = null;
      
      //create a GUI button
      button = GUI.Button.CreateSimpleButton("but", "A la zona de juegos!");
      button.width = 0.2;
      button.height = "40px";
      button.color = "white";
      button.background = "green";
      button.top = "10px";
      button.left = "10px";
      button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

      console.log("subScene");
      
      button.onPointerUpObservable.add(function () {
        
        window.sceneIndices = 2;
        subScene.dispose();
      
      
      });
      
      
      advancedTexture.addControl(button);

    return subScene;
 }