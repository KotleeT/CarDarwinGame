//DO ZROBIENIA
//UPŁYNNIĆ JAZDĘ
var koniec = false;

function updateCar(){
	
    if (cursors.down.isDown){
			wheel_front.body.rotateLeft(750);
			wheel_back.body.rotateLeft(750);
    } 
    if (cursors.up.isDown){
			wheel_front.body.rotateRight(750);
			wheel_back.body.rotateRight(750);
			timer.start();
    }
	if (spacebar.space.isDown){
		wheel_front.body.setZeroRotation();
		wheel_back.body.setZeroRotation();
		}
	if (cursors.left.isDown){
		carBody.body.rotateLeft(40);
	}
		if (cursors.right.isDown){
		carBody.body.rotateRight(40);
	}
	if(wheel_front.position.x >= 29500){
		console.log('KONIEC');
		koniec = true;
	}
	if(koniec){
		game.paused = true;
		overMenu.visible = true;
		
	}
}