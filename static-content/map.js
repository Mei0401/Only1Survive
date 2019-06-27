class Map {
    constructor(width, height) {
        // map dimensions
        this.width = width;
        this.height = height;

        // map texture
        this.image = null;
    }

    // generate an example of a large map
    generate() {
        // store the generate map as this image texture
        this.image = new Image();
        this.image.src = "icons/river.png";
    }

    // draw the map adjusted to camera
    draw(context, xView, yView) {

        var sx, sy, dx, dy;
        var sWidth, sHeight, dWidth, dHeight;

        // offset point to crop the image
        sx = xView;
        sy = yView;

        // dimensions of cropped image			
        sWidth = context.canvas.width;
        sHeight = context.canvas.height;

        // if cropped image is smaller than canvas we need to change the source dimensions
        if (this.image.width - sx < sWidth) {
            sWidth = this.image.width - sx;
        }
        if (this.image.height - sy < sHeight) {
            sHeight = this.image.height - sy;
        }

        // location on canvas to draw the croped image
        dx = 0;
        dy = 0;
        // match destination with source to not scale the image
        dWidth = sWidth;
        dHeight = sHeight;
        context.beginPath();
        context.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        context.closePath();
    }
}