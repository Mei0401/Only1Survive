function randint(n) { return Math.round(Math.random() * n); }
function rand(n) { return Math.random() * n; }

class Stage {
	constructor(canvas) {
		this.canvas = canvas;

		// ===============================================
		// setup an object that represents the room
		this.room = {
			width: 3000,
			height: 3000,
			map: new Map(3000, 3000)
		};
		// generate a large image texture for the room
		this.room.map.generate();

		// ==================================================

		this.actors = []; // all actors on this stage (monsters, player, boxes, ...)
		this.player = null; // a special actor, the player

		// the logical width and height of the stage
		this.width = canvas.width;
		this.height = canvas.height;




		//Add player
		var x = Math.floor(this.room.width / 2);
		var y = Math.floor(this.room.height / 2);
		var midPosition = new Pair(x, y);
		var p1 = new Player(this, midPosition);
		this.addPlayer(p1);

		// setup the magic camera !!!
		this.camera = new Camera(x - 400, y - 400, this.width, this.height, this.room.width, this.room.height);
		this.camera.follow(p1, 400, 400);
		this.camera.step();

		//Add sidebar
		var sidebar = new SideBar(this, new Pair(700, 600));
		this.addActor(sidebar);

		this.AI = 0;
		for (var i = 0; i < 5; i++) {
			//Add item
			var smallGunObject = new MapObject(this, new Pair(Math.floor(rand(3000)), Math.floor(rand(3000))), "shortgunObject")
			var longGunObject = new MapObject(this, new Pair(Math.floor(rand(3000)), Math.floor(rand(3000))), "longgunObject")
			var bagObject = new MapObject(this, new Pair(Math.floor(rand(3000)), Math.floor(rand(3000))), "bagObject")
			var smallBulletObject = new MapObject(this, new Pair(Math.floor(rand(3000)), Math.floor(rand(3000))), "smallBulletObject")
			var bigBulletObject = new MapObject(this, new Pair(Math.floor(rand(3000)), Math.floor(rand(3000))), "bigBulletObject")
			this.addActor(smallGunObject);
			this.addActor(longGunObject);
			this.addActor(bagObject);
			this.addActor(smallBulletObject);
			this.addActor(bigBulletObject);
			//Add ai
			var npc = new Monster(this, new Pair(Math.floor(rand(3000)), Math.floor(rand(3000))));
			this.addActor(npc);
			this.AI += 1;
		}

		// add stong
		for (var i = 0; i < 2; i++) {
			var stone = new StoneObject(this, new Pair(Math.floor(rand(1300)), Math.floor(rand(1300))), "smallStone");
			this.addActor(stone);
			var stone = new StoneObject(this, new Pair(Math.floor(rand(1300) + 1500), Math.floor(rand(1300))), "smallStone");
			this.addActor(stone);
			var stone = new StoneObject(this, new Pair(Math.floor(rand(1300)), Math.floor(rand(1300) + 1500)), "smallStone");
			this.addActor(stone);
			var stone = new StoneObject(this, new Pair(Math.floor(rand(1300) + 1500), Math.floor(rand(1300) + 1500)), "smallStone");
			this.addActor(stone);
		}
		for (var i = 0; i < 2; i++) {
			var stone = new StoneObject(this, new Pair(Math.floor(rand(1300)), Math.floor(rand(1300))), "bigStone");
			this.addActor(stone);
			var stone = new StoneObject(this, new Pair(Math.floor(rand(1300) + 1500), Math.floor(rand(1300))), "bigStone");
			this.addActor(stone);
			var stone = new StoneObject(this, new Pair(Math.floor(rand(1300)), Math.floor(rand(1300) + 1500)), "bigStone");
			this.addActor(stone);
			var stone = new StoneObject(this, new Pair(Math.floor(rand(1300) + 1500), Math.floor(rand(1300) + 1500)), "bigStone");
			this.addActor(stone);
		}

	}
	

	addPlayer(player) {
		this.addActor(player);
		this.player = player;
	}

	removePlayer() {
		this.removeActor(this.player);
		this.player = null;
	}

	addActor(actor) {
		this.actors.push(actor);
	}

	removeActor(actor) {
		var index = this.actors.indexOf(actor);
		if (index != -1) {
			this.actors.splice(index, 1);
		}
	}

	// Take one step in the animation of the game.  Do this by asking each of the actors to take a single step. 
	// NOTE: Careful if an actor died, this may break!
	step() {
		for (var i = 0; i < this.actors.length; i++) {
			this.actors[i].step();
			var currentActor = this.actors[i];
			if ((currentActor && currentActor.constructor.name == "Amunition") && currentActor.getRange() == 0) {
				this.removeActor(currentActor);
			}
		}
		this.camera.step();
	}

	draw() {
		var context = this.canvas.getContext('2d');
		context.clearRect(0, 0, this.width, this.height);
		this.room.map.draw(context, this.camera.xView, this.camera.yView);

		context.font = "20pt Calibri";
		context.fillStyle = 'red';
		context.fillText('rest enemy: ' + this.AI, 10, 30);

		for (var i = 0; i < this.actors.length; i++) {
			if (this.actors[i].constructor.name != "Player") {
				this.actors[i].draw(context, this.camera.xView, this.camera.yView);
			}

		}
		this.player.draw(context, this.camera.xView, this.camera.yView);
	}

	// return the first actor at coordinates (x,y) return null if there is no such actor
	getActor(x, y) {
		for (var i = 0; i < this.actors.length; i++) {
			if (this.actors[i].x == x && this.actors[i].y == y) {
				return this.actors[i];
			}
		}
		return null;
	}
} // End Class Stage

class Pair {
	constructor(x, y) {
		this.x = x; this.y = y;
	}

	toString() {
		return "(" + this.x + "," + this.y + ")";
	}

	normalize() {
		var magnitude = Math.sqrt(this.x * this.x + this.y + this.y);
		this.x = this.x / magnitude;
		this.y = this.y / magnitude;
	}
}




