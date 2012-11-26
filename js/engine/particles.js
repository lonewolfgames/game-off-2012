var Particle = Class.extend({
    init: function(x, y, spd, dir, animation, spin, fadeIn, fadeOut, life, seed){
        this.pos = new Vec2(x,y);
        this.spd = -spd;
        this.dir = dir;
        this.animation = animation;
        this.spin = spin*Math.randomList([-1,1]) + spin*Math.random()*seed;
        this.fadeIn = fadeIn;
        this.fadeOut = fadeOut;
        this.life = life + life*Math.random()*seed;
        this.birth = time.time;
        this.v = new Vec2(
            this.spd * Math.cos(this.dir) + spd*Math.random()*seed*(-1+Math.random()*2),
            this.spd * Math.sin(this.dir) + spd*Math.random()*seed*(-1+Math.random()*2)
        );
        this.angle = 0;
        this.alpha = 0;
        if(this.fadeIn == 0){
            this.alpha = 1;
        }
        
        this.active = true;
    },
    
    update: function(){
        if(this.birth + this.life <= time.time ) this.active = false;
        
        var lifeLeft = (time.time - this.birth)/this.life;
        if( lifeLeft <= this.fadeIn ){
            this.alpha = lifeLeft/this.fadeIn;
        }
        if( lifeLeft >= this.fadeOut ){
            this.alpha = Math.log(lifeLeft)/Math.log(this.fadeOut);
            
            if(this.animation == "grow"){
                this.size = this.size + this.size*(lifeLeft/100);
            }
            else if(this.animation == "shrink"){
                this.size = this.size*(Math.log(lifeLeft)/Math.log(this.fadeOut));
            }else{}
        }
        if(this.alpha >= 1) this.alpha = 1;
        if(this.alpha <= 0) this.alpha = 0;
        
        if(this.spin != null || this.spin != 0){
            this.angle += this.spin * (Math.PI/180);
        }
        if(this.spin == null || this.spin == 0){
            this.angle = Math.atan2(this.v.y, this.v.x);
        }
        
        this.pos = this.pos.add(this.v.scale(1/time.delta));
    },
    
    draw: function(){
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);
        ctx.translate(-(this.pos.x), -(this.pos.y));
    }
});

var SquareParticle = Particle.extend({
    init: function(x, y, spd, dir, size, color, animation, spin, fadeIn, fadeOut, life, seed){
        this._super.call(this, x, y, spd, dir, animation, spin, fadeIn, fadeOut, life, seed);
        this.size = renderer.scale*size + renderer.scale*size*Math.random()*seed*Math.randomList([-1,1]);
        if(this.size <= 0) this.size = 0.001;
        this.color = color;
    },
    
    update: function(){
        this._super.call(this);
    },
    
    draw: function(){
        if( onScreenImg(this.pos.x,this.pos.y,this.size,this.size) ){
            ctx.save();
            ctx.fillStyle = this.color;
            this._super.call(this);
            ctx.fillRect(
                this.pos.x - this.size/2, this.pos.y - this.size/2, this.size, this.size
            );
            ctx.restore();
        }
    }
});

var RectParticle = Particle.extend({
    init: function(x, y, spd, dir, width, height, color, animation, spin, fadeIn, fadeOut, life, seed){
        this._super.call(this, x, y, spd, dir, animation, spin, fadeIn, fadeOut, life, seed);
        this.width = renderer.scale*width + renderer.scale*width*Math.random()*seed*Math.randomList([-1,1]);
        this.height = renderer.scale*height + renderer.scale*height*Math.random()*seed*Math.randomList([-1,1]);
        if(this.width <= 0) this.width = 0.001;
        if(this.height <= 0) this.height = 0.001;
        this.color = color;
    },
    
    update: function(){
        this._super.call(this);
    },
    
    draw: function(){
        if( onScreenImg(this.pos.x,this.pos.y,this.width,this.height) ){
            ctx.save();
            ctx.fillStyle = this.color;
            this._super.call(this);
            ctx.fillRect(
                this.pos.x - this.width/2, this.pos.y - this.height/2, this.width, this.height
            );
            ctx.restore();
        }
    }
});

var CircleParticle = Particle.extend({
    init: function(x, y, spd, dir, size, color, animation, spin, fadeIn, fadeOut, life, seed){
        this._super.call(this, x, y, spd, dir, animation, spin, fadeIn, fadeOut, life, seed);
        this.size = renderer.scale*size + renderer.scale*size*Math.random()*seed*seed*Math.randomList([-1,1]);
        if(this.size <= 0) this.size = 0.001;
        this.color = color;
    },
    
    update: function(){
        this._super.call(this);
    },
    
    draw: function(){
        if( onScreenImg(this.pos.x,this.pos.y,this.size,this.size) ){
            ctx.save();
            ctx.fillStyle = this.color;
            this._super.call(this);
            ctx.beginPath();
            ctx.arc(this.pos.x,this.pos.y,this.size,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
});

var ImgParticle = Particle.extend({
    init: function(img, x, y, spd, dir, size, animation, spin, fadeIn, fadeOut, life, seed){
        this._super.call(this, x, y, spd, dir, animation, spin, fadeIn, fadeOut, life, seed);
        this.img = img;
        this.size = renderer.scale*size + renderer.scale*size*Math.random()*seed*Math.randomList([-1,1]);
        if(this.size <= 0) this.size = 0.001;
    },
    
    update: function(){
        this._super.call(this);
    },
    
    draw: function(){
        if( onScreenImg(this.pos.x,this.pos.y,this.size,this.size) ){
            ctx.save();
            this._super.call(this);
            ctx.drawImage(
                this.img,
                0,
                0,
                this.img.width,
                this.img.height,
                this.pos.x-(this.size*renderer.scale),
                this.pos.y-(this.size*renderer.scale),
                (this.size*2)*renderer.scale,
                (this.size*2)*renderer.scale
            );
            ctx.restore();
        }
    }
});