var Player = Circle.extend({
    init: function(id, x, y, angle, radius, img){
        this._super.call(this, id, x, y, angle, radius, img);
        this.imgOffset = 3*renderer.scale;
        this.spd = 1;
        this.maxSpd = 25;
    },
    
    update: function(b, b2Scale){        
        var length = ((this.radius*1.25)/b2Scale);
        var start = b.GetPosition();
        var end = new b2Vec2(start.x, start.y+length );
        
        b.ApplyTorque(accelerometer.y*this.spd*2);
    
        if(key.right || key.d){
            b.ApplyTorque(this.spd);
        }
        if(key.left || key.a){
            b.ApplyTorque(-this.spd);
        }
        
        game.world.world.RayCast(function(f,p,n,frac){
            if( (key.up || key.w) && (p.y < length || -p.y < length) ){
                b.ApplyImpulse( new b2Vec2( 0, -1.5), b.GetPosition() );
                key.up = false;
                key.w = false;
                touch.identifier == -1
            }
            if(touch.identifier != -1 && (p.y < length || -p.y < length) ){
                b.ApplyImpulse( new b2Vec2( 0, -1.5), b.GetPosition() );
            }
        }, start, end);
        
        var velocity = b.GetAngularVelocity();
        if( Math.abs(velocity) >= this.maxSpd){
            b.SetAngularVelocity( (this.maxSpd/Math.abs(velocity)) * velocity );
        }
        
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
                this.x-(this.radius+this.imgOffset),
                this.y-(this.radius+this.imgOffset),
                (this.radius+this.imgOffset)*2,
                (this.radius+this.imgOffset)*2
            );
            ctx.restore();
        }
        //this._super.call(this);
    }
});