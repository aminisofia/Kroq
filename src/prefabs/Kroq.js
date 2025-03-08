class Kroq extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "kroq", 12, 12);

        // Set up settings for player

        this.health = 3;
        this.stars = 0;

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

    // This function handles all of Kroq's movement
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

    // This function is the state machine case for when he is walking on the ground
    movementTypeControl() {
        let dx = (this.keyLeft() ? -1 : 0) + (this.keyRight() ? 1 : 0);

        let movementMultiplyer = 1;
        if (!this.onGround()) movementMultiplyer = 0.5;

        this.vx = Entity.pushyMovement(dx, this.vx, this.moveSpeed*movementMultiplyer, this.maxMoveSpeed, this.slowDownSpeed*movementMultiplyer);

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
                this.scene.sound.add("kroqJump").setVolume(0.1).play();
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
        
        this.getColliding().forEach(entity => {
            if (entity instanceof Bird && this.vy > 0) {
                this.mountBird(entity);
                return;
            }
        })
    }

    // This function puts Kroq on a bird
    mountBird(bird) {
        this.mount = bird;
        this.movementType = "ridingBird";
        
        this.mount.rx = this.rx;
        this.mount.ry = this.ry + 9; // TODO kroq isn't lining up with bird for some reason

        this.mount.setScale(this.scaleX, 1)

        this.scene.sound.add("birdFlap").setVolume(0.3).play();
    }

    // This function is the state machine case for when he is riding on a bird
    movementTypeRidingBird() {
        let dx = (this.keyLeft() ? -1 : 0) + (this.keyRight() ? 1 : 0);
        this.vx = Entity.pushyMovement(dx, this.vx, this.mount.flySpeed, this.mount.maxFlySpeed);

        if (this.mount.stamina > 0) {
            this.vy = Entity.pushyMovement(-1, this.vy, this.mount.flyUpSpeed, this.mount.maxFlyUpSpeed, this.mount.flyUpSpeed*3);
            if (this.mount.y <= this.mount.spawnY) this.mount.stamina--;
        } else {
            this.vy = Entity.pushyMovement(1, this.vy, this.mount.fallSpeed, this.mount.maxFallSpeed);
        }

        if (this.onRoof() && this.mount.stamina <= 0) {
            this.vy = 0;
            this.move(0, 1);
        }

        this.mount.rx = this.rx + 2 + this.vx;
        this.mount.ry = this.ry + 9 + this.vy; // TODO kroq isn't lining up with bird for some reason


        if (this.onGround() && this.mount.stamina === 0) {
            this.mount.reset();
            this.mount = null;
            this.movementType = "control";
        }
    }
    
    // This function sets the direction of the mount (if it exists) to Kroq's direction
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

    // Test code for idea that we won't implument
    // movementTypeJump() {
    //     if (this.keyUpClick() && (this.onGround() || this.coyoteTime > 0 || (this.vx > 0 && this.onRight()) || (this.vx < 0 && this.onLeft()))) {
    //         this.vy = -this.jumpForce;
    //         this.coyoteTime = 0;

    //         if (this.vx === 0) {
    //             this.vx = this.moveSpeed;
    //         } else if (this.vx > 0 && this.onRight()) {
    //             this.vx = -this.moveSpeed;
    //         } else if (this.vx < 0 && this.onLeft()) {
    //             this.vx = this.moveSpeed;
    //         }
    //     }
    // }
}
