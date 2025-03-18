class Star extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "star", 10, 10);
        // Settings for star
        this.t = 0;
        this.bobSpeed = 0.05;
    }

    physicsUpdate() {
        this.t += 1;

        // Pickup logic
        this.pickup = true;
        this.getColliding().forEach(entity => {
            if (!(entity instanceof Kroq || entity instanceof Bird)) return;
            if (!this.pickup) return;
            this.pickup = false;

            this.scene.kroq.stars += 1;
            UI.instance.starText.text = this.scene.kroq.stars;            
            this.scene.sound.add("starPickup").setVolume(0.1).play();

            const particleSprites = ['p1g', 'p2g'];
            for (let i = 0; i < 60; i++) {
                let x = 100;
                let y = 100;
                while (this.lengthOfVec(x, y) > 1) {
                    x = Math.random()*2-1;
                    y = Math.random()*2-1
                }
                x *= 1;
                y *= 1;
                this.scene.entities.push(new Particle(this.scene, this.rx, this.ry, particleSprites[Math.floor(Math.random()*particleSprites.length)], x, y-0.5, 0.05, Entity.randomBetween(1, 30)));
            }
            this.delete();
            return;
        })
    }

    lengthOfVec(x, y) {
        return Math.sqrt(x*x + y*y);
    }

    visualUpdate() {
        this.x = Math.round(this.rx);
        // Bob animation
        this.y = Math.round(this.ry + Math.sin(this.t * this.bobSpeed));
    }
}
