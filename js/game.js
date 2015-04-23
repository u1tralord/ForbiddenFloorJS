var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 480;
var FPS = 60;

var canvasElement;
var canvas;
var resourceManager = GetResourceManager();

var resourceMap = [
"air",
"tile"
];
window.onload = function() {
    canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
    canvas = canvasElement.get(0).getContext("2d");
    canvasElement.appendTo(document.getElementById("gameDiv"));
};

resourceManager.loadResource("spritesheet", "res/img/sprite.png", "image");
resourceManager.loadResource("tile", "res/img/tile.png", "image");
var world = IsoWorld(10, 10, 10);
world.generateFloor(0, 1);

//Main drawing function of the game
setInterval(function() {
    resourceManager.getResource("spritesheet").draw(0, 0, canvas);
    resourceManager.getResource("tile").draw(0, 0, canvas);
}, 1000/FPS);

function IsoWorld(sizeX, sizeY, sizeZ){
    WORLD = {}
    WORLD.grid = new Array(sizeX);
    for(var x = 0; x < sizeX; x++){
        WORLD.grid[x] = Array(sizeY);
        for(var y = 0; y < sizeY; y++){
            WORLD.grid[x][y] = Array(sizeZ);
            for(var z = 0; z < sizeZ; z++){
                WORLD.grid[x][y][z] = 0;
            }
        }
    }

    WORLD.generateFloor(floorHeight, material){
        for(x=0; x < WORLD.grid.length; x++){
            for(y=0; y < WORLD.grid[0].length; y++){
                WORLD.grid[x][y][floorHeight] = material;
            }
        }
    }
    console.log(JSON.stringify(WORLD.grid));
    return WORLD;
}

//Returns and image object for the resource manager to manage
function ResImage(path){
    var I = {};
    I.loaded = false;
    I.dimensions = {}

    I.img = new Image();   // Create new img element
    I.img.addEventListener("load", function() {
        I.loaded = true;
        I.dimensions.width = this.width;
        I.dimensions.height = this.height;
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
