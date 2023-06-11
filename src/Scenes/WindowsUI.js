import * as BABYLON from 'babylonjs';
import "babylonjs-loaders"
import * as GUI from 'babylonjs-gui';
import next from '../Modules/next.png';
import examenCubo from '../Modules/examenCubo.png';
import examenCilindro from '../Modules/examenCilindro.png';
import examenPiramide from '../Modules/examenPiramide.png';
import examenEsfera from '../Modules/examenCirculo.png';
import pasaste from '../Modules/pasaste.png';
import noPasaste from '../Modules/noPasaste.png';


/**
 * 
 * @param {string} name the name of the window
 * @param {number} width the width of the window in pixels
 * @param {number} height the height of the window in pixels
 * @param {string} text the text to be displayed in the window
 * @param {BABYLON.Scene} scene the instanced BABYLON.js scene
 * @returns returns the UI elements for the window.
 */
export function WindowUI(name,width,height,text,scene) {

    var barMesh = BABYLON.MeshBuilder.CreatePlane("windown_plane", {
        width: width*0.001  ,
        height: 150*0.001,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    barMesh.XRpickable = true;
    barMesh.nonXREditable = true;


    var bar_texture = GUI.AdvancedDynamicTexture.CreateForMesh(barMesh);
    bar_texture.scaleTo(width, 150);



    var bar_rectangle = new GUI.Rectangle("container");
    //win_rectangle.width = 1;
    //win_rectangle.height = 1;

    //container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    //container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    bar_rectangle.cornerRadius = 20;
    bar_rectangle.color = "#2acaea";
    bar_rectangle.thickness = 7;
    bar_rectangle.background = '#00000066';

    //container.paddingTopInPixels = 15;
    //container.paddingLeftInPixels = 15;
    //container.zIndex=-1;


    var bar_grid = new GUI.Grid("win_grid")
    bar_grid.addRowDefinition(1);
    bar_grid.addColumnDefinition(.77,false); //1400px
    bar_grid.addColumnDefinition(150,true); //150px
    bar_grid.addColumnDefinition(150,true); //150px
    bar_grid.addColumnDefinition(150,true); //150px

    const win_text_name = new GUI.TextBlock("win_text_name");
    win_text_name.fontFamily = "Helvetica";
    //win_text_name.textWrapping = true;
    win_text_name.text = name;
    win_text_name.color = "white";
    win_text_name.fontSize = 50;
    //win_text_name.height = "200px";
    win_text_name.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    win_text_name.paddingLeftInPixels = 15;

    /*var close_button = GUI.Button.CreateImageOnlyButton("close_button", "images/close.png");
    //close_button.color = "transparent"
    close_button.background = '#ea2a2ad9';
    close_button.image.fixedRatio = 1;
    close_button.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;*/

    var follow_button = GUI.Button.CreateImageOnlyButton("maximize_button", "images/centering.png");
    //minimize_button.color = "#2acaea"
    follow_button.background = '#2acaead9';
    follow_button.image.fixedRatio = 1;
    //follow_button.image.width = 0.9;
    follow_button.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    var min_max_button = GUI.Button.CreateImageOnlyButton("minimize_button", "images/minimize.png");
    //minimize_button.color = "#2acaea"
    min_max_button.background = '#ea2a2ad9';
    min_max_button.image.fixedRatio = 1;
    min_max_button.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;


    bar_grid.addControl(win_text_name, 0, 0);
    bar_grid.addControl(min_max_button, 0, 3);
    bar_grid.addControl(follow_button, 0, 2);
    //bar_grid.addControl(close_button, 0, 3);


    bar_rectangle.addControl(bar_grid);
    bar_texture.addControl(bar_rectangle);


    var windowMesh = BABYLON.MeshBuilder.CreatePlane("windowUI", {
        width: width * (0.001),
        height: height * (0.001),
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    }, scene);


    var ajust_pos = windowMesh.getBoundingInfo().boundingBox.maximum.y + barMesh.getBoundingInfo().boundingBox.maximum.y
    var change_axis = new BABYLON.Vector3(0, -ajust_pos, .02);

    var local_pos = new BABYLON.Vector3(-0.7, 1, 0);
    barMesh.position = local_pos;

    windowMesh.parent = barMesh;
    windowMesh.position = change_axis;

    barMesh.lookAt(scene.activeCamera.position, Math.PI, 0, 0, BABYLON.Space.WORLD);



    var window_texture =  GUI.AdvancedDynamicTexture.CreateForMesh(windowMesh);
    window_texture.scaleTo(width, height);

    var window_rectangle = new GUI.Rectangle("Rectangle");
    window_rectangle.background = "#ffffffd9";
    window_rectangle.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    window_rectangle.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    window_rectangle.width = 1;
    window_rectangle.height = 1;




    window_texture.addControl(window_rectangle);


    var window_text = new GUI.TextBlock("window_text");
    window_text.fontFamily = "Helvetica";
    window_text.textWrapping = true;
    window_text.text = text;
    window_text.color = "black";
    window_text.fontSize = 50;
    window_rectangle.addControl(window_text);
    
    window_texture.addControl(window_rectangle);



    var animation_framerate = 10;

    var window_close = new BABYLON.Animation("close", "scaling.y", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var window_rectangle_close = new BABYLON.Animation("close", "height", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    const keyframes = [];

    keyframes.push({
        frame: 0,
        value: 1
    });

    keyframes.push({
        frame: animation_framerate,
        value: 0
    });

    /*keyframes.push({
        frame: animation_framerate*2,
        value: 1
    });*/

    window_close.setKeys(keyframes);
    window_rectangle_close.setKeys(keyframes);


    var window_open = new BABYLON.Animation("open", "scaling.y", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var window_rectangle_open = new BABYLON.Animation("open", "height", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyframes2 = [];


    keyframes2.push({
        frame: 0,
        value: 0
    });

    keyframes2.push({
        frame: animation_framerate,
        value: 1
    });

    window_open.setKeys(keyframes2);
    window_rectangle_open.setKeys(keyframes2);

    var easingFunction = new BABYLON.ExponentialEase(9.7);
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);


    window_close.setEasingFunction(easingFunction);
    window_rectangle_close.setEasingFunction(easingFunction);
    window_open.setEasingFunction(easingFunction);
    window_rectangle_open.setEasingFunction(easingFunction);
//////////////////// new add//////////////////////////
    var new_pos = scene.activeCamera.position.clone();
        new_pos.addInPlace(scene.activeCamera.getDirection(BABYLON.Vector3.Backward()));

        barMesh.setAbsolutePosition(new_pos);

        barMesh.lookAt(scene.activeCamera.position, 0, 0, 0, BABYLON.Space.WORLD);

        var offset = scene.activeCamera.getFrontPosition(2);

        barMesh.setAbsolutePosition(offset);

//////////////////// new add//////////////////////////

    var isopen = true;

    min_max_button.onPointerUpObservable.add(() => {

        if (isopen) {
            console.log("minimize button pressed")
            //scene.beginAnimation(content_window, 0, animation_framerate, false);
            scene.beginDirectAnimation(window_rectangle, [window_rectangle_close], 0, animation_framerate, false);
            bar_rectangle.isPointerBlocker = true;

            min_max_button.image.source = "images/maximize.png";
            isopen = false;


        } else {
            console.log("maximize_button pressed")
            scene.beginDirectAnimation(window_rectangle, [window_rectangle_open], 0, animation_framerate, false);
            bar_rectangle.isPointerBlocker = false;

            min_max_button.image.source = "images/minimize.png";
            isopen = true;

        }


    });


    follow_button.onPointerUpObservable.add(() => {


        console.log("follow button pressed")

        console.log("global pos " + scene.activeCamera.globalPosition)
        console.log("local pos " + scene.activeCamera.position)


        var new_pos = scene.activeCamera.position.clone();
        new_pos.addInPlace(scene.activeCamera.getDirection(BABYLON.Vector3.Backward()));

        barMesh.setAbsolutePosition(new_pos);

        barMesh.lookAt(scene.activeCamera.position, 0, 0, 0, BABYLON.Space.WORLD);

        var offset = scene.activeCamera.getFrontPosition(2);

        barMesh.setAbsolutePosition(offset);



    });


    /*close_button.onPointerUpObservable.add(() => {

        console.log("close button pressed");

        scene.beginDirectAnimation(barMesh, [window_close], 0, animation_framerate, false, 1, () => {


            barMesh.dispose();

        });



    });*/


    //return {barMesh, bar_rectangle, windowMesh, window_rectangle}
    return barMesh;


}

export function WindowUIImagen(name,width,height,img,scene) {

    var barMesh = BABYLON.MeshBuilder.CreatePlane("windown_plane", {
        width: width*0.001  ,
        height: 150*0.001,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    barMesh.XRpickable = true;
    barMesh.nonXREditable = true;


    var bar_texture = GUI.AdvancedDynamicTexture.CreateForMesh(barMesh);
    bar_texture.scaleTo(width, 150);



    var bar_rectangle = new GUI.Rectangle("container");
    //win_rectangle.width = 1;
    //win_rectangle.height = 1;

    //container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    //container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    bar_rectangle.cornerRadius = 20;
    bar_rectangle.color = "#2acaea";
    bar_rectangle.thickness = 7;
    bar_rectangle.background = '#00000066';

    //container.paddingTopInPixels = 15;
    //container.paddingLeftInPixels = 15;
    //container.zIndex=-1;


    var bar_grid = new GUI.Grid("win_grid")
    bar_grid.addRowDefinition(1);
    bar_grid.addColumnDefinition(.77,false); //1400px
    bar_grid.addColumnDefinition(150,true); //150px
    bar_grid.addColumnDefinition(150,true); //150px
    bar_grid.addColumnDefinition(150,true); //150px

    const win_text_name = new GUI.TextBlock("win_text_name");
    win_text_name.fontFamily = "Helvetica";
    //win_text_name.textWrapping = true;
    win_text_name.text = name;
    win_text_name.color = "white";
    win_text_name.fontSize = 50;
    //win_text_name.height = "200px";
    win_text_name.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    win_text_name.paddingLeftInPixels = 15;

    /*var close_button = GUI.Button.CreateImageOnlyButton("close_button", "images/close.png");
    //close_button.color = "transparent"
    close_button.background = '#ea2a2ad9';
    close_button.image.fixedRatio = 1;
    close_button.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;*/

    var follow_button = GUI.Button.CreateImageOnlyButton("maximize_button", "images/centering.png");
    //minimize_button.color = "#2acaea"
    follow_button.background = '#2acaead9';
    follow_button.image.fixedRatio = 1;
    //follow_button.image.width = 0.9;
    follow_button.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    var min_max_button = GUI.Button.CreateImageOnlyButton("minimize_button", "images/minimize.png");
    //minimize_button.color = "#2acaea"
    min_max_button.background = '#ea2a2ad9';
    min_max_button.image.fixedRatio = 1;
    min_max_button.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;


    bar_grid.addControl(win_text_name, 0, 0);
    bar_grid.addControl(min_max_button, 0, 3);
    bar_grid.addControl(follow_button, 0, 2);
    //bar_grid.addControl(close_button, 0, 3);


    bar_rectangle.addControl(bar_grid);
    bar_texture.addControl(bar_rectangle);


    var windowMesh = BABYLON.MeshBuilder.CreatePlane("windowUI", {
        width: width * (0.001),
        height: height * (0.001),
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    }, scene);


    var ajust_pos = windowMesh.getBoundingInfo().boundingBox.maximum.y + barMesh.getBoundingInfo().boundingBox.maximum.y
    var change_axis = new BABYLON.Vector3(0, -ajust_pos, .02);

    var local_pos = new BABYLON.Vector3(-0.7, 1, 0);
    barMesh.position = local_pos;

    windowMesh.parent = barMesh;
    windowMesh.position = change_axis;

    barMesh.lookAt(scene.activeCamera.position, Math.PI, 0, 0, BABYLON.Space.WORLD);



    var window_texture =  GUI.AdvancedDynamicTexture.CreateForMesh(windowMesh);
    window_texture.scaleTo(width, height);

    var window_rectangle = new GUI.Rectangle("Rectangle");
    window_rectangle.background = "#ffffffd9";
    window_rectangle.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    window_rectangle.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    window_rectangle.width = 1;
    window_rectangle.height = 1;

    window_texture.addControl(window_rectangle);

    var window_image = new GUI.Image("window_image", img);
    window_image.width = 1;
    window_image.height = 1;
    window_rectangle.addControl(window_image);

    var animation_framerate = 10;

    var window_close = new BABYLON.Animation("close", "scaling.y", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var window_rectangle_close = new BABYLON.Animation("close", "height", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    const keyframes = [];

    keyframes.push({
        frame: 0,
        value: 1
    });

    keyframes.push({
        frame: animation_framerate,
        value: 0
    });

    /*keyframes.push({
        frame: animation_framerate*2,
        value: 1
    });*/

    window_close.setKeys(keyframes);
    window_rectangle_close.setKeys(keyframes);


    var window_open = new BABYLON.Animation("open", "scaling.y", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var window_rectangle_open = new BABYLON.Animation("open", "height", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyframes2 = [];


    keyframes2.push({
        frame: 0,
        value: 0
    });

    keyframes2.push({
        frame: animation_framerate,
        value: 1
    });

    window_open.setKeys(keyframes2);
    window_rectangle_open.setKeys(keyframes2);

    var easingFunction = new BABYLON.ExponentialEase(9.7);
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);


    window_close.setEasingFunction(easingFunction);
    window_rectangle_close.setEasingFunction(easingFunction);
    window_open.setEasingFunction(easingFunction);
    window_rectangle_open.setEasingFunction(easingFunction);
//////////////////// new add//////////////////////////
    var new_pos = scene.activeCamera.position.clone();
        new_pos.addInPlace(scene.activeCamera.getDirection(BABYLON.Vector3.Backward()));

        barMesh.setAbsolutePosition(new_pos);

        barMesh.lookAt(scene.activeCamera.position, 0, 0, 0, BABYLON.Space.WORLD);

        var offset = scene.activeCamera.getFrontPosition(2);

        barMesh.setAbsolutePosition(offset);

//////////////////// new add//////////////////////////

    var isopen = true;

    min_max_button.onPointerUpObservable.add(() => {

        if (isopen) {
            console.log("minimize button pressed")
            //scene.beginAnimation(content_window, 0, animation_framerate, false);
            scene.beginDirectAnimation(window_rectangle, [window_rectangle_close], 0, animation_framerate, false);
            bar_rectangle.isPointerBlocker = true;

            min_max_button.image.source = "images/maximize.png";
            isopen = false;


        } else {
            console.log("maximize_button pressed")
            scene.beginDirectAnimation(window_rectangle, [window_rectangle_open], 0, animation_framerate, false);
            bar_rectangle.isPointerBlocker = false;

            min_max_button.image.source = "images/minimize.png";
            isopen = true;

        }


    });


    follow_button.onPointerUpObservable.add(() => {


        console.log("follow button pressed")

        console.log("global pos " + scene.activeCamera.globalPosition)
        console.log("local pos " + scene.activeCamera.position)


        var new_pos = scene.activeCamera.position.clone();
        new_pos.addInPlace(scene.activeCamera.getDirection(BABYLON.Vector3.Backward()));

        barMesh.setAbsolutePosition(new_pos);

        barMesh.lookAt(scene.activeCamera.position, 0, 0, 0, BABYLON.Space.WORLD);

        var offset = scene.activeCamera.getFrontPosition(2);

        barMesh.setAbsolutePosition(offset);



    });


    /*close_button.onPointerUpObservable.add(() => {

        console.log("close button pressed");

        scene.beginDirectAnimation(barMesh, [window_close], 0, animation_framerate, false, 1, () => {


            barMesh.dispose();

        });



    });*/


    //return {barMesh, bar_rectangle, windowMesh, window_rectangle}
    return [barMesh,windowMesh];


}


export function WindowUIVariasImagenes(name,width,height,img,scene) {

    var barMesh = BABYLON.MeshBuilder.CreatePlane("windown_plane", {
        width: width*0.001  ,
        height: 150*0.001,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    barMesh.XRpickable = true;
    barMesh.nonXREditable = true;


    var bar_texture = GUI.AdvancedDynamicTexture.CreateForMesh(barMesh);
    bar_texture.scaleTo(width, 150);



    var bar_rectangle = new GUI.Rectangle("container");
    //win_rectangle.width = 1;
    //win_rectangle.height = 1;

    //container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    //container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    bar_rectangle.cornerRadius = 20;
    bar_rectangle.color = "#2acaea";
    bar_rectangle.thickness = 7;
    bar_rectangle.background = '#00000066';

    //container.paddingTopInPixels = 15;
    //container.paddingLeftInPixels = 15;
    //container.zIndex=-1;


    var bar_grid = new GUI.Grid("win_grid")
    bar_grid.addRowDefinition(1);
    bar_grid.addColumnDefinition(.77,false); //1400px
    bar_grid.addColumnDefinition(150,true); //150px
    bar_grid.addColumnDefinition(150,true); //150px
    bar_grid.addColumnDefinition(150,true); //150px

    const win_text_name = new GUI.TextBlock("win_text_name");
    win_text_name.fontFamily = "Helvetica";
    //win_text_name.textWrapping = true;
    win_text_name.text = name;
    win_text_name.color = "white";
    win_text_name.fontSize = 50;
    //win_text_name.height = "200px";
    win_text_name.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    win_text_name.paddingLeftInPixels = 15;

    /*var close_button = GUI.Button.CreateImageOnlyButton("close_button", "images/close.png");
    //close_button.color = "transparent"
    close_button.background = '#ea2a2ad9';
    close_button.image.fixedRatio = 1;
    close_button.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;*/

    var follow_button = GUI.Button.CreateImageOnlyButton("maximize_button", "images/centering.png");
    //minimize_button.color = "#2acaea"
    follow_button.background = '#2acaead9';
    follow_button.image.fixedRatio = 1;
    //follow_button.image.width = 0.9;
    follow_button.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    var min_max_button = GUI.Button.CreateImageOnlyButton("minimize_button", "images/minimize.png");
    //minimize_button.color = "#2acaea"
    min_max_button.background = '#ea2a2ad9';
    min_max_button.image.fixedRatio = 1;
    min_max_button.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;


    bar_grid.addControl(win_text_name, 0, 0);
    bar_grid.addControl(min_max_button, 0, 3);
    bar_grid.addControl(follow_button, 0, 2);
    //bar_grid.addControl(close_button, 0, 3);


    bar_rectangle.addControl(bar_grid);
    bar_texture.addControl(bar_rectangle);


    var windowMesh = BABYLON.MeshBuilder.CreatePlane("windowUI", {
        width: width * (0.001),
        height: height * (0.001),
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    }, scene);


    var ajust_pos = windowMesh.getBoundingInfo().boundingBox.maximum.y + barMesh.getBoundingInfo().boundingBox.maximum.y
    var change_axis = new BABYLON.Vector3(0, -ajust_pos, .02);

    var local_pos = new BABYLON.Vector3(-0.7, 1, 0);
    barMesh.position = local_pos;

    windowMesh.parent = barMesh;
    windowMesh.position = change_axis;

    barMesh.lookAt(scene.activeCamera.position, Math.PI, 0, 0, BABYLON.Space.WORLD);



    var window_texture =  GUI.AdvancedDynamicTexture.CreateForMesh(windowMesh);
    window_texture.scaleTo(width, height);

    var window_rectangle = new GUI.Rectangle("Rectangle");
    window_rectangle.background = "#ffffffd9";
    window_rectangle.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    window_rectangle.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    window_rectangle.width = 1;
    window_rectangle.height = 1;


    var windowGrid = new GUI.Grid("window_grid")
    windowGrid.addRowDefinition(0.8);
    windowGrid.addRowDefinition(0.2);
    


    window_texture.addControl(window_rectangle);
/*
    var window_image = new GUI.Image("window_image", img);
    window_image.width = 1;
    window_image.height = 1;
    windowGrid.addControl(window_image,0,0);*/

    //crea un array de imagenes iniciando con la que llega de parametro
    var imagenes = [img,examenCubo, examenCilindro, examenEsfera, examenPiramide,pasaste,noPasaste];
    var indexImagen = 0;


    var windowRectangulo = new GUI.Image("window_rectangulo", imagenes[indexImagen]);
    windowRectangulo.width = 1;
    windowRectangulo.height = 1;

    windowGrid.addControl(windowRectangulo,0,0);

    var windowGridRespuesta = new GUI.Grid("window_grid_respuesta")
    windowGridRespuesta.addColumnDefinition(0.2);
    windowGridRespuesta.addColumnDefinition(0.2);
    windowGridRespuesta.addColumnDefinition(0.2);
    windowGridRespuesta.addColumnDefinition(0.2);
    windowGridRespuesta.addColumnDefinition(0.2);
 

    var windowRepuesta1 = new GUI.RadioButton("window_repuesta1");
    windowRepuesta1.isChecked = false;
    //windowRepuesta1.background = "#ABA6F7";
    windowRepuesta1.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    windowRepuesta1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    windowRepuesta1.width = 1;
    windowRepuesta1.height = 1;

    windowGridRespuesta.addControl(windowRepuesta1,0,0);
    var checkOpcion1 = false;
    windowRepuesta1.onIsCheckedChangedObservable.add(function(value) {
        if (value) {
            console.log("windowRepuesta1 is checked");
            checkOpcion1=true;
            windowRepuesta1.background = "#ABA6F7";
        } else {
            windowRepuesta1.background = "#000000";
            checkOpcion1=false;
        }
    });

    var windowRepuesta2 = new GUI.RadioButton("window_repuesta2");
    windowRepuesta2.isChecked = false;
    //windowRepuesta2.background = "#ABA6F7";
    windowRepuesta2.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    windowRepuesta2.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    windowRepuesta2.width = 1;
    windowRepuesta2.height = 1;

    windowGridRespuesta.addControl(windowRepuesta2,0,1);
    var checkOpcion2 = false;
    windowRepuesta2.onIsCheckedChangedObservable.add(function(value) {
        if (value) {
            console.log("windowRepuesta2 is checked");
            checkOpcion2=true;
            windowRepuesta2.background = "#ABA6F7";
        } else {
            windowRepuesta2.background = "#000000";
            checkOpcion2=false;
        }
    });


    var windowRepuesta3 = new GUI.RadioButton("window_repuesta3");
    windowRepuesta3.isChecked = false;
    //windowRepuesta3.background = "#ABA6F7";
    windowRepuesta3.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    windowRepuesta3.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    windowRepuesta3.width = 1;
    windowRepuesta3.height = 1;

    windowGridRespuesta.addControl(windowRepuesta3,0,2);
    var checkOpcion3 = false;
    windowRepuesta3.onIsCheckedChangedObservable.add(function(value) {
        if (value) {

            console.log("windowRepuesta3 is checked");
            checkOpcion3=true;
            windowRepuesta3.background = "#ABA6F7";
        } else {
            windowRepuesta3.background = "#000000";
            checkOpcion3=false;
        }
    });


    var windowRepuesta4 = new GUI.RadioButton("window_repuesta4");
    windowRepuesta4.isChecked = false;
    //windowRepuesta4.background = "#ABA6F7";
    windowRepuesta4.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    windowRepuesta4.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    windowRepuesta4.width = 1;
    windowRepuesta4.height = 1;

    windowGridRespuesta.addControl(windowRepuesta4,0,3);
    var checkOpcion4 = false;
    windowRepuesta4.onIsCheckedChangedObservable.add(function(value) {
        if (value) {
            console.log("windowRepuesta4 is checked");
            checkOpcion4=true;
            windowRepuesta4.background = "#ABA6F7";

        } else {
            windowRepuesta4.background = "#000000";
            checkOpcion4=false;
        }
    });

    var windowRepuesta5 = new GUI.Button("window_repuesta5");
    windowRepuesta5.hoverCursor = "pointer";
    var respuestasCorrectas = 0;
    //cambiar imagen al darle click al boton de la derecha
    windowRepuesta5.onPointerUpObservable.add(function() {
        if (indexImagen == 0) {
            console.log("bienvenida");
            indexImagen++;
            // Actualizar la imagen en windowRectangulo con la nueva imagen correspondiente al índice incrementado
            windowRectangulo.source = imagenes[indexImagen];
        } else if (indexImagen == 1) {
            console.log("primera pregunta");
            if(checkOpcion1){
                respuestasCorrectas++;
                console.log("correcto");
                indexImagen++;
                windowRectangulo.source = imagenes[indexImagen];
                console.log(respuestasCorrectas);
            }else{
                console.log("incorrecto");
                indexImagen++;
                windowRectangulo.source = imagenes[indexImagen];
                console.log(respuestasCorrectas);
            }}
            else if (indexImagen == 2) {
                console.log("segunda pregunta");
                if(checkOpcion4){
                    respuestasCorrectas++;
                    console.log(respuestasCorrectas);
                    console.log("correcto");
                    indexImagen++;
                    windowRectangulo.source = imagenes[indexImagen];
                }else{
                    indexImagen++;
                    windowRectangulo.source = imagenes[indexImagen];
                }}
            else if (indexImagen == 3) {
                console.log("tercera pregunta");
                if (checkOpcion2){
                    respuestasCorrectas++;
                    console.log(respuestasCorrectas);
                    console.log("correcto");
                    indexImagen++;
                    windowRectangulo.source = imagenes[indexImagen];
                }else{
                    indexImagen++;
                    windowRectangulo.source = imagenes[indexImagen];
                }}
            else if (indexImagen == 4) {
                console.log("cuarta pregunta");
                if (checkOpcion1){
                    respuestasCorrectas++;
                    console.log(respuestasCorrectas);
                    console.log("correcto");
                    //indexImagen++;
                    //windowRectangulo.source = imagenes[indexImagen];
                    if (respuestasCorrectas == 4){
                        indexImagen++;
                        windowRectangulo.source = imagenes[indexImagen];
                    }else{
                        indexImagen=6;
                        windowRectangulo.source = imagenes[indexImagen];
                        console.log("no pasaste");
                    }
                }else {

                indexImagen=6;
                windowRectangulo.source = imagenes[indexImagen];
                console.log("no pasaste");
                if (indexImagen == 6) {
                    console.log("pantalla de no pasaste");
                    respuestasCorrectas=0;
                    if (checkOpcion1){
                        //reiniciar preguntas
                        indexImagen=0;
                        
                        windowRectangulo.source = imagenes[indexImagen];
                        console.log("reiniciar preguntas");
                        
                    }
                }
            }}
            else if (indexImagen == 6) {
                console.log("pantalla de no pasaste");
                respuestasCorrectas=0;
                if (checkOpcion1){
                    //reiniciar preguntas
                    indexImagen=0;

                    windowRectangulo.source = imagenes[indexImagen];
                    console.log("reiniciar preguntas");

                }
            }

        // Verificar si se ha alcanzado el final del arreglo de imágenes
    if (indexImagen >= imagenes.length) {
        // Si se alcanza el final, volver al inicio del arreglo
        indexImagen = 0;
    }

    
    });


    //poner hover al botonDeRespuesta5
    windowRepuesta5.onPointerEnterObservable.add(function() {
        windowRepuesta5.background = "#ABA6F7";
    });

    windowRepuesta5.onPointerOutObservable.add(function() {
        windowRepuesta5.background = "#000000";
    });

    //poner imagen a boton
    var windowRepuesta5Image = new GUI.Image("window_repuesta5_image", next);
    windowRepuesta5Image.width = 1;
    windowRepuesta5Image.height = 1;
    windowRepuesta5Image.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    windowRepuesta5Image.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    windowRepuesta5.addControl(windowRepuesta5Image);


    windowRepuesta5.background = "#000000";
    windowRepuesta5.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    windowRepuesta5.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    windowRepuesta5.width = 1;
    windowRepuesta5.height = 1;


    windowGridRespuesta.addControl(windowRepuesta5,0,4);

    windowGrid.addControl(windowGridRespuesta,1,0);




    window_rectangle.addControl(windowGrid);

    var animation_framerate = 10;

    var window_close = new BABYLON.Animation("close", "scaling.y", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var window_rectangle_close = new BABYLON.Animation("close", "height", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    const keyframes = [];

    keyframes.push({
        frame: 0,
        value: 1
    });

    keyframes.push({
        frame: animation_framerate,
        value: 0
    });

    /*keyframes.push({
        frame: animation_framerate*2,
        value: 1
    });*/

    window_close.setKeys(keyframes);
    window_rectangle_close.setKeys(keyframes);


    var window_open = new BABYLON.Animation("open", "scaling.y", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var window_rectangle_open = new BABYLON.Animation("open", "height", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyframes2 = [];


    keyframes2.push({
        frame: 0,
        value: 0
    });

    keyframes2.push({
        frame: animation_framerate,
        value: 1
    });

    window_open.setKeys(keyframes2);
    window_rectangle_open.setKeys(keyframes2);

    var easingFunction = new BABYLON.ExponentialEase(9.7);
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);


    window_close.setEasingFunction(easingFunction);
    window_rectangle_close.setEasingFunction(easingFunction);
    window_open.setEasingFunction(easingFunction);
    window_rectangle_open.setEasingFunction(easingFunction);
//////////////////// new add//////////////////////////
    var new_pos = scene.activeCamera.position.clone();
        new_pos.addInPlace(scene.activeCamera.getDirection(BABYLON.Vector3.Backward()));

        barMesh.setAbsolutePosition(new_pos);

        barMesh.lookAt(scene.activeCamera.position, 0, 0, 0, BABYLON.Space.WORLD);

        var offset = scene.activeCamera.getFrontPosition(2);

        barMesh.setAbsolutePosition(offset);

//////////////////// new add//////////////////////////

    var isopen = true;

    min_max_button.onPointerUpObservable.add(() => {

        if (isopen) {
            console.log("minimize button pressed")
            //scene.beginAnimation(content_window, 0, animation_framerate, false);
            scene.beginDirectAnimation(window_rectangle, [window_rectangle_close], 0, animation_framerate, false);
            bar_rectangle.isPointerBlocker = true;

            min_max_button.image.source = "images/maximize.png";
            isopen = false;


        } else {
            console.log("maximize_button pressed")
            scene.beginDirectAnimation(window_rectangle, [window_rectangle_open], 0, animation_framerate, false);
            bar_rectangle.isPointerBlocker = false;

            min_max_button.image.source = "images/minimize.png";
            isopen = true;

        }


    });


    follow_button.onPointerUpObservable.add(() => {


        console.log("follow button pressed")

        console.log("global pos " + scene.activeCamera.globalPosition)
        console.log("local pos " + scene.activeCamera.position)


        var new_pos = scene.activeCamera.position.clone();
        new_pos.addInPlace(scene.activeCamera.getDirection(BABYLON.Vector3.Backward()));

        barMesh.setAbsolutePosition(new_pos);

        barMesh.lookAt(scene.activeCamera.position, 0, 0, 0, BABYLON.Space.WORLD);

        var offset = scene.activeCamera.getFrontPosition(2);

        barMesh.setAbsolutePosition(offset);



    });


    /*close_button.onPointerUpObservable.add(() => {

        console.log("close button pressed");

        scene.beginDirectAnimation(barMesh, [window_close], 0, animation_framerate, false, 1, () => {


            barMesh.dispose();

        });



    });*/


    //return {barMesh, bar_rectangle, windowMesh, window_rectangle}
    return [barMesh,windowMesh];


}

export function WindowUICreadorDeFiguras(name,width,height,text,scene) {

    var barMesh1 = BABYLON.MeshBuilder.CreatePlane("windown_plane", {
        width: width*0.001  ,
        height: 150*0.001,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    barMesh1.XRpickable = true;
    barMesh1.nonXREditable = true;


    var bar_texture = GUI.AdvancedDynamicTexture.CreateForMesh(barMesh1);
    bar_texture.scaleTo(width, 150);



    var bar_rectangle = new GUI.Rectangle("container");
    //win_rectangle.width = 1;
    //win_rectangle.height = 1;

    //container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    //container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    bar_rectangle.cornerRadius = 20;
    bar_rectangle.color = "#2acaea";
    bar_rectangle.thickness = 7;
    bar_rectangle.background = '#00000066';

    //container.paddingTopInPixels = 15;
    //container.paddingLeftInPixels = 15;
    //container.zIndex=-1;


    var bar_grid = new GUI.Grid("win_grid")
    bar_grid.addRowDefinition(1);
    bar_grid.addColumnDefinition(.77,false); //1400px
    bar_grid.addColumnDefinition(150,true); //150px
    bar_grid.addColumnDefinition(150,true); //150px
    bar_grid.addColumnDefinition(150,true); //150px

    const win_text_name = new GUI.TextBlock("win_text_name");
    win_text_name.fontFamily = "Helvetica";
    //win_text_name.textWrapping = true;
    win_text_name.text = name;
    win_text_name.color = "white";
    win_text_name.fontSize = 50;
    //win_text_name.height = "200px";
    win_text_name.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    win_text_name.paddingLeftInPixels = 15;

    var close_button = GUI.Button.CreateImageOnlyButton("close_button", "images/close.png");
    //close_button.color = "transparent"
    close_button.background = '#ea2a2ad9';
    close_button.image.fixedRatio = 1;
    close_button.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    var follow_button = GUI.Button.CreateImageOnlyButton("maximize_button", "images/centering.png");
    //minimize_button.color = "#2acaea"
    follow_button.background = '#2acaead9';
    follow_button.image.fixedRatio = 1;
    //follow_button.image.width = 0.9;
    follow_button.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    var min_max_button = GUI.Button.CreateImageOnlyButton("minimize_button", "images/minimize.png");
    //minimize_button.color = "#2acaea"
    min_max_button.background = '#2acaead9';
    min_max_button.image.fixedRatio = 1;
    min_max_button.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;


    bar_grid.addControl(win_text_name, 0, 0);
    bar_grid.addControl(min_max_button, 0, 1);
    bar_grid.addControl(follow_button, 0, 2);
    bar_grid.addControl(close_button, 0, 3);


    bar_rectangle.addControl(bar_grid);
    bar_texture.addControl(bar_rectangle);


    var windowMesh = BABYLON.MeshBuilder.CreatePlane("windowUI", {
        width: width * (0.001),
        height: height * (0.001),
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    }, scene);


    var ajust_pos = windowMesh.getBoundingInfo().boundingBox.maximum.y + barMesh1.getBoundingInfo().boundingBox.maximum.y
    var change_axis = new BABYLON.Vector3(0, -ajust_pos, .02);

    var local_pos = new BABYLON.Vector3(-0.7, 1, 0);
    barMesh1.position = local_pos;

    windowMesh.parent = barMesh1;
    windowMesh.position = change_axis;

    barMesh1.lookAt(scene.activeCamera.position, Math.PI, 0, 0, BABYLON.Space.WORLD);

    var window_texture =  GUI.AdvancedDynamicTexture.CreateForMesh(windowMesh);
    window_texture.scaleTo(width, height);

    var window_rectangle = new GUI.Rectangle("Rectangle");
    window_rectangle.background = "#ffffffd9";
    window_rectangle.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    window_rectangle.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    window_rectangle.width = 1;
    window_rectangle.height = 1;

    window_texture.addControl(window_rectangle);

    var window_text = new GUI.TextBlock("window_text");
    window_text.fontFamily = "Helvetica";
    window_text.textWrapping = true;
    window_text.text = text;
    window_text.color = "black";
    window_text.fontSize = 50;
    window_rectangle.addControl(window_text);
    
    window_texture.addControl(window_rectangle);

    var animation_framerate = 10;

    var window_close = new BABYLON.Animation("close", "scaling.y", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var window_rectangle_close = new BABYLON.Animation("close", "height", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    const keyframes = [];

    keyframes.push({
        frame: 0,
        value: 1
    });

    keyframes.push({
        frame: animation_framerate,
        value: 0
    });

    /*keyframes.push({
        frame: animation_framerate*2,
        value: 1
    });*/

    window_close.setKeys(keyframes);
    window_rectangle_close.setKeys(keyframes);

    var window_open = new BABYLON.Animation("open", "scaling.y", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var window_rectangle_open = new BABYLON.Animation("open", "height", animation_framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyframes2 = [];


    keyframes2.push({
        frame: 0,
        value: 0
    });

    keyframes2.push({
        frame: animation_framerate,
        value: 1
    });

    window_open.setKeys(keyframes2);
    window_rectangle_open.setKeys(keyframes2);

    var easingFunction = new BABYLON.ExponentialEase(9.7);
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    window_close.setEasingFunction(easingFunction);
    window_rectangle_close.setEasingFunction(easingFunction);
    window_open.setEasingFunction(easingFunction);
    window_rectangle_open.setEasingFunction(easingFunction);

    var isopen = true;

    min_max_button.onPointerUpObservable.add(() => {

        if (isopen) {
            console.log("minimize button pressed")
            //scene.beginAnimation(content_window, 0, animation_framerate, false);
            scene.beginDirectAnimation(window_rectangle, [window_rectangle_close], 0, animation_framerate, false);
            bar_rectangle.isPointerBlocker = true;

            min_max_button.image.source = "images/maximize.png";
            isopen = false;

        } else {
            console.log("maximize_button pressed")
            scene.beginDirectAnimation(window_rectangle, [window_rectangle_open], 0, animation_framerate, false);
            bar_rectangle.isPointerBlocker = false;

            min_max_button.image.source = "images/minimize.png";
            isopen = true;

        }


    });


    follow_button.onPointerUpObservable.add(() => {


        console.log("follow button pressed")

        console.log("global pos " + scene.activeCamera.globalPosition)
        console.log("local pos " + scene.activeCamera.position)


        var new_pos = scene.activeCamera.position.clone();
        new_pos.addInPlace(scene.activeCamera.getDirection(BABYLON.Vector3.Backward()));

        barMesh1.setAbsolutePosition(new_pos);

        barMesh1.lookAt(scene.activeCamera.position, 0, 0, 0, BABYLON.Space.WORLD);

        var offset = scene.activeCamera.getFrontPosition(2);

        barMesh1.setAbsolutePosition(offset);


    });


    close_button.onPointerUpObservable.add(() => {

        console.log("close button pressed");

        scene.beginDirectAnimation(barMesh1, [window_close], 0, animation_framerate, false, 1, () => {


            barMesh1.dispose();

        });

    });


    //return {barMesh, bar_rectangle, windowMesh, window_rectangle}
    return barMesh1;


}

/**
* 
* @param {String} videoUrl 
* @param {String} audioUrl 
* @param {{}} videoTextureSettings 
* @param {{}} AudioSettings 
* @param {{}} videoPlaneOptions 
* @param {BABYLON.Scene} scene 
* @returns the instanced video player
*/
export function VideoPlayerTexture(videoUrl, audioUrl, videoTextureSettings, AudioSettings, videoPlaneOptions, scene) {



    videoTextureSettings = videoTextureSettings !== undefined ? videoTextureSettings : {
        loop: false,
        autoPlay: false,
        autoUpdateTexture: true,
        muted: true,
        poster: ''
    };


    AudioSettings = AudioSettings !== undefined ? AudioSettings : {
        loop: false,
        autoPlay: false,
        spatialSound: true,
        distanceModel: "exponential",
        maxDistance: 10,
        refDistance: 5,
        rolloffFactor: 0.8,
    };

    videoPlaneOptions = videoPlaneOptions !== undefined ? videoPlaneOptions : {
        height: 1,
        width: 1 * 1.77,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    };


    let videoTexture = new BABYLON.VideoTexture("videoTexture", videoUrl,
        scene, true, false,
        BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE, videoTextureSettings);
    // videoTexture.video.preload = "auto";
    //videoTexture.XRpickable=true;

    var videoPlane = BABYLON.MeshBuilder.CreatePlane("videoPlane", videoPlaneOptions, scene);
    var vidPos = (new BABYLON.Vector3(0, 2, 0.1))
    videoPlane.position = vidPos;
    videoPlane.XRpickable = true;

    if (audioUrl == undefined || "") {
        audioUrl = videoTexture.video;
        videoTexture.video.muted = false;
    }

    const videoSound = new BABYLON.Sound("testSound", audioUrl, scene, () => {
        console.log("ready to play video sound")

    }, AudioSettings);

    videoSound.attachToMesh(videoPlane);

    let videoMaterial = new BABYLON.StandardMaterial("videoMat", scene);
    videoMaterial.diffuseTexture = videoTexture;
    videoMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    videoPlane.material = videoMaterial;


    let clicked = false;

    videoPlane.actionManager = new BABYLON.ActionManager(scene);
    videoPlane.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {


        if (clicked == false && videoSound.isReady()) {
            clicked = true;
            videoTexture.video.play().then(() => {
                videoSound.play();
            })


        } else {
            videoTexture.video.pause();
            videoSound.pause();
            clicked = false;

        }
    }));
    
    videoPlane.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnDoublePickTrigger, () => {

        videoTexture.video.currentTime = 0;
        videoTexture.video.pause();
        videoSound.stop();

    }));

    return { videoTexture, videoSound, videoPlane, videoMaterial };

}
