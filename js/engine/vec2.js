var Vec2 = Class.extend({
    init: function(x,y){
        this.x = x || 0;
        this.y = y || 0;
    },
    
    add: function(other){
        return new Vec2(this.x + other.x, this.y + other.y);
    },
    
    sub: function(other){
        return new Vec2(this.x - other.x, this.y - other.y);
    },
    
    scale: function(scale){
        return new Vec2(this.x * scale, this.y * scale);
    },
    
    dot: function(other){
        return ((this.x * other.x) + (this.y * other.y));
    },
    
    round: function(){
        return new Vec2( Math.round(this.x), Math.round(this.y) );
    },
    
    length: function(){
        return Math.sqrt( Math.sq(this.x) + Math.sq(this.y) );
    },
    
    distance: function(other){
        return Math.sqrt( Math.sq(other.x - this.x) + Math.sq(other.y - this.y) );
    },
    
    midpoint: function(other){
        return new Vec2( (this.x+other.x)/2, (this.y+other.y)/2 );
    },
    
    normalize: function(){
        var length = this.length();
        if(length > 0){
            this.x = this.x/length;
            this.y = this.y/length;
        }
        return this;
    },
    
    opposite: function(){
        this.x = -this.x;
        this.y = -this.y;
    },
    
    perpendicular: function(){
        return new Vec2(-this.y, this.x);
    },
    
    reset: function(){
        this.x = 0;
        this.y = 0;
    },
    
    print: function(){
        console.log("Vec2( "+this.x+", "+this.y+")");
    }
});