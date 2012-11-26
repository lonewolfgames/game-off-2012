var Images = Class.extend({
    init: function(imageFolder, imagesSrc){
        this.imageFolder = imageFolder+"/";
        this.images = [];
        
        for(var i=0; i<imagesSrc.length; i++){
            this.images[i] = new CanvasImage( this.imageFolder + imagesSrc[i] );
        }
    },
    
    img: function(src){
        var img = null;
        
        for(var i=0; i<this.images.length; i++){
            var image = this.images[i];
            
            if(image.src == location.href + this.imageFolder + src){
                img = this.images[i];
            }
        }
        
        return img;
    }
});