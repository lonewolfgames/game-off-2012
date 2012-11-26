var UiImg = Class.extend({
    init: function(cam,img,x,y,src,w,h){
        this.img = img;
        this.x = x;
        this.y = y;
        this.pos = new Vec2(cam.x+x,cam.y+y);
        this.src = src;
        this.w = w;
        this.h = h;
        this.active = true;
    },
    
    update: function(cam){
        this.pos = new Vec2(cam.x + this.x, cam.y + this.y);
    },
    
    draw: function(){
        ctx.save();
        if(this.img){
            ctx.drawImage(
                this.img,
                this.src.x,
                this.src.y,
                this.w,
                this.h,
                this.pos.x-(this.w/2*renderer.scale),
                this.pos.y-(this.h/2*renderer.scale),
                (this.w*renderer.scale),
                (this.h*renderer.scale)
            );
        }
        ctx.restore();
    }
});