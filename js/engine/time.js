var Time = Class.extend({
    init: function(){
        this.updateDrawRate = 10;
        this.nextDrawUpdate = 0;
        this.startTime = new Date().getTime();
        this.time = 0;
        this.lastTime = -50/3;
        this.delta = 1000/(this.time-this.lastTime);
        
        var fps = document.createElement("p");
	    fps.id = "fps";
	    fps.style.fontSize = Math.round(renderer.scale*15)/10 + "em";
	    fps.style.zIndex = "1";
	    fps.style.position = "absolute";
	    fps.style.top = "0";
	    fps.style.left = "0";
	    fps.style.background = "rgba(255,255,255,0.75)";
	    fps.style.color = "#000";
	    document.body.appendChild(fps);
    },
    
    update: function(){
        this.time = (new Date().getTime()) - this.startTime;
        this.delta = 1000 / (this.time - this.lastTime);
        this.lastTime = this.time;
    },

    draw: function(){
        if(this.nextDrawUpdate >= this.updateDrawRate){
            document.getElementById("fps").innerHTML = "FPS: " + (Math.round(this.delta*100)/100).toFixed(2);
            this.nextDrawUpdate = 0;
        }
        else{
            this.nextDrawUpdate++;
        }
    }
});