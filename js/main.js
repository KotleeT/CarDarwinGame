
var game;
var w;
var h;
var CG_car;
var CG_mines;
var cursors;
var spacebar;
var sprite;
var kolo;
var timer;
var platforms;
var mines;
var debug_test = false;
var sec = 30;
var min = 1;
var timesec = false;
var overMenu;
var HP = 0;
var wid = 0;
//MOC - Nie wiem jak zrobić płynne rozpędzanie i hamowanie

//PAMIĘTAJ - MOŻESZ ZMIENIAĆ POŁOŻENIE LAYERA!

function init(){
    if(window.innerHeight > 600)
        h = 600;
    else
        h = window.innerHeight - 20;

	w = window.window.innerWidth;
	
	game = new Phaser.Game(w, h, Phaser.CANVAS, 'gra', { preload: preload, create: create, update: update, render: render });	
}

function preload(){
    

    //AUTA
    game.load.image('audi_kar_scaled', 'assets/auta/audi_bez_kol_scaled.png');
    game.load.image('golf_kar_scaled', 'assets/auta/golf_bez_kol_scaled.png');
    game.load.image('audi_kolo', 'assets/auta/audi_kolo.png');
	game.load.image('golf_kolo','assets/auta/golf_kolo.png');
    game.load.physics('audi_physic', 'json/audi_physic.json');
    game.load.physics('golf_physic', 'json/golf_physic.json');
	
	game.load.tilemap('map', 'json/mapphysic2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.physics('map_physics', 'json/mapphysic.json');
    game.load.image('tileset', 'assets/map1.png',32,32);

    game.load.spritesheet('button', 'assets/button.png', 188, 70);
    game.load.image('menu1', 'assets/menu1.png', 189, 66);
    game.load.image('menu2', 'assets/menu2.png', 189, 66);
    game.load.image('menu3', 'assets/menu3.png', 189, 66);

    game.load.image('hppoints', 'assets/hp.png', 100, 50);
    
	
	game.load.image('ground', 'assets/ground.png', 100, 100);

    game.load.image('mina', 'assets/mina.png', 100, 75);

    game.time.advancedTiming = true;
}	


function create(){
	var map;
	var layer;

	timer = game.time.create(false);
	timer.loop(1000, updateCounter, this);

	game.world.setBounds(0, 0, 30000, 937);  //PATRZEĆ NA TO, BO ROBI TROLLE Z JSONEM
    game.physics.startSystem(Phaser.Physics.P2JS);
    // grawitacja
    game.physics.p2.gravity.y = 350;
    // odbijanie
    game.physics.p2.restitution = 0;
   
    game.stage.backgroundColor = '#DDDDDD';

    game.physics.p2.friction= 2;
    //KURSORY
    cursors = game.input.keyboard.createCursorKeys();
	spacebar = game.input.keyboard.addKeys({'space': Phaser.Keyboard.SPACEBAR});

	map = game.add.tilemap('map');
    map.addTilesetImage('map1', 'tileset');
    //CAŁA POWIERZCHNIA TERENU
    layer = map.createLayer(0);
    CG_level = game.physics.p2.createCollisionGroup();
    CG_mines = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    groundGroup = game.add.group();
    layer = groundGroup.create(0,0);
    game.physics.p2.enable(layer, debug_test);
    layer.body.clearShapes();
    layer.body.loadPolygon('map_physics', 'map1');
    layer.body.mass = 1;
    layer.body.static = true;
    layer.body.setCollisionGroup(CG_level);
    layer.body.fixedRotation = true;
    layer.body.data.gravityScale = 0;
	
	addCar();

    platforms = game.add.group();
    platforms.enableBody = true;
    platforms.physicsBodyType = Phaser.Physics.P2JS;

    mines = game.add.group();
    mines.enableBody = true;
    mines.physicsBodyType = Phaser.Physics.P2JS;
	
    var ground = platforms.create(4500, 760, 'ground');
    ground.body.setRectangle(200,20);
	ground.scale.setTo(2.5,0.2);
    ground.body.static = true;
    ground.body.debug = debug_test;
    ground.body.setCollisionGroup(CG_level);
    ground.body.collides(CG_car);

    var ground2 = platforms.create(8800, 755, 'ground');
    ground2.body.setRectangle(200,20);
	ground2.scale.setTo(2,0.2);
    ground2.body.static = true;
    ground2.body.debug = debug_test;
    ground2.body.setCollisionGroup(CG_level);
    ground2.body.collides(CG_car);

    var ground3 = platforms.create(13100, 740, 'ground');
    ground3.body.setRectangle(1500,40);
	ground3.scale.setTo(15,0.4);
    ground3.body.static = true;
    ground3.body.debug = debug_test;
    ground3.body.setCollisionGroup(CG_level);
    ground3.body.collides(CG_car);
	
	var ground4 = platforms.create(3200, 750, 'ground');
    ground4.body.setRectangle(1000,20);
	ground4.scale.setTo(10,0.2);
    ground4.body.static = true;
    ground4.body.debug = debug_test;
    ground4.body.setCollisionGroup(CG_level);
    ground4.body.collides(CG_car);
	
	var ground5 = platforms.create(29000, 700, 'ground');
    ground5.body.setRectangle(2000,20);
	ground5.scale.setTo(20,0.2);
    ground5.body.static = true;
    ground5.body.debug = debug_test;
    ground5.body.setCollisionGroup(CG_level);
    ground5.body.collides(CG_car);

    var mina1 = mines.create(1560, 755, 'mina');
    mina1.scale.setTo(0.5,0.5);
    mina1.body.setRectangle(50,37.5);
    mina1.body.static = true;
    mina1.body.debug = debug_test;
    mina1.body.setCollisionGroup(CG_mines);
    mina1.body.collides(CG_car);
    mina1.body.onBeginContact.add(mina, this);

    var mina2 = mines.create(11600, 747, 'mina');
    mina2.scale.setTo(0.5,0.5);
    mina2.body.setRectangle(50,37.5);
    mina2.body.static = true;
    mina2.body.debug = debug_test;
    mina2.body.setCollisionGroup(CG_mines);
    mina2.body.collides([CG_car]);
    mina2.body.onBeginContact.add(mina, this);

    var mina3 = mines.create(13700, 723, 'mina');
    mina3.scale.setTo(0.5,0.5);
    mina3.body.setRectangle(50,37.5);
    mina3.body.static = true;
    mina3.body.debug = debug_test;
    mina3.body.setCollisionGroup(CG_mines);
    mina3.body.collides([CG_car]);
    mina3.body.onBeginContact.add(mina, this);

    var mina4 = mines.create(6620, 730, 'mina');
    mina4.scale.setTo(0.5,0.5);
    mina4.body.setRectangle(50,37.5);
    mina4.body.static = true;
    mina4.body.debug = debug_test;
    mina4.body.setCollisionGroup(CG_mines);
    mina4.body.collides([CG_car]);
    mina4.body.onBeginContact.add(mina, this);

    var mina5= mines.create(8900, 755, 'mina');
    mina5.scale.setTo(0.5,0.5);
    mina5.body.setRectangle(50,37.5);
    mina5.body.static = true;
    mina5.body.debug = debug_test;
    mina5.body.setCollisionGroup(CG_mines);
    mina5.body.collides([CG_car]);
    mina5.body.onBeginContact.add(mina, this); 

    var mina6= mines.create(23900, 705, 'mina');
    mina6.scale.setTo(0.5,0.5);
    mina6.body.setRectangle(50,37.5);
    mina6.body.static = true;
    mina6.body.debug = debug_test;
    mina6.body.setCollisionGroup(CG_mines);
    mina6.body.collides([CG_car]);
    mina6.body.onBeginContact.add(mina, this); 

    var mina7= mines.create(26100, 600, 'mina');
    mina7.scale.setTo(1,1);
    mina7.body.setRectangle(100,75);
    mina7.body.angle = -25;
    mina7.body.static = true;
    mina7.body.debug = debug_test;
    mina7.body.setCollisionGroup(CG_mines);
    mina7.body.collides([CG_car]);
    mina7.body.onBeginContact.add(mina, this); 

	
	//game.camera.x = 25900;
	//game.camera.y = 700;

    //KOLIZJA Z MAPĄ
    game.physics.p2.updateBoundsCollisionGroup();
    layer.body.collides(CG_car);
    layer.body.collideWorldBounds = false;
    layer.body.y = 15;
    layer.body.x = 15;
    wheel_front.body.collides([CG_level, CG_mines]);
    wheel_back.body.collides([CG_level, CG_mines]);
    carBody.body.collides([CG_level, CG_mines]);

    //KONTAKT MATERIAŁÓW
    var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', wheel_front.body);
        wheel_back.body.setMaterial(spriteMaterial); 
    var worldMaterial = game.physics.p2.createMaterial('worldMaterial',layer.body);

    var contactMaterial = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial);
    contactMaterial.friction = 3;
	
	
    carBody.body.onBeginContact.add(minusHP, this);

    //MENU PAUZY
    var button = game.add.button(w - 150, 15, 'button', start, this, 2, 1, 0);
    button.fixedToCamera = true;
    button.scale.setTo(0.7,0.7);

    game.input.onDown.add(unpause, this);

    var pauseMenu = game.add.group();
    pauseMenu.visible = false;
    overMenu = game.add.group();
    overMenu.visible = false;

    var powrot = game.add.button(w/2 - 94, h/2 - 140, 'menu1', unpause, this);
    powrot.fixedToCamera = true;
    pauseMenu.add(powrot);

    var auta = game.add.button(w/2 - 94, h/2 - 70, 'menu2', unpause, this);
    auta.fixedToCamera = true;
    pauseMenu.add(auta);

    var exit = game.add.button(w/2 - 94, h/2, 'menu3', unpause, this);
    exit.fixedToCamera = true;
    pauseMenu.add(exit);

    var overAuta =  game.add.button(w/2 - 180, h/2 - 70, 'menu2', unpause, this);
    overAuta.fixedToCamera = true;
    overMenu.add(overAuta);

    var overExit = game.add.button(w/2 + 20, h/2 - 70, 'menu3', unpause, this);
    overExit.fixedToCamera = true;
    overMenu.add(overExit);

    function start(){
        game.paused = true;
        pauseMenu.visible = true;
    }

    function gameover(){
        game.paused = true;
        overMenu.visible = true;
    }

    function unpause(){
        if(game.paused == true && HP < 100){
            if (powrot.getBounds().contains(this.game.input.x, this.game.input.y)) {
                game.paused = false;
                pauseMenu.visible = false;
            }
            if (auta.getBounds().contains(this.game.input.x, this.game.input.y)) {
                window.location="index.html";
            }
            if (exit.getBounds().contains(this.game.input.x, this.game.input.y)) {
                console.log('Będzie przy połączeniu z główną grą');
            }
        }

        if(game.paused == true && HP >= 100 || koniec == true){
            if (overAuta.getBounds().contains(this.game.input.x, this.game.input.y)) {
                window.location="index.html";
            }
            if (overExit.getBounds().contains(this.game.input.x, this.game.input.y)) {
                console.log('Będzie przy połączeniu z główną grą');
            }
        }


    }
    function minusHP(body, shapeA, shapeB, equation){
        if(body){
            HP += 0.5   ;
            console.log(HP);
            if(HP >= 100){
                var over = game.add.text(w/2 - 130, h/4, "GAME OVER", { font:'50px Hobo, cursive',  fill: '#E85C2F' });
                over.fixedToCamera = true;
                gameover();

            }
        }
    }
    var hplimit = game.add.image(300, 68, 'hppoints');
    hplimit.fixedToCamera = true;
    hplimit.scale.setTo(0.01,0.35);
	
	function updateCounter(){
		sec--;
		if(min == 0 && sec == 0)
		{
			console.log('BENG ' + min + ' ' + sec + ' ' + timer.duration.toFixed(0));
			HP = 100;
			timesec = true;
			timer.stop();
			minusHP();
		}
		if(sec < 0){
			min--;
			sec = 59;
	   }
    }
    function mina(body){
        console.log('BOOOOOOOOOM');
        HP+=10;
        if(HP >= 100){
            minusHP(body);
        }
    }   


}
	

