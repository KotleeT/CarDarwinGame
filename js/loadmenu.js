function loadmenu(){
	

	document.getElementById('golf').onclick = function(){
		sprite = 'golf_kar_scaled';
		kolo = 'golf_kolo';

		init();
		document.getElementById('menu').style.display = 'none';
		document.getElementById('contener').style.display = 'block';
		move();
	}
	document.getElementById('audi').onclick = function(){
		sprite = 'audi_kar_scaled';
		kolo = 'audi_kolo';
		init();
		document.getElementById('menu').style.display = 'none';
		document.getElementById('contener').style.display = 'block';
		move();
	}
}