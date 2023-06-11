import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import "babylonjs-loaders";

//import * as AV_module from '../Modules/AV_module.js';

// export function videoSubScene(subScene, video){

// const assetManager = new BABYLON.AssetsManager(subScene);

// assetManager.load();



// var videoSize = 1;

// let videoTextureSettings = {
//     loop: false,
//     autoPlay: false,
//     autoUpdateTexture: true,
//     muted: true,
//     poster: ''
// };

// var AudioSettings = {
//     loop: false,
//     autoPlay: false,
//     spatialSound: true,
//     distanceModel: "exponential",
//     maxDistance: 10,
//     refDistance: 5,
//     rolloffFactor: 0.8,
// };

// var videoPlaneOptions = {
//     height: videoSize,
//     width: videoSize * 1.77,
//     sideOrientation: BABYLON.Mesh.DOUBLESIDE
// };



//videoplayer.videoSound.attachToMesh(collider);



// let videoCube = BABYLON.MeshBuilder.CreateBox("videocube", { size: 2 }, subScene);
// videoCube.position = new BABYLON.Vector3(0, 5, 50);
// videoCube.physicsImpostor = new BABYLON.PhysicsImpostor(videoCube, BABYLON.PhysicsImpostor.BoxImpostor, { restitution: 0.9, mass: 1 }, subScene);
// videoCube.XRpickable = true;
// videoCube.lookAt(BABYLON.Camera.position);

// videoCube.actionManager = new BABYLON.ActionManager(subScene)

//VideoTextureToMesh(video, videoCube, { loop: true, autoPlay: true, muted: true }, subScene);


//}

export function diposeVideo(video){
    video.dispose();
}   





export function VideoTexture(videoURL, scene) {

    var planeOpts = {
        height: 1080 * 0.004, 
        width: 1920 * 0.004, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    };

    let videoTextureSettings = {
        loop: false,
        autoPlay: false,
        autoUpdateTexture: true
    };
    
    var ANote0Video = BABYLON.MeshBuilder.CreatePlane("plane", planeOpts, scene);
    var vidPos = (new BABYLON.Vector3(0,4,10))
    ANote0Video.position = vidPos;
    var ANote0VideoMat = new BABYLON.StandardMaterial("m", scene);
    ANote0VideoMat.diffuseColor = new BABYLON.Color3.White();
    var ANote0VideoVidTex = new BABYLON.VideoTexture("videoTexture", videoURL,
    scene, true, false,
    BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE, videoTextureSettings); 
    ANote0VideoMat.diffuseTexture = ANote0VideoVidTex;
    ANote0VideoMat.roughness = 1;
    ANote0VideoMat.emissiveColor = new BABYLON.Color3.White();
    ANote0Video.material = ANote0VideoMat;
    ANote0Video.xrPickable = true;

    var botons_mesh = BABYLON.MeshBuilder.CreatePlane("plane", {
        height: 30,
        width: 1920 * 0.009,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    botons_mesh.parent = ANote0Video;

    // obtener el borde minimo del video con respecto a y
    let min_y = ANote0Video.getBoundingInfo().boundingBox.minimumWorld.y;
    botons_mesh.position = new BABYLON.Vector3(0, min_y - 2, 0);

    var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(botons_mesh);

    var windowAcciones = new GUI.Grid("window_acciones")
    windowAcciones.addColumnDefinition(0.5);
    windowAcciones.addColumnDefinition(0.5);

    let button_controls = GUI.Button.CreateSimpleButton("button_controls", "Reproducir");
    button_controls.color = "white";
    button_controls.background = "green";
    button_controls.width = "150px";
    button_controls.height = "40px";
    button_controls.top = "-40px";
    button_controls.left = "40px";
    windowAcciones.addControl(button_controls, 0, 1);

    button_controls.onPointerClickObservable.add(function () {

        if (ANote0VideoVidTex.video.paused) {

            ANote0VideoVidTex.video.play();
            
            button_controls.background = "yellow";
            button_controls.color = "black";

            button_pause.background = "red";
            button_pause.color = "white";


        } 

    });

    let button_pause = GUI.Button.CreateSimpleButton("button_pause", "Pausar");
    button_pause.color = "white";
    button_pause.background = "red";
    button_pause.width = "150px";
    button_pause.height = "40px";
    button_pause.top = "-40px";
    button_pause.left = "-40px";
    windowAcciones.addControl(button_pause, 0, 0);

    button_pause.onPointerClickObservable.add(function () {
        if ( ANote0VideoVidTex.video.played ) {

            ANote0VideoVidTex.video.pause();
            button_controls.textBlock.text = "Reproducir";
            button_controls.background = "green";
            button_controls.color = "white";

            button_pause.background = "yellow";
            button_pause.color = "black";

        }
    });


    advancedTexture.addControl(windowAcciones);

    

    return {ANote0Video, ANote0VideoVidTex, button_controls, button_omited: button_pause, advancedTexture};

}

