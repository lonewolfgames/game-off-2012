var Selector = Class.extend({
    init: function(cam,id,x,y,width,array){
        this.id = id;
        this.x = x * renderer.scale;
        this.y = y * renderer.scale;
        this.current = 0;
        this.array = array;
        this.pos = new Vec2(cam.x+x,cam.y+y);
        if(width == "100%"){
            this.buttons = [
                new ButtonImg(cam,"LeftBtn",images.img("ui/leftArrow.png"),x + (renderer.scale * 48) - renderer.width/2,y,{x:0,y:0},{x:0,y:84},62,84),
                new ButtonImg(cam,"RightBtn",images.img("ui/rightArrow.png"),x - (renderer.scale * 48) + renderer.width/2,y,{x:0,y:0},{x:0,y:84},62,84)
            ];
        }
        else{
            this.buttons = [
                new ButtonImg(cam,"LeftBtn",images.img("ui/leftArrow.png"),x - (width/2*renderer.scale),y,{x:0,y:0},{x:0,y:84},62,84),
                new ButtonImg(cam,"RightBtn",images.img("ui/rightArrow.png"),x + (width/2*renderer.scale),y,{x:0,y:0},{x:0,y:84},62,84)
            ];
        }
        this.down = false;
        this.active = true;
    },
    
    getCurrent: function(){
        return this.array[this.current];
    },
    
    update: function(cam){
        this.buttons = this.buttons.filter(function(button){return button.active;});
        for(var i = 0; i < this.buttons.length; i++){
            var button = this.buttons[i];
            
            if(button.pressed){
                if(button.id == "LeftBtn"){
                    this.current -= 1;
                    
                    if(this.current < 0){
                        this.current = this.array.length-1;
                    }
                }
                if(button.id == "RightBtn"){
                    this.current += 1;
                    
                    if(this.current > this.array.length - 1){
                        this.current = 0;
                    }
                }
            }
            
            button.update(cam);
        }
        
    },
    
    draw: function(cam){
        this.buttons.forEach(function(button){button.draw();});
    }
});