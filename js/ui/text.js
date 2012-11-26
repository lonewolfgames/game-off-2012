var Text = Class.extend({
    init: function(cam,id,size,font,x,y,text,color){
        this.id = id;
        this.size = size;
        this.font = font;
        this.x = x;
        this.y = y;
        this.pos = new Vec2(cam.x+x,cam.y+y);
        this.text = text;
        this.color = color;
        this.active = true;
    },
    
    update: function(cam){
        this.pos = new Vec2(cam.x + this.x, cam.y + this.y);
    },
    
    draw: function(){
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.textBaseline = "middle"
        ctx.textAlign = "center";
        ctx.font = Math.round(this.size*renderer.scale)+"px "+this.font;
        ctx.fillText(this.text, this.pos.x, this.pos.y);
        ctx.restore();
    }
});