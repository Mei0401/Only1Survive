
class Amunition {
	constructor(stage, type, velocity, position, range, damage) {
		this.stage = stage;
		this.type = type;
		this.velocity = velocity;
		this.position = position;
		this.range = range;
		this.damage = damage;
		this.intPosition();
		this.cam_x = this.x;
        this.cam_y = this.y;

	}

	getDamage(){
		return this.damage;
	}

	toString() {
		return this.type;
	}

	disappear(){
		this.range = 0;
	}

	step() {

		this.x = this.x + this.velocity.x * 10;
		this.y = this.y + this.velocity.y * 10;
		this.range -= 1;
		if (this.range <= 0){
			this.stage.removeActor(this);
		}
		
	}

	intPosition() {
		this.x = Math.round(this.position.x);
		this.y = Math.round(this.position.y);
	}


	draw(context, xView, yView) {

		this.cam_x = this.x - xView;
		this.cam_y = this.y - yView;

		var image = new Image();
		image.src = "icons/" + this.type + ".png";
		context.drawImage(image, this.cam_x, this.cam_y);
	}

	getRange() {
		return this.range;
	}

}