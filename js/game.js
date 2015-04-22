var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 480;
var FPS = 60;

var canvasElement;
var canvas;
var resourceManager = GetResourceManager();

window.onload = function() {
    canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
    canvas = canvasElement.get(0).getContext("2d");
    canvasElement.appendTo(document.getElementById("gameDiv"));
};

resourceManager.loadResource("spritesheet", "res/img/sprite.png", "image");

//Main drawing function of the game
setInterval(function() {
    resourceManager.getResource("spritesheet").draw(0, 0, canvas);
}, 1000/FPS);


//Returns and image object for the resource manager to manage
function ResImage(path){
    var I = {};
    I.loaded = false;

    I.img = new Image();   // Create new img element
    I.img.addEventListener("load", function() {
        I.loaded = true;
    }, false);
    I.img.src = path;

    I.draw = function(x, y, ctx){
        if(I.loaded)
            ctx.drawImage(I.img, x, y);
        else{
            ctx.fillStyle="#373737";
            ctx.fillRect(x, y, 50, 50)
        }
    }
    return I;
}


//Resource manager handles loading and retrieving of all necessary resources
function GetResourceManager() {
    I = {};
    I.resources = {};

    I.loadResource = function(id, path, type){
        if(type == "image")
            I.resources[id] = ResImage(path);

        console.log(id + " " + path + " " + type);
    };

    I.getResource = function(id){
        return I.resources[id];
    };

    return I;
};
