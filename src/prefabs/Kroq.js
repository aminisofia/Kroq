class Kroq extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "kroq", 12, 12);
        
        this.health = 3;

        this.vx = 0;
        this.vy = 0;
        this.maxCoyoteTime = 5;
        this.coyoteTime = this.maxCoyoteTime;

        this.gravity = 0.04;
        this.jumpForce = 2.1;
        this.moveSpeed = 1;

        this.graphics.fillStyle(0xff0000, 1);
    }

    physicsUpdate() {

        // this.graphics.clear();

        if (0) {

            let dx = (this.keyLeftClick() ? -1 : 0) + (this.keyRightClick() ? 1 : 0);
            let dy = (this.keyUpClick() ? -1 : 0) + (this.keyDownClick() ? 1 : 0);

            this.rx += dx;
            this.ry += dy;

            this.graphics.fillPoint(this.x, this.y);

            this.updateVisualPosition();

            return;
        }

        // console.log(this.rx)
        // console.log(this.inTile())
        
        this.movementTypeControl();

        this.move(this.vx*this.moveSpeed, 0);

        if (this.keyUpClick() && (this.onGround() || this.coyoteTime > 0)) {
            this.vy = -this.jumpForce;
        }

        this.move(0, this.vy);

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

        this.updateVisualPosition();

        if (this.vx > 0) {
            this.setScale(1, 1);
        }
        if (this.vx < 0) {
            this.setScale(-1, 1);
        }

        // this.graphics.fillPoint(this.x, this.y);

    }

    movementTypeControl() {
        let dx = (this.keyLeft() ? -1 : 0) + (this.keyRight() ? 1 : 0);
        this.vx = dx;
    }
}
