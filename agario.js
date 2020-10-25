var width = window.innerWidth;
var height= window.innerHeight;

var playerSize = 100;
var playerSizeBuffer = playerSize;
var playerX = 0;
var playerY = 0;

var scale = 1;

var worldWidth = 1000;
var worldHeight = 1000;

var food = [];


var act = function(timestamp){
    var world = document.getElementById('canvas');


    //console.log(playerX, playerY);

    MousePosition = MouseHandler.getPos();

    //direction in dx and dy
    mouseDx = MousePosition.x - window.innerWidth/2;
    mouseDy = MousePosition.y - window.innerHeight/2;

    //scale down the direction
    mouseDx = (mouseDx / 100) / (playerSize / 100);
    mouseDy = (mouseDy / 100) / (playerSize / 100);

    //apply to the player position
    if(Math.abs(playerX + mouseDx) < 2500) playerX += mouseDx;
    if(Math.abs(playerY + mouseDy) < 2500) playerY += mouseDy;

    g = world.getContext('2d');

    //background
    g.fillStyle = '#2d2d2d'; //color
    g.fillRect(0, 0, world.width, world.height);
    

    //player
    var displayRadius = playerSize;
    if(displayRadius > 170) displayRadius = 170;
    fillCircle(g, window.innerWidth / 2, window.innerHeight / 2, displayRadius, 3*scale, "black", "red");


    //display all food
    for(var i = 0; i < food.length; i++){
        var targetFood = food[i]
        targetFood.render(g);
        //check touching
        let displayX = targetFood.x - playerX;
        let displayY = targetFood.y - playerY;
        if(Math.sqrt(displayX*displayX + displayY*displayY) < targetFood.value + displayRadius) {
            playerSize += targetFood.value/8;
            scale = 3/ (playerSize * playerSize) *10000;
            console.log(scale)
            console.log(playerSize)
            food.splice(i, 1);
        }
    }

    //you can ignore this, this basically tells the browser to repeatly run this function, and in greenfoot, it is automatically reapeated
    window.requestAnimationFrame(act);
};

var init = function(){
    MouseHandler.init(document);
    //Handler.push(new Enemy(Math.floor(Math.random()*width), Math.floor(Math.random()*height), Math.floor(Math.random()*4 + 2), Math.floor(Math.random()*4 + 2)));
    //Handler.push(new Button(10, 10, 70, 50));

    //make random food around the map
    for(var i = 0; i < 500; i++){
        food.push(new Food(Math.random()*5000-2500, Math.random()*5000-2500, 14))
    }

    c = document.getElementById('canvas');
    c.width = window.innerWidth;
    c.height= window.innerHeight;
    act();
}

class Food{
    constructor(x, y, value){
        this.x = x;
        this.y = y;
        this.value = value;

        //random color, in greenfoot you need to make this yourself
        this.color = "#" + Math.floor(Math.random()*16777215).toString(16);
    }

    render(g){
        var displayX = this.x - playerX;
        var displayY = this.y - playerY;
        if(Math.abs(displayX) <= window.innerWidth/2 && Math.abs(displayY) <= window.innerHeight/2){
            fillCircle(g, window.innerWidth/2 + displayX, window.innerHeight/2 + displayY, this.value*scale, 1*scale, "black", this.color);
        }
    }
}

window.requestAnimationFrame(act);

function render(g){
}


function fillCircle(cc1, locX, locY, radius, width, strokeColor, fillColor){
    cc = cc1;
    cc.beginPath();
    cc.arc(locX, locY, radius, 0, 2 *Math.PI, true);
    cc.lineWidth = width;
    cc.strokeStyle = strokeColor;
        
    cc.fillStyle = fillColor;
    cc.fill('evenodd');
    cc.stroke();
}





var MouseHandler = (function() {
    var x = 0;
    var y = 0;
    var mouseIn = false;
    var mouseClicked = false;

    var init = function(eventSrc){
        eventSrc.addEventListener('mousemove', onMouseMove);
        eventSrc.addEventListener('mouseout', onMouseOut);
        eventSrc.addEventListener('mouseover', onMouseOver);
        eventSrc.addEventListener('click', onMouseClick);
        
        console.log("hello, this is working");
    };

    var onMouseClick = function(){
        
    }

    var onMouseOut = function() {
        mouseIn = false;
    };

    var onMouseOver = function(){
        mouseIn = true;
    };

    var onMouseMove = function(e){
        x = e.clientX;
        y = e.clientY;

    };

    var getPos = function(){
        return{
            x: x,
            y: y
        };
    };

    var isMouseIn = function(){
        return mouseIn;
    }

    var tick = function(){
        mouseClicked = false;
    }

    var isClicked = function(){
        return mouseClicked;
    }

    return{
        init: init,
        getPos: getPos,
        isMouseIn: isMouseIn,
        isClicked: isClicked,
        tick: tick
    }
}());