function CanvasImage(src){
    var img = new Image();
    img.src = src;
    return img;
}

function onScreenImg(x,y,halfWidth,halfHeight){
    if( x+halfWidth >= game.cam.pos.x-renderer.width/2 &&
        y+halfHeight >= game.cam.pos.y-renderer.height/2 &&
        x-halfWidth <= game.cam.pos.x+renderer.width/2 &&
        y-halfHeight <= game.cam.pos.y+renderer.height/2
    ){
        return true;
    }
    else{
        return false;
    }
}

function onScreenPoints(x,y,points){
    var xpoints = [], ypoints = [];
    for(var i=0; i<points.length; i++){
        var p = points[i];
        xpoints[i] = p.x*renderer.scale;
        ypoints[i] = p.y*renderer.scale;
    }
    
    var minW = Math.min.apply(Math, xpoints);
    var minH = Math.min.apply(Math, ypoints);
    var maxW = Math.max.apply(Math, xpoints);
    var maxH = Math.max.apply(Math, ypoints);
    
    if( x+maxW >= game.cam.pos.x-renderer.width/2 &&
        y+maxH >= game.cam.pos.y-renderer.height/2 &&
        x+minW <= game.cam.pos.x+renderer.width/2 &&
        y+minH <= game.cam.pos.y+renderer.height/2
    ){
        return true;
    }
    else{
        return false;
    }
}

Math.sq = function(x){
    return x*x;
};

Math.randomInt = function(range){
    return Math.round(Math.random() * range);
}

Math.randomRange = function(min, max){
    return min + (Math.random()*(max - min));
};

Math.randomRangeInt = function(min, max){
    return Math.round( min + (Math.random()*(max - min)) );
};

Math.randomList = function(list){
    var randInt = Math.randomInt(list.length-1);
    for(var i=0; i<list.length; i++){
        if(randInt == i){
            var num = list[i];
        }
    }
    return num;
}

Math.clamp = function(min, max, value) {
    if(value <= min){
        return min;
    }
    else if(value >= max){
        return max;
    }
    else{
        return value;
    }
};

Math.distance = function( x, y, x2, y2){
    return Math.sqrt( Math.sq(x2 - x) + Math.sq(y2 - y) );
};

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function( callback, element ){
                window.setTimeout(callback, 1000 / 60);
            };
})();