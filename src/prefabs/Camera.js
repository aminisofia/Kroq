class Camera {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.camera.setBackgroundColor("#51A9B5");
        this.follow = null;
        this.scale = 4;
    }

    update() {
        // this.scale = 
        
        // This code callibrates the proper scale for the screen size
        let desiredHeight = 983.2000122070312; // My monitor height
        let desiredScale = 4; // My monitor scale
        let theirHeight = this.camera.height; // User monitor height
        let theirScale = (desiredScale / desiredHeight) * theirHeight; // Solve for user scale

        this.scale = theirScale;


        // This code centeres the center of the screen on 0, 0 and follows whatever the variable this.follow is set to
        this.camera.scrollX = -this.camera.width / 2;
        this.camera.scrollY = -this.camera.height / 2;
        if (this.follow != null) {
            this.camera.scrollX += this.follow.x;
            if (this.camera.scrollX < this.camera.width / 2 / this.scale - this.camera.width/2 + this.scale) {
                this.camera.scrollX = this.camera.width / 2 / this.scale - this.camera.width/2 + this.scale;
            }
            this.camera.scrollY += 346 - 40; // this.follow.y;
        }
        this.camera.setZoom(this.scale);
        if (this.scene.backgroundLayer !== undefined) {
            this.scene.backgroundLayer.x = (this.camera.scrollX+this.camera.width/2)/2 - this.camera.width/3/this.scale;
        }
    }

    setFollow(object) {
        this.follow = object;
    }
}