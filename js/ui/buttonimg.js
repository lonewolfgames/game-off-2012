var ButtonImg = Button.extend({
    init: function(cam,id,img,x,y,spos,sposover,w,h){
        this._super.call(this,cam,id,x,y);
        this.img = img;
        this.spos = spos;
        this.sposover = sposover;
        this.w = w;
        this.h = h;
    },
    
    update: function(cam){
        this._super.call(this,cam,this.w,this.h);
    },
    
    draw: function(){
        ctx.save();
        if(this.img){
            if(!this.down){
                ctx.drawImage(
                    this.img,
                    this.spos.x,
                    this.spos.y,
                    this.w,
                    this.h,
                    this.pos.x-(this.w/2*renderer.scale),
                    this.pos.y-(this.h/2*renderer.scale),
                    (this.w*renderer.scale),
                    (this.h*renderer.scale)
                );
            }else{
                ctx.drawImage(
                    this.img,
                    this.sposover.x,
                    this.sposover.y,
                    this.w,
                    this.h,
                    this.pos.x-(this.w/2*renderer.scale),
                    this.pos.y-(this.h/2*renderer.scale),
                    (this.w*renderer.scale),
                    (this.h*renderer.scale)
                );
            }
        }
        ctx.restore();
    }
});