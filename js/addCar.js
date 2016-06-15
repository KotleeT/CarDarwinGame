function addCar(){

	var scale,
		bodyMass,
		kolaSize,
		kolaMass,
		carDl,
		car_tw_front,
		car_tw_back,
		carDump,
		carPrism1Front,
		carPrism2Front,
		carPrism1Back,
		carPrism2Back,
		carUpLimit,
		carLowLimit,
		car_physics,
		car_physics_png;
	
	//AUDI - parametry żeby to jakoś wyglądało
	var audi_scale = 0.45,
		audi_mass = 2,
		audi_kola = 18,
		audi_kola_mass = 10,
		audi_dl = 100,
		audi_tw_front = 70,
		audi_tw_back = 120,
		audi_dump = 65,
		audi_prism1_front = 77,
		audi_prism2_front = 15,
		audi_prism1_back = -82,
		audi_prism2_back = 15,		
		audi_upperLimit = -0.5,
		audi_lowerLimit = -1,
		audi_physics = 'audi_physic',
		audi_physics_png = 'audi_bez_kol_scaled';
		
	var golf_scale = 0.35,
		golf_mass = 2,
		golf_kola = 20,
		golf_kola_mass = 10,
		golf_dl = 90,
		golf_tw_front = 220,
		golf_tw_back = 400,
		golf_dump = 50,
		golf_prism1_front = 72,
		golf_prism2_front = 15,
		golf_prism1_back = -79,
		golf_prism2_back = 15,		
		golf_upperLimit = -0.9,
		golf_lowerLimit = -1.5,
		golf_physics = 'golf_physic',
		golf_physics_png = 'golf_bez_kol_scaled';		
		
		

	if(sprite == 'audi_kar_scaled'){
		scale = audi_scale;
		bodyMass = audi_mass;
		kolaSize = audi_kola;
		kolaMass = audi_kola_mass;
		carDl = audi_dl;
		car_tw_front = audi_tw_front;
		car_tw_back = audi_tw_back;
		carDump = audi_dump;
		carPrism1Front = audi_prism1_front;
		carPrism2Front = audi_prism2_front;
		carPrism1Back = audi_prism1_back;
		carPrism2Back = audi_prism2_back;
		carUpLimit = audi_upperLimit;
		carLowLimit = audi_lowerLimit;
		car_physics = audi_physics;
		car_physics_png = audi_physics_png;
	}
	else{
		scale = golf_scale;
		bodyMass = golf_mass;
		kolaSize = golf_kola;
		kolaMass = golf_kola_mass;
		carDl = golf_dl;
		car_tw_front = golf_tw_front;
		car_tw_back = golf_tw_back;
		carDump = golf_dump;
		carPrism1Front = golf_prism1_front;
		carPrism2Front = golf_prism2_front;
		carPrism1Back = golf_prism1_back;
		carPrism2Back = golf_prism2_back;
		carUpLimit = golf_upperLimit;
		carLowLimit = golf_lowerLimit;
		car_physics = golf_physics;
		car_physics_png = golf_physics_png;
	}


		
		

    
    //carBody.scale.setTo(0.3,0.3);	
	wheel_front = game.add.sprite(280, h-70,kolo); //Przednie ko³o
	wheel_front.scale.setTo(scale, scale);
    wheel_back = game.add.sprite(120, h-70,kolo); //Tylne ko³o
	wheel_back.scale.setTo(scale, scale);
	carBody = game.add.sprite(200, h-100, sprite); //Samochód
    CG_car = game.physics.p2.createCollisionGroup(); //Grupa kolizyjna - scalenie auta
    
    game.physics.p2.updateBoundsCollisionGroup(); //Update grupy
    
    game.physics.p2.enable([wheel_front,wheel_back,carBody]);


    
        wheel_front.body.setCircle(kolaSize);
        wheel_front.body.debug = debug_test;
        wheel_front.body.mass = kolaMass;
        wheel_front.body.setCollisionGroup(CG_car);
		wheel_front.body.collideWorldBounds = true;
		wheel_front.friction = 0;
		wheel_front.body.fixedRotation = false;
    
        wheel_back.body.setCircle(kolaSize);
        wheel_back.body.debug = debug_test;
        wheel_back.body.mass = kolaMass;
        wheel_back.body.setCollisionGroup(CG_car);
		wheel_back.body.collideWorldBounds = true;
		wheel_back.friction = 0;
		wheel_front.body.fixedRotation = false;
		//carBody.body.setRectangle(210,55);
        carBody.body.clearShapes();
        carBody.body.loadPolygon(car_physics, car_physics_png);

        carBody.body.debug = debug_test;
        carBody.body.mass = bodyMass;
		carBody.body.friction = 1;
        carBody.body.setCollisionGroup(CG_car);
		
		game.camera.follow(carBody);
    
	//Spring(world, bodyA, bodyB, długość, twardość, damping, ?, ?, localA, localB)
    var spring = game.physics.p2.createSpring(carBody,wheel_front, carDl, car_tw_front, carDump,null,null,[0,1],null);
    var spring_1 = game.physics.p2.createSpring(carBody,wheel_back, carDl, car_tw_back, carDump+20,null,null,[0,0],null);
    //Wzajemne odpychanie - coś jak magnesy - w kwadratowych nawiasach można zmieniać położenie kół
	//PRZÓD
    var constraint = game.physics.p2.createPrismaticConstraint(carBody,wheel_front, false,[carPrism1Front,carPrism2Front],[0,0],[0,1]);
        constraint.lowerLimitEnabled=constraint.upperLimitEnabled = true;
        constraint.upperLimit = carUpLimit;
        constraint.lowerLimit = carLowLimit;
	//TY£
    var constraint_1 = game.physics.p2.createPrismaticConstraint(carBody,wheel_back, false,[carPrism1Back,carPrism2Back],[0,0],[0,1]);
        constraint_1.lowerLimitEnabled=constraint_1.upperLimitEnabled = true;
        constraint_1.upperLimit = carUpLimit;	
        constraint_1.lowerLimit = carLowLimit;

}