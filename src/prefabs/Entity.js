class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name, w, h) {
        super(scene, x, y, name);
        this.scene = scene;
        this.scene.add.existing(this);
        
        this.rx = x;
        this.ry = y;

        this.w = w;
        this.h = h;

        this.graphics = this.scene.add.graphics();
        this.graphics.setDepth(10);
    }

    move(vx, vy) {
        if (vx === 0 && vy === 0) return

        let amm = Math.max(Math.abs(vx), Math.abs(vy));
        const extra = amm % 1;
        amm = Math.floor(amm);

        vx = Math.sign(vx);
        vy = Math.sign(vy);
        for (let i = 0; i < amm; i++) {
            if (!this.inTile()) {
                this.rx += vx;
                this.ry += vy;
            } else {
                break;
            }
        }

        if (!this.inTile()) {
            this.rx += vx * extra;
            this.ry += vy * extra;
        }

        this.pushOut(vx, vy);

    }

    pushOut(vx, vy) {
        if (vx === 0 && vy === 0) {
            console.error("pushOut(): both vx and vy were zero!");
            return;
        }
        if (this.inTile()) {
            if (vx !== 0) {
                this.rx = Math.floor(this.rx);
            } else {
                this.ry = Math.floor(this.ry);
            }

            while (this.inTile()) {
                this.rx -= vx;
                this.ry -= vy;
            }
        }
    }

    checkTile(vx, ax, vy, ay) { // true if you are in a wall
        let x;
        if (vx !== 0) {
            let ox = vx > 0 ? -1 : 0;
            x = Math.floor(vx * (this.w / 2 + ax - 1)) + ox + this.rx;
        } else {
            x = ax + this.rx;
        }
        let y;
        if (vy !== 0) {
            let oy = vy > 0 ? -1 : 0;
            y = Math.floor(vy * (this.h / 2 + ay - 1)) + oy + this.ry;
        } else {
            y = ay + this.ry;
        }

    
        
        let cx = Math.floor(x/16);
        let cy = Math.floor(y/16);

        let tile = this.scene.tilemap.getTileAt(cx, cy, true, this.scene.groundMap);
        return tile === null || tile.index !== -1;
    }
    inTile() {
        return this.inGround() || this.inRoof() || this.inLeft() || this.inRight();
    }
    onDirection(x, y) {
        if (x !== 0) {
            return this.checkTile(x, 2, 0, -this.h/2) || this.checkTile(x, 2, 0, this.h/2-1);
        } else {
            return this.checkTile(0, -this.w/2, y, 2) || this.checkTile(0, this.w/2-1, y, 2);
        }
    }
    inDirection(x, y) {
        if (x !== 0) {
            return this.checkTile(x, 1, 0, -this.h/2) || this.checkTile(x, 1, 0, this.h/2-1);
        } else {
            return this.checkTile(0, -this.w/2, y, 1) || this.checkTile(0, this.w/2-1, y, 1);
        }
    }
    onGround() {
        return this.onDirection(0, 1);
    }
    inGround() {
        return this.inDirection(0, 1);
    }
    onRoof() {
        return this.onDirection(0, -1);
    }
    inRoof() {
        return this.inDirection(0, -1);
    }
    onLeft() {
        return this.onDirection(-1, 0);
    }
    inLeft() {
        return this.inDirection(-1, 0);
    }
    onRight() {
        return this.onDirection(1, 0);
    }
    inRight() {
        return this.inDirection(1, 0);
    }
    updateVisualPosition() {
        this.x = Math.round(this.rx);
        this.y = Math.round(this.ry);
        // this.x = (this.rx);
        // this.y = (this.ry);
    }

    physicsUpdate() {}

    keyLeft() {return this.scene.keys.left.isDown || this.scene.keys.A.isDown; }
    keyRight() { return this.scene.keys.right.isDown || this.scene.keys.D.isDown; }
    keyUp() { return this.scene.keys.up.isDown || this.scene.keys.W.isDown; }
    keyDown() { return this.scene.keys.down.isDown || this.scene.keys.S.isDown; }

    keyLeftClick() {
        if (this.keyLeft()) {
            if (this.leftWasDown === false) {
                this.leftWasDown = true;
                return true;
            }
        } else {
            this.leftWasDown = false;
        }
    }

    keyRightClick() {
        if (this.keyRight()) {
            if (this.rightWasDown === false) {
                this.rightWasDown = true;
                return true;
            }
        } else {
            this.rightWasDown = false;
        }
    }

    keyUpClick() {
        if (this.keyUp()) {
            if (this.upWasDown === false) {
                this.upWasDown = true;
                return true;
            }
        } else {
            this.upWasDown = false;
        }
    }

    keyDownClick() {
        if (this.keyDown()) {
            if (this.downWasDown === false) {
                this.downWasDown = true;
                return true;
            }
        } else {
            this.downWasDown = false;
        }
    }
}
