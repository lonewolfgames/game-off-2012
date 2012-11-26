var Message = Class.extend({
    init: function(animation,cam,x,y,size,font,text,color,life){
        this.animation = animation;
        this.size = size;
        this.font = font;
        this.x = x;
        this.y = y;
        this.pos = new Vec2(cam.x+x,cam.y+y);
        this.text = text;
        this.color = color;
        this.birth = time.time;
        this.life = life;
        this.currentSize = 0;
        this.alpha = 0;
        
        this.active = true;
    },
    
    update: function(cam){
        if(this.animation == "grow") this.grow();
        if(this.animation == "pop") this.pop();
    
        if(this.alpha >= 1) this.alpha = 1;
        if(this.alpha <= 0) this.alpha = 0;

        if(this.birth + this.life <= time.time){
            this.active = false;
        }
        this.pos = new Vec2(cam.x + this.x, cam.y + this.y);
    },
    
    grow: function(){
        var lifeLeft = (time.time - this.birth)/this.life;
        if( lifeLeft <= 0.25 ){
            if(this.currentSize < this.size ){
                this.currentSize = this.size*(lifeLeft/0.25);
            }
            this.alpha = lifeLeft/0.25;
        }
        if( lifeLeft >= 0.5 ){
            this.alpha = Math.log(lifeLeft)/Math.log(0.5);
        }
    },
    
    pop: function(){
        this.currentSize = this.size;
        var lifeLeft = (time.time - this.birth)/this.life;
        if( lifeLeft <= 0.1 ){
            this.alpha = lifeLeft/0.1;
        }
        if( lifeLeft >= 0.9 ){
            this.alpha = Math.log(lifeLeft)/Math.log(0.9);
        }
    },
    
    draw: function(){
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.textBaseline = "middle"
        ctx.textAlign = "center";
        ctx.font = Math.round(this.currentSize*renderer.scale)+"px "+this.font;
        ctx.fillText(this.text, this.pos.x, this.pos.y);
        ctx.restore();
    }
});