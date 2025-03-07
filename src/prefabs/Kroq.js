class Kroq extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "kroq", 12, 12);
        
        this.health = 3;

        this.maxCoyoteTime = 5;
        this.coyoteTime = this.maxCoyoteTime;

        this.gravity = 0.04;
        this.jumpForce = 2.1;
        this.moveSpeed = 0.5;

        this.mount = null;

        this.movementType = "control";

        this.graphics.fillStyle(0xff0000, 1);
    }

    physicsUpdate() {

        // this.graphics.clear();
        
        if (this.movementType === "control") {
            this.movementTypeControl();
        } else if (this.movementType === "ridingBird") {
            this.movementTypeRidingBird();
        }

        this.move(this.vx, 0);
        let collide = this.move(0, this.vy);
        if (collide !== null) {
            console.log(collide);
        }

        if (this.onRoof()) {
            this.vy = 0;
        }
        if (!this.onGround()) {
            this.vy += this.gravity;
            if (this.coyoteTime > 0) this.coyoteTime--;
        }


        if (this.onGround()) {
            this.vy = 0;
            this.coyoteTime = this.maxCoyoteTime;
        }

        // this.graphics.fillPoint(this.x, this.y);

    }

    movementTypeControl() {
        let dx = (this.keyLeft() ? -1 : 0) + (this.keyRight() ? 1 : 0);
        this.vx = dx * this.moveSpeed;

        if (this.keyUpClick() && (this.onGround() || this.coyoteTime > 0)) {
            this.vy = -this.jumpForce;
            this.coyoteTime = 0;
        }
    }

    movementTypeRidingBird() {

    }

    movementTypeJump() {
        if (this.keyUpClick() && (this.onGround() || this.coyoteTime > 0 || (this.vx > 0 && this.onRight()) || (this.vx < 0 && this.onLeft()))) {
            this.vy = -this.jumpForce;
            this.coyoteTime = 0;

            if (this.vx === 0) {
                this.vx = this.moveSpeed;
            } else if (this.vx > 0 && this.onRight()) {
                this.vx = -this.moveSpeed;
            } else if (this.vx < 0 && this.onLeft()) {
                this.vx = this.moveSpeed;
            }
        }
    }
}
