import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";

/**
   * Module to start XR functionalities (with auto XR mode detection).
   * @param {BABYLON.Mesh} ground the instanced babylon js ground.
   * @param {BABYLON.Mesh} skybox the instanced babylon js skybox.
   * @param {BABYLON.Scene} scene the instanced babylon js scene.
   * @returns the promised XR default experience instance.
   */
export async function XR_Experience(ground, skybox, scene) {


    let inmersive_state = "inline";
    let reference_floor = "local-floor"

    let avaliableVR = await BABYLON.WebXRSessionManager.IsSessionSupportedAsync("immersive-vr");
    let avaliableAR = await BABYLON.WebXRSessionManager.IsSessionSupportedAsync("immersive-ar");


    console.log("AR mode avaliable: " + avaliableAR);
    console.log("VR mode avaliable: " + avaliableVR);

    if (avaliableVR) {

        inmersive_state = "immersive-vr";

        if (avaliableAR) {

            inmersive_state = "immersive-ar";

        }
    }


    const xr = scene.createDefaultXRExperienceAsync({
        disableDefaultUI: true,
        disableNearInteraction: true,
        disablePointerSelection: false,
        disableTeleportation: true,

        floorMeshes: [ground],

        uiOptions: {
            sessionMode: inmersive_state,
            referenceSpaceType: reference_floor

        },

        inputOptions: {
            doNotLoadControllerMeshes: false,

        }


    });


    return xr.then((xrExperience) => {

        xrExperience.baseExperience.onStateChangedObservable.add((XRstate) => {

            if (avaliableVR) {



                switch (XRstate) {
                    case BABYLON.WebXRState.IN_XR:
                        // XR is initialized and already submitted one frame
                        break
                    case BABYLON.WebXRState.ENTERING_XR:
                        // xr is being initialized, enter XR request was made
                        break
                    case BABYLON.WebXRState.EXITING_XR:
                        // xr exit request was made. not yet done.
                        break
                    case BABYLON.WebXRState.NOT_IN_XR:
                        // self explanatory - either out or not yet in XR
                        break
                }

            }


            if (avaliableAR) {

                switch (XRstate) {
                    case BABYLON.WebXRState.IN_XR:
                        // XR is initialized and already submitted one frame
                        break
                    case BABYLON.WebXRState.ENTERING_XR:
                        // xr is being initialized, enter XR request was made
                        if (ground) {
                            ground.visibility = 0;
                        }
                        if (skybox) {
                            skybox.isVisible = false;
                        }
                        break
                    case BABYLON.WebXRState.EXITING_XR:
                        // xr exit request was made. not yet done.
                        break
                    case BABYLON.WebXRState.NOT_IN_XR:
                        // self explanatory - either out or not yet in XR
                        if (ground) {
                            ground.visibility = 1;
                        }
                        if (skybox) {
                            skybox.isVisible = true;
                        }
                        break
                }

            }



        });

        var advancedTextureFullScreen = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

        var button1 = GUI.Button.CreateSimpleButton("but1", "A modo XR");
        button1.width = "150px"
        button1.height = "40px";
        button1.color = "white";
        button1.cornerRadius = 20;
        button1.background = "green";
        button1.fontSize = "20px"
        button1.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        button1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        button1.topInPixels = -5;
        button1.leftInPixels =-5;


        button1.onPointerUpObservable.add(function () {

            if (xrExperience.baseExperience.state === BABYLON.WebXRState.NOT_IN_XR) {

                xrExperience.baseExperience.enterXRAsync(inmersive_state, reference_floor);

            } else if (xrExperience.baseExperience.state === BABYLON.WebXRState.IN_XR) {

                xrExperience.baseExperience.exitXRAsync();
            }


        });
        advancedTextureFullScreen.addControl(button1);


        // GUI
        /*var meshGUI = BABYLON.MeshBuilder.CreatePlane("plane", {
            width: 1 * 1.8,
            height: 1,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, scene);

        meshGUI.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
        var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(meshGUI);

        var container = new GUI.Rectangle("container");
        container.width = 1;
        container.height = 1;
        container.thickness = 0;
        container.background = "white";
        container.alpha = 0.05;
        container.zIndex = -1;

        advancedTexture.addControl(container);
        advancedTexture.scaleTo(300, 150);
/*
        var button1 = GUI.Button.CreateSimpleButton("but1", "A modo XR");
        //button1.width = "400px";
        //button1.height = "100px";
        button1.color = "white";
        button1.fontSize = 28;
        button1.background = "green";
        button1.onPointerUpObservable.add(function () {

            if (xrExperience.baseExperience.state === BABYLON.WebXRState.NOT_IN_XR) {

                xrExperience.baseExperience.enterXRAsync(inmersive_state, reference_floor);

            } else if (xrExperience.baseExperience.state === BABYLON.WebXRState.IN_XR) {

                xrExperience.baseExperience.exitXRAsync();
            }

        });
        advancedTexture.addControl(button1);

        meshGUI.position.addInPlaceFromFloats(0, 2, 0);
*/

        console.log("Se ha cargado funciones XR satisfactoriamente.");
        return xrExperience;
    })


}


