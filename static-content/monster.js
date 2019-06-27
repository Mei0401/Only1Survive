fire = false;
addBullet = false;

class Monster {
    constructor(stage, position) {
        this.stage = stage;
        this.position = position;
        this.x = position.x;
        this.y = position.y;
        this.angle = 0;

        this.intPosition();
        this.cam_x = this.x;
        this.cam_y = this.y;


        //weapon part
        this.hand = new Weapon("hand", 10, 10);
        this.longgun = null;
        this.shortgun = new Weapon("shortgun", 10, 10);
        this.weapon = this.shortgun;

        this.smallBullet = 100;
        this.bigBullet = 0;
        this.health = 100;

        this.bag = null;
        this.num = 0;
        this.died = false;
        this.velocity_x = Math.floor(rand(1) - 2);
        this.velocity_y = Math.floor(rand(1) - 2);
    }


    gameOver() {
        this.stage.addActor(new MapObject(this.stage, new Pair(this.x - 35, this.y - 35), "grave"));
        this.stage.AI -= 1;
        this.stage.removeActor(this);
    }

    toString() {
        return "monster";
    }


    drawOnePart(context, dx, dy, part) {
        var image = new Image();
        image.src = "icons/" + part + ".png";
        context.drawImage(image, this.cam_x + dx, this.cam_y + dy);
    }

    draw(context, xView, yView) {
        //draw scores
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        this.cam_x = this.x - xView;
        this.cam_y = this.y - yView;
        context.translate(this.cam_x, this.cam_y);
        context.rotate(this.angle);
        context.beginPath();
        context.translate(-this.cam_x, -this.cam_y);

        this.drawOnePart(context, -64, -64, "player");
        // hand hitting
        this.drawOnePart(context, -100, -100, this.weapon.toString());
        context.restore();
        context.closePath();
    }

    step() {

        var startAx = this.x - 300;
        var endAx = this.x + 300;
        var startAy = this.y - 300;
        var endAy = this.y + 300;
        var p1 = this.stage.player;

        if (p1.x > startAx && p1.x < endAx && p1.y > startAy && p1.y < endAy) {
            this.rotate(p1.cam_x, p1.cam_y);
            this.velocity_x = Math.floor(rand(1) - 2);
            this.velocity_y = Math.floor(rand(1) - 2);
            var randNum = Math.floor(rand(50));
            if (randNum == 1) {
                this.fire();
            }
        } else {
            this.move(this.velocity_x, this.velocity_y);
            this.intPosition();
        }

        if (this.health <= 0) {
            this.gameOver();
        }

        var xstart = this.x - 40 - 30;
        var xend = this.x + 40;
        var ystart = this.y - 55;
        var yend = this.y + 40;

        for (var i = 0; i < this.stage.actors.length; i++) {
            var currentActor = this.stage.actors[i];
            if (currentActor.constructor.name == "Amunition") {
                var xBullet = currentActor.x;
                var yBullet = currentActor.y;
                if (xBullet > xstart && xBullet < xend && yBullet > ystart && yBullet < yend) {
                    this.health -= currentActor.getDamage();
                    currentActor.disappear();
                }
            }
        }

    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;

        // bounce off the walls
        if (this.x < 40) {
            this.x = 40;
            this.velocity_x = -this.velocity_x;
        }
        if (this.x > this.stage.room.map.width - 40) {
            this.x = this.stage.room.map.width - 40;
            this.velocity_x = -this.velocity_x;
        }
        if (this.y < 40) {
            this.y = 40;
            this.velocity_y = -this.velocity_y;
        }
        if (this.y > this.stage.room.map.height - 40) {
            this.y = this.stage.room.map.height - 40;
            this.velocity_y = -this.velocity_y;
        }
    }

    rotate(mouseX, mouseY) {
        this.angle = Math.atan2(mouseY - this.cam_y, mouseX - this.cam_x) - Math.PI / 2;
    }

    intPosition() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
    }

    fire(num) {
        fire = true;
        if (this.weapon.toString() == "hand") {
            this.num = num;
            setTimeout(this.stopFireing, 200);
        }
        if (this.weapon.toString() == "longgun" && this.bigBullet != 0) {
            var startX = this.cam_x + (Math.cos(this.angle) - 100 * Math.sin(this.angle));
            var startY = this.cam_y + (Math.sin(this.angle) + 100 * Math.cos(this.angle));

            var angle = new Pair(-Math.sin(this.angle), Math.cos(this.angle));
            // if (this.angle)
            var startPos = new Pair(startX, startY);
            var amunition = new Amunition(this.stage, "bigBullet", angle, startPos, 40, 10);
            this.stage.addActor(amunition);
            this.bigBullet -= 1;
        }
        if (this.weapon.toString() == "shortgun" && this.smallBullet != 0) {
            var startX = this.x + (Math.cos(this.angle) - 100 * Math.sin(this.angle));
            var startY = this.y + (Math.sin(this.angle) + 100 * Math.cos(this.angle));

            var angle = new Pair(-Math.sin(this.angle), Math.cos(this.angle));
            var startPos = new Pair(startX, startY);
            if (this.angle >= -3.14 && this.angle <= -1.88) {
                startX -= 10;
                startY -= 20;
            } else if (this.angle >= -1.88 && this.angle <= -1) {
                startX -= 10;
                startY -= 30;
            }
            else if (this.angle >= 0.2 && this.angle <= 1.7) {
                startX -= 20;
                startY -= 10;
            }
            else if (this.angle >= -5 && this.angle <= -3.1) {
                startX -= 20;
                startY -= 20;
            }
            var startPos = new Pair(startX, startY);

            var amunition = new Amunition(this.stage, "smallBullet", angle, startPos, 20, 20);
            this.stage.addActor(amunition);
            this.smallBullet -= 1;
        }

    }

    stopFireing() {
        fire = false;
    }
}