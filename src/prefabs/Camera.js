class Camera {
    constructor(camera) {
        this.camera = camera;
        this.camera.setBackgroundColor("#51A9B5");
        this.follow = null;
    }

    update() {
        this.camera.scrollX = -this.camera.width / 2;
        this.camera.scrollY = -this.camera.height / 2;
        if (this.follow != null) {
            this.camera.scrollX += this.follow.x;
            this.camera.scrollY += 346 - 40; // this.follow.y;
        }
        this.camera.setZoom(4);
    }

    setFollow(object) {
        this.follow = object;
    }
}