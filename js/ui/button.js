var Button = Class.extend({
    init: function(cam,id,x,y){
        this.id = id;
        this.x = x;
        this.y = y;
        this.pos = new Vec2(cam.x+x,cam.y+y);
        this.over = false;
        this.pressed = false;
        this.down = false;
        this.active = true;
    },
    
    update: function(cam,w,h){
        if(mouse.pos){
            if( mouse.srcpos.x >= this.x - renderer.scale*(w/2) &&
                mouse.srcpos.y >= this.y - renderer.scale*(h/2) &&
                mouse.srcpos.x <= this.x + renderer.scale*(w/2) &&
                mouse.srcpos.y <= this.y + renderer.scale*(h/2)
            ){
                this.over = true;
            }
            else{
                this.over = false;
            }
        }
        
        if(touch.pos){
            if( touch.srcpos.x >= this.x - renderer.scale*(w/2) &&
                touch.srcpos.y >= this.y - renderer.scale*(h/2) &&
                touch.srcpos.x <= this.x + renderer.scale*(w/2) &&
                touch.srcpos.y <= this.y + renderer.scale*(h/2)
            ){
                this.over = true;
            }
            else{
                this.over = false;
            }
        }
        
        if( this.over == true && (mouse.down == true || touch.identifier != -1 ) ){
            this.down = true;
        }else{
            this.down = false;
        }
        
        if( this.over == true && (mouse.release == true || touch.release == true)){
            this.pressed = true;
            mouse.release = false;
            touch.release = false;
        }else{
            this.pressed = false;
        }
        
        this.pos = new Vec2(cam.x + this.x, cam.y + this.y);
    }
});