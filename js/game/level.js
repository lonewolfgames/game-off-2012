var Level = Class.extend({
    init: function(worldNum,levelNum){
        this.worldNum = worldNum;
        this.levelNum = levelNum;
        this.worldData = Worlds[this.worldNum];
        this.bg = this.worldData.bg;
        this.levelData = this.worldData.Levels[this.levelNum];
        this.cam = new Camera();
        this.cam.setSlowFollow(6);
        this.cam.setOffset(new Vec2(0,-64*renderer.scale));
        this.paused = false;
        this.world = new World(100*renderer.scale, new b2Vec2(0,9.801), true);
        this.world.drawHelper(0.5);
        this.cloudSystem = new CloudSystem(this.cam.pos,5,5,this.levelData.imgLoc);
        
        this.gameover = false;
        this.finished = false;
        this.finishedTime = 0;
        this.timer = 0;
        this.pausedTime = 0;
        this.deltaPauseTime = 0;
        
        this.objects = [];
        this.ui = [];
        
        this.uiUnpause();
        
        for(var i=0; i<this.levelData.objects.length; i++){
            var obj = this.levelData.objects[i];
            if(obj.img.length) obj.img = images.img( obj.img );
        }
        
        this.world.addBodies(this.levelData.objects);
        this.world.addBodies([{name: "Player", img: images.img("playerSkins/"+options.playerSkin+".png"), x: this.levelData.player.x, y: this.levelData.player.y, angle: 0, radius: 32, d: 1.0, f: 1.0, r: 0.25, type: "dynamic"}]);
    },
    
    quit: function(){
        renderer.reset(this.cam.pos);
        game = new MainMenu(this.worldNum);
    },
    
    next: function(){
        renderer.reset(this.cam.pos);
        
        if( Worlds[this.worldNum].Levels[this.levelNum+1] ){
            game = new Level(this.worldNum,this.levelNum+1);
        }
        else if( Worlds[this.worldNum+1] ){
            game = new Level(this.worldNum+1,0);
        }
        else{
            game = new Intro(
                "#000",
                new MainMenu(this.worldNum),
                [
                    new IntroPage("","A Nathan Faucett Original Game","Arial","#fff"),
                    new IntroPage(images.img("lonewolf-white.png"),"LoneWolf Games™","Arial","#fff")
                ]
            );
        }
    },
    
    restart: function(){
        renderer.reset(this.cam.pos);
        game = new Level(this.worldNum,this.levelNum);
    },
    
    uiFinished: function(){
        if(this.finishedTime == 0){
            this.finishedTime = parseFloat(Math.round(this.timer/10)/100).toFixed(2).toString();
        }
        this.ui = [];
        this.ui.push(
            new ButtonImg(this.cam.pos,"NextBtn",images.img("ui/nextbtn.png"),0,(-120*renderer.scale),{x:0,y:0},{x:0,y:69},212,69),
            new ButtonImg(this.cam.pos,"RestartBtn",images.img("ui/restartbtn.png"),0,0,{x:0,y:0},{x:0,y:74},340,74),
            new ButtonImg(this.cam.pos,"QuitBtn",images.img("ui/quitbtn.png"),0,(120*renderer.scale),{x:0,y:0},{x:0,y:83},194,83),
            new Text(this.cam.pos,"FinishedTime",80,"Sans Bold",0,-renderer.height/2+(renderer.scale*40),this.finishedTime,"#888")
        );
        
        this.finished = true;
        this.paused = true;
    },
    
    uiGameOver: function(){
        this.ui = [];
        this.ui.push(
            new ButtonImg(this.cam.pos,"RestartBtn",images.img("ui/restartbtn.png"),0,0,{x:0,y:0},{x:0,y:74},340,74),
            new ButtonImg(this.cam.pos,"QuitBtn",images.img("ui/quitbtn.png"),0,(120*renderer.scale),{x:0,y:0},{x:0,y:83},194,83)
        );
        
        this.gameover = true;
        this.paused = true;
    },
    
    uiPause: function(){
        this.pausedTime = time.time;
        this.ui = [];
        this.ui.push(
            new ButtonImg(this.cam.pos,"ResumeBtn",images.img("ui/resumebtn.png"),0,0,{x:0,y:0},{x:0,y:74},363,74),
            new ButtonImg(this.cam.pos,"RestartBtn",images.img("ui/restartbtn.png"),0,(120*renderer.scale),{x:0,y:0},{x:0,y:74},340,74),
            new ButtonImg(this.cam.pos,"QuitBtn",images.img("ui/quitbtn.png"),0,(240*renderer.scale),{x:0,y:0},{x:0,y:83},194,83),
            new UiImg(this.cam.pos,images.img("ui/paused.png"),0,-(renderer.height/2)+(64*renderer.scale),{x:0,y:0},256,128)
        );
        
        this.paused = true;
        key.esc = false; key.p = false;
    },
    
    uiUnpause: function(){
        this.ui = [];
        this.ui.push(
            new ButtonImg(this.cam.pos,"PauseBtn",images.img("ui/pausebtn.png"),renderer.width/2-(renderer.scale*48), -renderer.height/2+(renderer.scale*48),{x:0,y:0},{x:96,y:0},96,96),
            new Text(this.cam.pos,"Timer",80,"Sans Bold",0,-renderer.height/2+(renderer.scale*40),"0","#888")
        );
        
        this.paused = false;
        key.esc = false; key.p = false;
        this.deltaPauseTime += (time.time) - this.pausedTime;
    },
    
    clear: function(){
        ctx.save();
        ctx.fillStyle = this.bg;
        ctx.fillRect(this.cam.pos.x-(renderer.width/2), this.cam.pos.y-(renderer.height/2), renderer.width, renderer.height);
        ctx.restore();
    },
    
    update: function(){
        this.timer = time.time - this.deltaPauseTime;
        
        if( !this.paused && (key.esc || key.p || time.delta < 1) && !this.gameover && !this.finished ){
            this.uiPause();
        }
        if( this.paused && (key.esc || key.p) && !this.gameover && !this.finished ){
            this.uiUnpause();
        }
        
        if(!this.paused){
            
            this.world.update(10,10);
            
            this.objects = this.objects.filter(function(obj){return obj.active;});
            this.objects.forEach(function(obj){obj.update();});
            
            var player = this.world.getBodyByName("Player");
            this.cam.newpos = new Vec2(
                player.GetPosition().x*this.world.scale, player.GetPosition().y*this.world.scale
            ).round();
            
            this.world.listener.BeginContact = function(contact){
                var a = contact.GetFixtureA().GetBody();
                var b = contact.GetFixtureB().GetBody();
                
                if( a.GetUserData().name == "DeathZone" && b.GetUserData().name == "Player" ||
                    b.GetUserData().name == "DeathZone" && a.GetUserData().name == "Player"
                ){
                    game.uiGameOver();
                }
                
                if( a.GetUserData().name == "Goal" && b.GetUserData().name == "Player" ||
                    b.GetUserData().name == "Goal" && a.GetUserData().name == "Player"
                ){
                    game.uiFinished();
                }
                if( a.GetUserData().name == "Goal" && b.GetUserData().name == "Player"){
                    game.uiFinished();
                }
                
                if( a.GetUserData().name == "DeathZone" && b.GetUserData().name != "Player"){
                    game.world.remove(b.GetUserData().id);
                }
                else if( b.GetUserData().name == "DeathZone" && a.GetUserData().name != "Player"){
                    game.world.remove(a.GetUserData().id);
                }
            }
            
            this.cam.update();
            
            this.cloudSystem.update(this.cam.pos);
        }

        this.ui = this.ui.filter(function(ui){return ui.active;});
        for(var i = 0; i < this.ui.length; i++){
            var ui = this.ui[i];
            
            if(ui.id == "Timer"){
                this.timer = parseFloat(Math.round(this.timer/10)/100).toFixed(2);
                this.timer = this.timer.toString();
                
                ui.text = this.timer;
            }
            
            if(ui.pressed){
                if(ui.id == "PauseBtn"){
                    this.uiPause();
                }
                if(ui.id == "ResumeBtn"){
                    this.uiUnpause();
                }
                if(ui.id == "RestartBtn"){
                    this.restart();
                }
                if(ui.id == "NextBtn"){
                    this.next();
                }
                if(ui.id == "QuitBtn"){
                    this.quit();
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