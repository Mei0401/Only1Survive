class MapObject{
	constructor(stage, position, type){
		this.stage = stage;
		this.position = position;
		this.type = type;
		this.intPosition();
		this.cam_x = this.x;
        this.cam_y = this.y;
	}

	toString(){
		return this.type;
	}


	intPosition() {
    this.x = Math.round(this.position.x);
    this.y = Math.round(this.position.y);
    }

	draw(context, xView, yView){
		this.cam_x = this.x - xView;
		this.cam_y = this.y - yView;

		var image = new Image();
		image.src = "icons/" + this.type + ".png";
		context.drawImage(image, this.cam_x, this.cam_y);
	}

	step(){

	}
}