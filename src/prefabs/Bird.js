class Bird extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "bird", 16, 16); // TODO actual height is 17 >:(

        this.vx = 0;
        this.vy = 0;

        this.moveSpeed = 0.5;

        this.graphics.fillStyle(0xff0000, 1);
    }

    physicsUpdate() {
        
    }
}
