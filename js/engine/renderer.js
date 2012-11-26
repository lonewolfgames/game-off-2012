var ctx;

var Renderer = Class.extend({
    init: function(color, minAspect, maxAspect, baseHeight, maxWidth){
        this.color = color || "#fff";
        this.minAspect = minAspect || 1;
        this.maxAspect = maxAspect || 2;
        this.newAspect = ((this.minAspect+this.maxAspect)/2);
        this.maxWidth = maxWidth || 960;
        this.baseHeight = baseHeight || 640;
        this.scale = 1;
        this.width = this.maxWidth;
        this.height = this.maxWidth / this.newAspect;
        this.canvas = document.createElement("canvas");
        this.canvas.id = "canvas";
	this.canvas.style.background = this.color;
        this.canvas.style.position = "absolute";
        this.canvas.style.left = "50%";
        this.canvas.style.top = "50%";
        document.body.appendChild(this.canvas);
	
	if(this.width > window.innerWidth || this.height > window.innerHeight){
	    this.width = window.innerWidth;
	    this.height = window.innerHeight;
	    this.newAspect = this.width/this.height;
	    
	    if(window.innerHeight > this.maxWidth/this.newAspect){
		this.height = this.maxWidth/this.newAspect;
		this.width = this.maxWidth;
	    }
	    
	    if(this.newAspect < this.maxAspect && this.newAspect > this.minAspect){
		this.width  = this.height*this.newAspect;
		this.height = this.width/this.newAspect;
	    }
	    else if(this.newAspect > this.maxAspect){
		this.width  = this.height*this.maxAspect;
	    }
	    else if(this.newAspect < this.minAspect){
		this.height = this.width/this.minAspect;
	    }
	}
        
	this.scale = this.height/this.baseHeight;
	
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.marginTop = (-this.height/2) + "px";
        this.canvas.style.marginLeft = (-this.width/2) + "px";
        
	ctx = this.canvas.getContext("2d");
        ctx.translate(this.width/2,this.height/2);
    },
    
    reset: function(offSetVec2){
	ctx.translate(offSetVec2.x,offSetVec2.y);
    }
});