function update(){
    updateCar();
}

function render(){
	var czas = game.debug.text( 'Pozostały czas: ' + min + ':' + sec + ':' + timer.duration.toFixed(0),  30, 50,'#E85C2F','30px Hobo');

    var hptxt = game.debug.text('Uszkodzenia: ', 30, 85, '#E85C2F','30px Hobo');
    var hppoints = game.add.image(200, 68, 'hppoints'); 
    hppoints.fixedToCamera = true;
    hppoints.scale.setTo(HP*0.01,0.35);

    //game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
    //game.debug.spriteCoords(wheel_front, 32, 500);
    //game.debug.cameraInfo(game.camera, 400, 500);
	
	if(timesec){
		game.debug.text('Twój czas się skoczył, ale nie poddawaj się! Wystarczy, że nie uszkodzisz auta!', 30, 120,'#00FF1D','20px Hobo' );
	}
	if(koniec){
		game.debug.text('Gratulacje!', w/2 - 70, h/3 - 50,'#00FF1D','40px Hobo' );
		game.debug.text('Twój pozostały czas to: ' + min + ':' + sec + ':' + timer.duration.toFixed(0), w/2 - 180, h/3 - 17,'#FFFFFF','30px Hobo' );
		game.debug.text('Uszkodzenia pojazdu wynoszą: ' + HP + '%', w/2 - 165	, h/3+10,'#FFFFFF','25px Hobo' );
	}	
}

function move() {
   setInterval(frame, 10);
}

function frame () {
    if (wid <= 400){
        wid += 1;
    }
    $('#myBar').css({'width' : wid});
    if(wid === 400){
       $("#myBar").append('<div onclick="graj();" style="width: 100px, height: 40px; ">GRAJ</div>');
    }
};
function graj(){
    $('#contener').css({'display' : 'none'});
    $('#gra').css({'display' : 'block'});
}