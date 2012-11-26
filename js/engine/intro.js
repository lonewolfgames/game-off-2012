var Intro = Class.extend({
    init: function(bg,onFinished,pages){
        this.bg = bg;
        this.onFinished = onFinished;
        this.cam = new Camera();
        this.pages = pages;
        this.page = 0;
        this.currentPage = this.pages[0];
        this.birth = time.time;
    },
    
    clear: function(){
        ctx.save();
        ctx.fillStyle = this.bg;
        ctx.fillRect(this.cam.pos.x-(renderer.width/2), this.cam.pos.y-(renderer.height/2), renderer.width, renderer.height);
        ctx.restore();
    },
    
    update: function(){    
        if(this.currentPage.active == false){
            this.page += 1;
            this.currentPage = this.pages[this.page];
        }else{
            this.currentPage.update();
        }
        
        if(touch.identifier != -1 || mouse.release){
            mouse.release = false;
            touch.identifier = -1
            this.currentPage.active = false;
        }
        
        if(this.page >= this.pages.length){
            game = this.onFinished;
        }
    },
    
    draw: function(){
        this.currentPage.draw();
    }
});

var IntroPage = Class.extend({
    init: function(img,text,font,color){
        this.img = img;
        this.text = text;
        this.font = font;
        this.color = color;
        this.h = (renderer.height * 0.65);
        this.w = (this.h * (this.img.width/this.img.height) );
        this.fontsize = 50 * renderer.scale;
        this.pos = new Vec2(renderer.width + this.w/2,0);
        this.v = new Vec2(0,0);
        this.birth = time.time;
        if(img == "" || img == null || img == undefined){
            this.img = "";
            this.h = 0;
            ctx.font = this.fontsize + "px "+this.font;
            this.w = ctx.measureText(this.text, 0, 0).width;
            this.pos = new Vec2(renderer.width + this.w/2, -this.fontsize/2);
        }
        this.active = true;
    },
    
    update: function(){
        if(this.pos.x >= 0){
            this.pos.x -= (this.pos.x)/32;
        }
        if(this.pos.x <= 1){
            this.v.y += 10;
        }
        
        if(this.pos.y >= renderer.height + this.h/2){
            this.active = false;
        }
        
        this.pos = this.pos.add(this.v.scale(1/time.delta));
    },
    
    draw: function(){
        if(onScreenImg(this.pos.x,this.pos.y,this.w,this.h) ){
            ctx.save();
            
            if(this.img != "" ){
                ctx.drawImage(
                    this.img,
                    0,
                    0,
                    this.img.width,
                    this.img.height,
                    this.pos.x - this.w/2,
                    this.pos.y - this.h/2,
                    this.w,
                    this.h
                );
            }
            
            ctx.fillStyle = this.color;
            ctx.textBaseline = "middle"
            ctx.textAlign = "center";
            ctx.font = Math.round(this.fontsize)+"px "+this.font;
            ctx.fillText(this.text, this.pos.x, this.pos.y + this.h/2 + this.fontsize);
            
            ctx.restore();
        }
    }
});