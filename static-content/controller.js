stage = null;
view = null;
interval = null;
function setupGame() {
	stage = new Stage(document.getElementById('stage'));

	// https://javascript.info/keyboard-events
	document.addEventListener('keydown', moveByKey);
	document.addEventListener('click', fireByMouse);
	document.addEventListener('mousemove', moveByMouse);
	document.addEventListener('keydown', changeWeaponByKey);
	document.addEventListener('keydown', dropWeaponByKey);
	document.addEventListener('keydown', buildStone);

}
function startGame() {
	interval = setInterval(function () { stage.step(); stage.draw(); }, 50);
}
function pauseGame() {
	clearInterval(interval);
	interval = null;
}
function changeWeaponByKey(event){
	var key = event.key;
	if (key == '1'){
		stage.player.changeWeapon(stage.player.hand);
	} else if (key == '3' && stage.player.longgun != null){
		stage.player.changeWeapon(stage.player.longgun);
	} else if (key == '2' && stage.player.shortgun != null){
		stage.player.changeWeapon(stage.player.shortgun);
	}

}
function dropWeaponByKey(event){
	var key = event.key;
	var currentWeapon = stage.player.weapon;
	// console.log(currentWeapon);
	if (key == 'r'){
		stage.player.changeWeapon(stage.player.hand);
		if (currentWeapon.toString() == "shortgun"){
			stage.player.dropWeapon("shortgun");
			var smallGunObject = new MapObject(stage, new Pair(stage.player.x + 70, stage.player.y - 30), "shortgunObject")
			stage.addActor(smallGunObject);
			// console.log(stage.player.shortgun);
		}
		if (currentWeapon.toString() == "longgun"){
			stage.player.dropWeapon(stage.player.longgun);
			var bigGunObject = new MapObject(stage, new Pair(stage.player.x + 70, stage.player.y - 30), "longgunObject")
			stage.addActor(bigGunObject);
		}
	}

}

function buildStone(event){
	var key = event.key;
	if (key == '4'){
		var smallStone = new StoneObject(stage, new Pair(stage.player.x + 70, stage.player.y - 50), "smallStone");
		stage.addActor(smallStone);
	}
	if (key == '5'){
		var bigStone = new StoneObject(stage, new Pair(stage.player.x + 70, stage.player.y - 70), "bigStone");
		stage.addActor(bigStone);
	}
}



function moveByKey(event) {
	var key = event.key;
	var moveMap = {
		'a': { "dx": -1, "dy": 0 },
		's': { "dx": 0, "dy": 1 },
		'd': { "dx": 1, "dy": 0 },
		'w': { "dx": 0, "dy": -1 },
		'q': { "dx": -1, "dy": -1 },
		'e': { "dx": 1, "dy": -1 },
		'z': { "dx": -1, "dy": 1 },
		'x': { "dx": 1, "dy": 1 }
	};
	if (key in moveMap) {
		stage.player.move(moveMap[key].dx, moveMap[key].dy);
	}
}

function fireByMouse(event) {
	var randomNum = randint(100);
	stage.player.fire(randomNum);
}

function moveByMouse(event) {
	var bounds = $('#stage').offset();
	mouseX = event.pageX - bounds.left;
	mouseY = event.pageY - bounds.top;
	if (mouseX > 0 && mouseX < 800 && mouseY > 0 && mouseY < 800) {
		stage.player.rotate(mouseX, mouseY);
	}
}