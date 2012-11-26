var CloudSystem = Class.extend({
    init: function(cam,max,maxSpd,imgLoc){
        this.max = max;
        this.imgLoc = imgLoc;
        this.maxSpd = maxSpd;
        this.imgs = ["cloud01.png","cloud02.png","cloud03.png"];
        this.clouds = [];
        
        for(var i=0; i<this.max; i++){
            this.clouds.push(new Cloud(
                Math.randomRangeInt(cam.x - renderer.width, cam.x + renderer.width),
                Math.randomRangeInt(cam.y - renderer.height, cam.y + renderer.height),
                this.maxSpd,
                images.img(this.imgLoc + this.imgs[Math.randomInt(2)])
            ));
        }
    },
    
    update: function(cam){
        this.clouds = this.clouds.filter(function(cloud){return cloud.active;});
        for(var i=0; i<this.clouds.length; i++){
            var cloud = this.clouds[i];
            cloud.update(cam);
        }
        
        if(this.clouds.length < this.max){
            var x,y,num = Math.randomInt(3);
            if(num == 0){
                x = Math.randomRangeInt(cam.x - renderer.width, cam.x + renderer.width);
                y = Math.randomRangeInt(cam.y - renderer.height, cam.y - renderer.height);
            }
            else if(num == 1){
                x = Math.randomRangeInt(cam.x - renderer.width, cam.x + renderer.width);
                y = Math.randomRangeInt(cam.y + renderer.height, cam.y + renderer.height);
            }
            else if(num == 2){
                x = Math.randomRangeInt(cam.x - renderer.width, cam.x - renderer.width);
                y = Math.randomRangeInt(cam.y - renderer.height, cam.y + renderer.height);
            }
            else{
                x = Math.randomRangeInt(cam.x + renderer.width, cam.x + renderer.width);
                y = Math.randomRangeInt(cam.y - renderer.height, cam.y + renderer.height);
            }
            this.clouds.push(new Cloud(x,y,this.maxSpd,images.img(this.imgLoc+this.imgs[Math.randomInt(2)])));
        }
    },
    
    draw:function(){
        this.clouds.forEach(function(cloud){cloud.draw();});
    }
});

var Cloud = Class.extend({
    init: function(x,y,spd,img){
        this.pos = new Vec2(x,y);
        this.img = img;
        this.spd = Math.randomRangeInt(-spd,spd);
        this.v = new Vec2(
            this.spd,
            this.spd/5
        );
        this.halfWidth = this.img.width * (0.75+Math.random()*0.5) * renderer.scale;
        this.halfHeight = this.img.height * (0.9+Math.random()*0.2) * renderer.scale;
        
        this.active = true;
    },
    
    update: function(cam){
        if( this.pos.x+this.halfWidth <= cam.x-renderer.width ||
            this.pos.y+this.halfHeight <= cam.y-renderer.height ||
            this.pos.x-this.halfWidth >= cam.x+renderer.width ||
            this.pos.y-this.halfHeight >= cam.y+renderer.height
        ){
            this.active = false;
        }
        
        this.pos = this.pos.add(this.v.scale(1/time.delta));
    },
    
    draw: function(){
        if(onScreenImg(this.pos.x,this.pos.y,this.halfWidth,this.halfHeight) ){
            ctx.save();
            ctx.drawImage(
                this.img,
                0,
                0,
                this.img.width,
                this.img.height,
                this.pos.x-(this.halfWidth),
                this.pos.y-(this.halfHeight),
                (this.halfWidth*2),
                (this.halfHeight*2)
            );
            ctx.restore();
        }
    }
});