var renderer, time, game, images,
    playerSkins = ["Baby", "Jack", "Prof"];
    options = {playerSkin: "Baby"};
    
function init(){
    images = new Images("images",
        [
            "lonewolf-white.png",
            "lonewolf-black.png",
            "WoodBarrel.png",
            "WoodBox.png",
            "goal.png",
            "playerSkins/Baby.png",
            "playerSkins/Jack.png",
            "playerSkins/Prof.png",
            "ui/backbtn.png",
            "ui/leftArrow.png",
            "ui/level01btn.png",
            "ui/level02btn.png",
            "ui/level03btn.png",
            "ui/level04btn.png",
            "ui/nextbtn.png",
            "ui/optionsbtn.png",
            "ui/pausebtn.png",
            "ui/paused.png",
            "ui/quitbtn.png",
            "ui/restartbtn.png",
            "ui/resumebtn.png",
            "ui/rightArrow.png",
            "ui/startbtn.png",
            "ui/world01.png",
            "ui/world02.png",
            "worlds/world01/cloud01.png",
            "worlds/world01/cloud02.png",
            "worlds/world01/cloud03.png",
            "worlds/world01/ground.png",
            "worlds/world01/dust.png",
            "worlds/world02/cloud01.png",
            "worlds/world02/cloud02.png",
            "worlds/world02/cloud03.png",
            "worlds/world02/ground.png",
            "worlds/world02/dust.png",
        ]
    );
    
    renderer = new Renderer("#fff", 5/4, 16/9, 640, 960);
    time = new Time();
    game = new Intro(
        "#000",
        new MainMenu(0),
        [
            new IntroPage("","A Nathan Faucett Original Game","Arial","#fff"),
            new IntroPage(images.img("lonewolf-white.png"),"LoneWolf Games","Arial","#fff")
        ]
    );
    
    animate();
}

function clear(){
    game.clear();
}

function animate(){
    input();
    clear();
    update();
    draw();
    window.requestAnimFrame(animate);
    time.update();
}

function update(){
    game.update();
}

function draw(){
    //time.draw();
    game.draw();
}