/**
 * 
 * @param {BABYLON.WebXRDefaultExperience} xrExperience 
 * @param {GUI.AdvancedDynamicTexture} advancedTextureFullScreen 
 * @param {BABYLON.Scene} scene 
 */
function basicAnchorSystem(xrExperience, advancedTextureFullScreen, scene) {

    const { featuresManager } = xrExperience.baseExperience;

    featuresManager.enableFeature(BABYLON.WebXRBackgroundRemover);

    // step 1 - enable hit test and anchor system from the features manager. 

    const hitTest = featuresManager.enableFeature(BABYLON.WebXRHitTest, 'latest');

    const anchorSystem = featuresManager.enableFeature(BABYLON.WebXRAnchorSystem, 'latest');

    // Step 2 - create a dot (sphere) that will be used to show the hit test result

    const dot = BABYLON.SphereBuilder.CreateSphere('dot', {
        diameter: 0.05
    }, scene);
    dot.rotationQuaternion = new BABYLON.Quaternion();

    dot.material = new BABYLON.StandardMaterial('dot', scene);
    dot.material.emissiveColor = BABYLON.Color3.Red();

    dot.isVisible = false;

    let lastHitTest = null;

    const pairs = []; //measurement pair array
    let currentPair = null; //current measurement pair

    // Step 3 - listen to the hit test results and place the dot accordingly.

    hitTest.onHitTestResultObservable.add((results) => {
        //if we have a hit test result
        if (results.length) {
            //set the dot position to the hit test result
            dot.isVisible = true;
            results[0].transformationMatrix.decompose(dot.scaling, dot.rotationQuaternion, dot.position);
            lastHitTest = results[0];

        } else {
            lastHitTest = null;
            dot.isVisible = false;
        }
    });

    // process to create pairs of dots
    const processClick = () => {
        const newDot = dot.clone('newDot');
        
            const label = new GUI.Rectangle("label");
            label.background = "black"
            label.height = "60px";
            label.alpha = 0.5;
            label.width = "200px";
            label.cornerRadius = 20;
            label.thickness = 1;
            label.zIndex = 5;
            advancedTextureFullScreen.addControl(label);

            const text = new GUI.TextBlock("testlabel", "ancla");
            text.color = "white";
            text.fontSize = "36px"
            label.addControl(text);

            label.linkWithMesh(newDot);

            return newDot;
        } 
       

    // Step 4 - listen to the pointer down event to create an anchor
    scene.onPointerObservable.add(async (eventData) => {
        if (lastHitTest) {
            if (lastHitTest.xrHitResult.createAnchor) {
                const anchor = await anchorSystem.addAnchorPointUsingHitTestResultAsync(lastHitTest);
            } else {
                processClick();
            }
        }
    }, BABYLON.PointerEventTypes.POINTERDOWN);

    anchorSystem.onAnchorAddedObservable.add((anchor) => {
        anchor.attachedNode = processClick();
    });


}
