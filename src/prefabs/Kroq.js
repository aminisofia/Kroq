class Kroq extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "kroq", 12, 12);

        this.health = 3;

        this.maxCoyoteTime = 5;
        this.coyoteTime = this.maxCoyoteTime;

        this.gravity = 0.05;
        this.jumpForce = 1.2;
        this.jumpTimer = 0;
        this.canUseJump = true;
        this.maxJumpTime = 30;
        this.moveSpeed = 0.05;
        this.slowDownSpeed = 0.1;
        this.maxMoveSpeed = 1;

        this.mount = null;

        this.movementType = "control";

        this.graphics.fillStyle(0xff0000, 1);
    }

    physicsUpdate() {

        // this.graphics.clear();
        
        if (this.ry > 420) {
            this.scene.scene.start('playScene');
            return;
        }


        if (this.movementType === "control") {
            this.movementTypeControl();
        } else if (this.movementType === "ridingBird") {
            this.movementTypeRidingBird();
        }

        this.move(this.vx, 0);
        this.move(0, this.vy);

        if (this.onRoof()) {
            this.vy = 0;
        }

        if (this.onGround()) {
            this.vy = 0;
            this.coyoteTime = this.maxCoyoteTime;
        }

        // this.graphics.fillPoint(this.x, this.y);

    }

    movementTypeControl() {
        let dx = (this.keyLeft() ? -1 : 0) + (this.keyRight() ? 1 : 0);

        let movementMultiplyer = 1;
        if (!this.onGround()) movementMultiplyer = 0.5;

        if (dx === 0 && this.vx === 0) {
            // Do nothing
        } else if (dx === Math.sign(this.vx) || this.vx === 0) {
            this.vx += dx * this.moveSpeed * movementMultiplyer;
            if (this.vx > this.maxMoveSpeed) this.vx = this.maxMoveSpeed;
            if (this.vx <-this.maxMoveSpeed) this.vx =-this.maxMoveSpeed;
        } else if ((dx === 0 && this.vx !== 0) || (dx < 0 && this.vx > 0) || (dx > 0 && this.vx < 0)) {
            if (this.vx > 0) {
                this.vx -= this.slowDownSpeed * movementMultiplyer;
                if (this.vx < 0) this.vx = 0;
            }
            if (this.vx < 0) {
                this.vx += this.slowDownSpeed * movementMultiplyer;
                if (this.vx > 0) this.vx = 0;
            }
        }

        if (this.onRoof()) {
            this.vy = 0;
            this.jumpTimer = this.maxJumpTime;
        }
        if (!this.keyUp()) {
            this.canUseJump = true;
        }
        if (!this.keyUp() && this.onGround()) {
            this.jumpTimer = 0;
        }
        if (this.keyUp() && (((this.onGround() || this.coyoteTime > 0) && this.canUseJump) || (this.jumpTimer < this.maxJumpTime))) {
            if (this.onGround() || this.coyoteTime > 0) {
                this.jumpTimer = 0;
            }
            this.canUseJump = false;
            this.vy = -this.jumpForce;
            this.coyoteTime = 0;
        } else if (!this.onGround()) {
            this.vy += this.gravity;
            this.jumpTimer = this.maxJumpTime;
            if (this.coyoteTime > 0) this.coyoteTime--;
        }
        if (!this.onGround()) {
            this.jumpTimer++;
        }
        

        this.scene.entities.forEach(entity => {
            if (entity !== this && Entity.collides(this, entity)) {
                if (entity instanceof Bird) {
                    if (this.vy > 0) {
                        this.mountBird(entity);
                        return;
                    }
                }
            }
        });
    }

    mountBird(bird) {
        this.mount = bird;
        this.movementType = "ridingBird";
        
        this.mount.stamina = 120;

        this.rx = this.mount.rx - 2;
        this.ry = this.mount.ry - 9; // TODO kroq isn't lining up with bird for some reason
    }

    movementTypeRidingBird() {
        let dx = (this.keyLeft() ? -1 : 0) + (this.keyRight() ? 1 : 0);
        this.vx = dx * this.mount.flySpeed;
        // let dy = (this.keyUp() ? -1 : 0) + (this.keyDown() ? 1 : 0);
        // let dy = 0;
        // let dist = Math.sqrt(dx*dx + dy*dy);
        // this.vx = 0;
        // this.vy = 0;
        // if (dist !== 0) {
            // dx /= dist;
            // dy /= dist;
            // this.vx = dx * this.mount.flySpeed;
            // this.vy = dy * this.mount.flySpeed;
        // }

        if (this.mount.stamina > 0) {
            this.vy = this.mount.flyUpSpeed;
            this.mount.stamina--;
        } else {
            this.vy = this.mount.fallSpeed;
        }

        this.mount.rx = this.rx + 2 + this.vx;
        this.mount.ry = this.ry + 9 + this.vy; // TODO kroq isn't lining up with bird for some reason

        if (this.onGround()) {
            this.mount.reset();
            this.mount = null;
            this.movementType = "control";
        }
    }
    
    visualUpdate() {
        super.visualUpdate();
        if (this.movementType === "ridingBird") {
            this.mount.visualUpdate();
            if (this.vx > 0) {
                this.mount.setScale(1, 1);
            }
            if (this.vx < 0) {
                this.mount.setScale(-1, 1);
            }
        }
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
