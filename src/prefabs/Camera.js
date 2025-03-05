class Camera {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.camera.setBackgroundColor("#51A9B5");
        this.follow = null;
        this.scale = 4;
    }

    update() {
        this.camera.scrollX = -this.camera.width / 2;
        this.camera.scrollY = -this.camera.height / 2;
        if (this.follow != null) {
            this.camera.scrollX += this.follow.x;
            this.camera.scrollY += 346 - 40; // this.follow.y;
        }
        this.camera.setZoom(this.scale);
    }

    setFollow(object) {
        this.follow = object;
    }
}