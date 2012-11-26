var Camera = Class.extend({
    init: function(){
        this.pos = new Vec2(0,0);
        this.newpos = this.pos;
        this.prepos = this.pos;
        this.v = new Vec2(0,0);
	this.offset = new Vec2(0,0);
        this.follow = false;
        this.spd = 3;
    },
    
    setSlowFollow: function(spd){
	this.follow = true;
        this.spd = spd;
    },
    
    setFollow: function(){
	this.follow = true;
	this.spd = -1;
    },
    
    setOffset: function(vector){
        this.offset = vector;
    },
        
    update: function(){
        if(this.follow && this.spd != -1){
            if(this.newpos.x != this.pos.x || this.newpos.y != this.pos.y){
                var x = this.newpos.sub(this.pos).x + this.offset.x;
                var y = this.newpos.sub(this.pos).y + this.offset.y;
                var l = new Vec2(x,y).add(this.offset).length();
                
                this.v.x = (x/l)*l*this.spd;
                this.v.y = (y/l)*l*this.spd;
            }
            
            this.pos = this.pos.add(this.v.scale(1/time.delta));
        }
        else{
            this.pos = this.newpos;
        }
        
	if(this.pos.x != this.prepos.x){
	    ctx.translate(this.prepos.sub(this.pos).x,0);
	}
	if(this.pos.y != this.prepos.y){
	    ctx.translate(0,this.prepos.sub(this.pos).y);
	}
	
	this.prepos = this.pos;
    },
});