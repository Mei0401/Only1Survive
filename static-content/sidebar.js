class SideBar{
	constructor(stage, position){
		this.stage = stage;
		this.position = position;
		this.intPosition();
	}

	toString(){
		return "sidebar";
	}


	intPosition() {
    this.x = Math.round(this.position.x);
    this.y = Math.round(this.position.y);
    }

	draw(context){
		//bullet part

		var imageSmallbullet = new Image();
		imageSmallbullet.src = "icons/" + "smallBullet.png";
		context.drawImage(imageSmallbullet, this.x - 10, this.y - 300);
		context.fillText(this.stage.player.smallBullet, this.x + 30, this.y - 275);

		var imageBigbullet = new Image();
		imageBigbullet.src = "icons/" + "bigBullet.png";
		context.drawImage(imageBigbullet, this.x - 10, this.y - 250);
		context.fillText(this.stage.player.bigBullet, this.x + 30, this.y - 225);

		//bag part
		if (this.stage.player.bag != null){
			var imageBag = new Image();
			imageBag.src = "icons/" + "bagObject.png";
			context.drawImage(imageBag, this.x - 10, this.y - 150, 64, 64);
		}

		//weapon part
		context.font = "20pt Calibri";
		context.fillStyle = 'red';
		context.fillText('1', this.x, this.y);
		if (this.stage.player.hand != null){
			var imageFist = new Image();
			imageFist.src = "icons/" + "fist.png";
			context.drawImage(imageFist, this.x + 40, this.y - 25);
		}

		context.fillText('2', this.x, this.y + 50);
		if (this.stage.player.shortgun != null){
			var imageShortgun = new Image();
			imageShortgun.src = "icons/" + "shortgunObject.png";
			context.drawImage(imageShortgun, this.x + 40, this.y + 25 , 32, 32);
		}
		context.fillText('3', this.x, this.y + 100);
		if (this.stage.player.longgun != null){
			var imageLonggun = new Image();
			imageLonggun.src = "icons/" + "longgunObject.png";
			context.drawImage(imageLonggun, this.x + 40, this.y + 75 , 32, 32);
		}

		context.fillText('4', this.x, this.y + 150);
		var imageSmallStone = new Image();
		imageSmallStone.src = "icons/" + "smallStone.png";
		context.drawImage(imageSmallStone, this.x + 40, this.y + 125 , 32, 32);

		context.fillText('5', this.x, this.y + 200);
		var imageBigStone = new Image();
		imageBigStone.src = "icons/" + "bigStone.png";
		context.drawImage(imageBigStone, this.x + 40, this.y + 175 , 32, 32);
		
		//heath part
		context.fillRect(this.x - 600, this.y + 130, this.stage.player.health * 4, 30);


		// context.restore();
	}

	step(){
		
	}
}