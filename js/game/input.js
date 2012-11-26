var key = {
    up: false, down: false, right: false, left: false,
    w: false, s: false, d: false, a: false,
    esc: false, p: false
};
    mouse = {down: false, release: false, srcpos: null, pos: null, startTime: 0, time: 0, endTime: 0},
    touch = {identifier: -1, release: false, srcpos: null, pos: null, startTime: 0, time: 0, endTime: 0},
    accelerometer = {x: 0, y: 0, z: 0},
    orient = {landscape: false, portrait: false};
    
function input(){
    document.addEventListener("keydown", handleKeys, false);
    document.addEventListener("keyup", handleKeys, false);
    document.addEventListener("mousemove", handleWindow, false);
    document.addEventListener("mousedown", handleWindow, false);
    document.addEventListener("mouseup", handleWindow, false);
    document.addEventListener("touchstart", handleMobile, false);
    document.addEventListener("touchmove", handleMobile, false);
    document.addEventListener("touchend", handleMobile, false);
    window.addEventListener("devicemotion", handleMotion, false);
    window.addEventListener("deviceorientation", handleMotion, false);
}

function handleWindow(e){
    e.preventDefault();
    
    mouse.srcpos = new Vec2(
	(-renderer.width/2)+e.pageX-((window.innerWidth-renderer.width)/2),
	(-renderer.height/2)+e.pageY-((window.innerHeight-renderer.height)/2)
    );
    
    mouse.pos = new Vec2(
	(game.cam.pos.x-renderer.width/2)+e.pageX-((window.innerWidth-renderer.width)/2),
	(game.cam.pos.y-renderer.height/2)+e.pageY-((window.innerHeight-renderer.height)/2)
    );

    if(mouse.down == false && mouse.endTime+10 <= new Date().getTime()){
        mouse.release = false;
    }
    if(e.type == "mousemove"){
        mouse.time = new Date().getTime();
    }
    if(e.type == "mousedown"){
        mouse.down = true;
        mouse.release = false;
        mouse.startTime = new Date().getTime();
    }
    if(e.type == "mouseup"){
        mouse.down = false;
        mouse.release = true;
        mouse.endTime = new Date().getTime();
    }
}

function handleKeys(e){
    if(e.type == "keydown"){
        if( e.keyCode == 37 ) key.left = true;
        if( e.keyCode == 39 ) key.right = true;
        if( e.keyCode == 38 ) key.up = true;
        if( e.keyCode == 40 ) key.down = true;
	if( e.keyCode == 65 ) key.a = true;
        if( e.keyCode == 68 ) key.d = true;
        if( e.keyCode == 87 ) key.w = true;
        if( e.keyCode == 83 ) key.s = true;
        if( e.keyCode == 27 ) key.esc = true;
	if( e.keyCode == 80 ) key.p = true;
    }
    if(e.type == "keyup"){
        if ( e.keyCode == 37 ) key.left = false;
        if ( e.keyCode == 39 ) key.right = false;
        if ( e.keyCode == 38 ) key.up = false;
        if ( e.keyCode == 40 ) key.down = false;
	if( e.keyCode == 65 ) key.a = false;
        if( e.keyCode == 68 ) key.d = false;
        if( e.keyCode == 87 ) key.w = false;
        if( e.keyCode == 83 ) key.s = false;
        if( e.keyCode == 27 ) key.esc = false;
	if( e.keyCode == 80 ) key.p = false;
    }
}

function handleMotion(e){
    
    if(e.accelerationIncludingGravity){
	accelerometer.x = e.accelerationIncludingGravity.x/9.801;
	accelerometer.y = e.accelerationIncludingGravity.y/9.801;
	accelerometer.z = e.accelerationIncludingGravity.z/9.801;
    }
    
    if(e.alpha){
	var absolute = e.absolute;
	var alpha = e.alpha;
	var beta = e.beta;
	var gamma = e.gamma;
	
	if( Math.abs( window.orientation ) == 0 ){
	    orient.portrait = true;
	    orient.landscape = false;
	}else{
	    orient.landscape = true;
	    orient.portrait = false;
	}
    }
}

function handleMobile(e){
    e.preventDefault();
    
    if(touch.identifier == -1 && touch.endTime+10 <= new Date().getTime()){
        touch.release = false;
    }
    
    if(e.type == "touchstart"){
        for(i=0; i<e.changedTouches.length; i++){
            var t = e.changedTouches[i];
            
            touch.identifier = t.identifier;
            touch.release = false;
            touch.srcpos = new Vec2(
		(-renderer.width/2)+t.pageX-((window.innerWidth-renderer.width)/2),
		(-renderer.height/2)+t.pageY-((window.innerHeight-renderer.height)/2)
	    );
	    touch.pos = new Vec2(
		(game.cam.pos.x-renderer.width/2)+t.pageX-((window.innerWidth-renderer.width)/2),
		(game.cam.pos.y-renderer.height/2)+t.pageY-((window.innerHeight-renderer.height)/2)
	    );
            touch.startTime = new Date().getTime();
        }
    }
    if(e.type == "touchmove"){
        for(i=0; i<e.changedTouches.length; i++){
            var t = e.changedTouches[i];
            
            touch.identifier = t.identifier;
            touch.release = false;
	    touch.srcpos = new Vec2(
		(-renderer.width/2)+t.pageX-((window.innerWidth-renderer.width)/2),
		(-renderer.height/2)+t.pageY-((window.innerHeight-renderer.height)/2)
	    );
            touch.pos = new Vec2(
		(game.cam.pos.x-renderer.width/2)+t.pageX-((window.innerWidth-renderer.width)/2),
		(game.cam.pos.y-renderer.height/2)+t.pageY-((window.innerHeight-renderer.height)/2)
	    );
            touch.time = new Date().getTime();
        }
    }
    if(e.type == "touchend"){
        for(i=0; i<e.changedTouches.length; i++){
            var t = e.changedTouches[i];
            
            touch.identifier = -1;
            touch.release = true;
	    touch.srcpos = new Vec2(
		(-renderer.width/2)+t.pageX-((window.innerWidth-renderer.width)/2),
		(-renderer.height/2)+t.pageY-((window.innerHeight-renderer.height)/2)
	    );
            touch.pos = new Vec2(
		(game.cam.pos.x-renderer.width/2)+t.pageX-((window.innerWidth-renderer.width)/2),
		(game.cam.pos.y-renderer.height/2)+t.pageY-((window.innerHeight-renderer.height)/2)
	    );
            touch.endTime = new Date().getTime();
        }
    }
}