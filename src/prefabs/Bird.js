class Bird extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "bird", 16, 18); // TODO actual height is 17 >:(

        this.vx = 0;
        this.vy = 0;

        this.flySpeed = 1;
        this.flyUpSpeed = -1.2;
        this.fallSpeed = 0.5;
        this.stamina = 120;


        this.graphics.fillStyle(0xff0000, 1);
    }

    physicsUpdate() {
        // if (this.onGround()) {
        //     console.log("ground!");
        // }
    }
}
