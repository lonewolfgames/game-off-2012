var MainMenu = Class.extend({
    init: function(theme){
        this.themeNum = theme;
        this.themeData = Themes[theme];
        this.bg = this.themeData.bg;
        this.cam = new Camera();
        this.cam.newpos = new Vec2(0,-256*renderer.scale);
        this.world = new World(100*renderer.scale, new b2Vec2(0,9.801), true);
        this.world.drawHelper(0.5);
        this.cloudSystem = new CloudSystem(this.cam.pos,5,5,this.themeData.imgLoc);
        
        this.objects = [];
        this.ui = [];
        this.worldSelectNum = 0;
        this.levelSelectNum = 0;
        
        this.paused = false;
        this.uiMainMenu();
        
        for(var i=0; i<this.themeData.objects.length; i++){
            var obj = this.themeData.objects[i];
            if(obj.img.length) obj.img = images.img( obj.img );
        }
        
        this.world.addBodies(this.themeData.objects);
        this.world.addBodies([{name: "", img: images.img("playerSkins/"+options.playerSkin+".png"), x: this.themeData.player.x, y: this.themeData.player.y, angle: 0, radius: 32, d: 1.0, f: 1.0, r: 0.25, type: "dynamic"}]);
    },
    
    startLevel: function(){
        renderer.reset(this.cam.pos);
        game = new Level(this.worldSelectNum-1, this.levelSelectNum-1);
    },
    
    uiMainMenu: function(){
        this.ui = [];
        this.ui.push(
            new ButtonImg(this.cam.pos,"StartBtn",images.img("ui/startbtn.png"),0,(-60*renderer.scale),{x:0,y:0},{x:0,y:70},229,70),
            new ButtonImg(this.cam.pos,"OptionsBtn",images.img("ui/optionsbtn.png"),0,(60*renderer.scale),{x:0,y:0},{x:0,y:88},352,88)
        );
    },
    
    uiWorldSelect: function(){
        this.ui = [];
        this.ui.push(
            new Selector(this.cam.pos,"World",0,0,"100%",Worlds),
            new ButtonImg(this.cam.pos,"WorldBtn",images.img("ui/world01.png"),0,0,{x:0,y:0},{x:0,y:0},512,256),
            new ButtonImg(this.cam.pos,"BackBtn",images.img("ui/backbtn.png"),0,(renderer.height/2)-(64*renderer.scale),{x:0,y:0},{x:0,y:72},220,72)
        );
    },
    
    uiLevelSelect: function(){
        this.ui = [];
        this.ui.push(
            new Selector(this.cam.pos,"Level",0,0,"100%",Worlds[this.worldSelectNum-1].Levels),
            new ButtonImg(this.cam.pos,"LevelBtn",images.img("ui/level01btn.png"),0,0,{x:0,y:0},{x:0,y:256},256,256),
            new ButtonImg(this.cam.pos,"BackWorldSelectBtn",images.img("ui/backbtn.png"),0,(renderer.height/2)-(64*renderer.scale),{x:0,y:0},{x:0,y:72},220,72)
        );
    },
    
    uiOptions: function(){
        this.ui = [];
        this.ui.push(
            new Selector(this.cam.pos,"PlayerSkins",0,0,256,playerSkins),
            new UiImg(this.cam.pos,images.img("playerSkins/"+options.playerSkin+".png"),0,0,{x:0,y:0},128,128),
            new ButtonImg(this.cam.pos,"BackBtn",images.img("ui/backbtn.png"),0,(renderer.height/2)-(64*renderer.scale),{x:0,y:0},{x:0,y:72},220,72)
        );
    },
    
    clear: function(){
        ctx.save();
        ctx.fillStyle = this.bg;
        ctx.fillRect(this.cam.pos.x-(renderer.width/2), this.cam.pos.y-(renderer.height/2), renderer.width, renderer.height);
        ctx.restore();
    },
    
    update: function(){
        if( !this.paused && time.delta < 2 ){
            this.paused = true;
        }
        if( this.paused && time.delta > 2 ){
            this.paused = false;
        }
        
        if(this.ui[0].id == "PlayerSkins" ){
            options.playerSkin = this.ui[0].array[this.ui[0].current];
            this.ui[1].img = images.img("playerSkins/"+options.playerSkin+".png");
        }
        if(this.ui[0].id == "World" ){
            this.worldSelectNum = this.ui[0].current+1;
            this.ui[1].img = images.img("ui/world0"+ this.worldSelectNum +".png");
        }
        if(this.ui[0].id == "Level" ){
            this.levelSelectNum = this.ui[0].current+1;
            this.ui[1].img = images.img("ui/level0"+ this.levelSelectNum +"btn.png");
        }
        
        if(!this.paused){
            this.world.update(10,10);
            this.world.world.SetGravity( new Vec2(accelerometer.y*9.801,9.801) );
            
            this.objects = this.objects.filter(function(obj){return obj.active;});
            this.objects.forEach(function(obj){obj.update();});
            
            this.cam.update();
            
            this.cloudSystem.update(this.cam.pos);
        }

        this.ui = this.ui.filter(function(ui){return ui.active;});
        for(var i = 0; i < this.ui.length; i++){
            var ui = this.ui[i];
            
            if(ui.pressed){
                if(ui.id == "StartBtn"){
                    this.uiWorldSelect();
                }
                if(ui.id == "WorldBtn"){
                    this.uiLevelSelect();
                }
                if(ui.id == "LevelBtn"){
                    this.startLevel();
                }
                if(ui.id == "OptionsBtn"){
                    this.uiOptions();
                }
                if(ui.id == "BackWorldSelectBtn"){
                    this.uiWorldSelect();
                }
                if(ui.id == "BackBtn"){
                    this.uiMainMenu();
                }
            }
            
            ui.update(this.cam.pos);
        }
    },

    draw: function(){
        this.cloudSystem.draw();
        this.objects.forEach(function(obj){obj.draw();});
        this.world.draw();
        //this.world.world.DrawDebugData();
        this.ui.forEach(function(ui){ui.draw();});
    }
});