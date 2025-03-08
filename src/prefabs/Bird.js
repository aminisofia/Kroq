class Bird extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "bird", 16, 18); // TODO actual height is 17 >:(

        this.vx = 0;
        this.vy = 0;

        this.flySpeed = 0.05;
        this.maxFlySpeed = 1;
        this.flyUpSpeed = 0.04;
        this.maxFlyUpSpeed = 1.2;
        this.fallSpeed = 0.01;
        this.maxFallSpeed = 0.4;
        this.maxStamina = 40;
        this.stamina = this.maxStamina;
    }

    reset() {
        super.reset();
        this.stamina = this.maxStamina;
    }

    physicsUpdate() {
        // if (this.onGround()) {
        //     console.log("ground!");
        // }
    }
}
