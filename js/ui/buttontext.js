var ButtonText = Button.extend({
    init: function(cam,id,size,font,x,y,text,color,hoverColor){
        this._super.call(this,cam,id,x,y);
        this.size = size;
        this.font = font;
        this.text = text;
        this.color = color;
        this.hoverColor = hoverColor;
        
        ctx.font = this.size+"px "+this.font;
        this.w = ctx.measureText(this.text, 0, 0).width + 8;
        this.h = this.size + 8;
    },
    
    update: function(cam){
        this._super.call(this,cam,this.w,this.h);
    },
    
    draw: function(){
        ctx.save();
        if(!this.down){
            ctx.fillStyle = this.color;
        }else{
            ctx.fillStyle = this.hoverColor;
        }
        
        ctx.textBaseline = "middle"
        ctx.textAlign = "center";
        ctx.font = Math.round(this.size*renderer.scale)+"px "+this.font;
        ctx.fillText(this.text, this.pos.x, this.pos.y);
        ctx.restore();
    }
});