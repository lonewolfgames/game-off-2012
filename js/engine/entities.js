var Entity = Class.extend({
    init: function(id, x, y, angle){
        this.id = id;
        this.x = x;
        this.y = y;
        this.angle = angle;
    },
    
    update: function(b, b2Scale){
        this.x = b.GetPosition().x*b2Scale;
        this.y = b.GetPosition().y*b2Scale;
        this.angle = b.GetAngle();
    },
    
    draw: function(){
        /*
        if( onScreenImg(this.x,this.y,this.img.width,this.img.height) ){
            ctx.save();
            ctx.fillStyle = "#000";
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3*renderer.scale, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        */
    }
});

var PointBased = Entity.extend({
    init: function(id, x, y, angle, points, img){
        this._super.call(this, id, x, y, angle);
        this.points = points;
        this.visable = true;
        if(!img){
            this.visable = false;
        }else{
            this.img = img;
        }
    },
    
    update: function(b, b2Scale){
        this._super.call(this, b, b2Scale);
    },
    
    draw: function(){
        if(this.visable == true && onScreenPoints(this.x, this.y, this.points) ){
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.fillStyle = ctx.createPattern(this.img,"repeat");
            ctx.scale(renderer.scale,renderer.scale);
            ctx.rotate(this.angle);
            ctx.translate(-(this.x), -(this.y));

        
            ctx.beginPath();
            ctx.moveTo( (this.x + this.points[0].x), (this.y + this.points[0].y));
            for (var i = 1; i < this.points.length; i++) {
               ctx.lineTo( (this.points[i].x + this.x), (this.points[i].y + this.y));
            }
            ctx.lineTo( (this.x + this.points[0].x), (this.y + this.points[0].y));
            ctx.closePath();
            
            ctx.fill();
            ctx.restore();
            
            this._super.call(this);
        }
    }
});

var Circle = Entity.extend({
    init: function(id, x, y, angle, radius, img){
        this._super.call(this, id, x, y, angle);
        this.radius = radius*renderer.scale;
        this.visable = true;
        if(!img){
            this.visable = false;
        }else{
            this.img = img;
        }
    },
    
    update: function(b, b2Scale){
        this._super.call(this, b, b2Scale);
    },
    
    draw: function(){
        if(this.visable == true && onScreenImg(this.x,this.y,this.radius,this.radius) ){
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.translate(-(this.x), -(this.y));
            
            ctx.drawImage(
                this.img,
                0,
                0,
                this.img.width,
                this.img.height,
                this.x-(this.radius),
                this.y-(this.radius),
                (this.radius*2),
                (this.radius*2)
            );
            ctx.restore();
            
            this._super.call(this);
        }
    }
});

var Box = Entity.extend({
    init: function(id, x, y, angle, halfWidth, halfHeight, img){
        this._super.call(this, id, x, y, angle);
        this.halfWidth = halfWidth*renderer.scale;
        this.halfHeight = halfHeight*renderer.scale;
        this.visable = true;
        if(!img){
            this.visable = false;
        }else{
            this.img = img;
        }
    },
    
    update: function(b, b2Scale){
        this._super.call(this, b, b2Scale);
    },
    
    draw: function(){
        if(this.visable == true && onScreenImg(this.x,this.y,this.halfWidth,this.halfHeight) ){
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.translate(-(this.x), -(this.y));
            
            ctx.drawImage(
                this.img,
                0,
                0,
                this.img.width,
                this.img.height,
                this.x-(this.halfWidth),
                this.y-(this.halfHeight),
                (this.halfWidth*2),
                (this.halfHeight*2)
            );
            ctx.restore();
            
            this._super.call(this);
        }
    }
});