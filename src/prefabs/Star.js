class Star extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "star", 10, 10);
        console.log(scene)
        this.t = 0;
        this.bobSpeed = 0.05;
    }

    physicsUpdate() {
        this.t += 1;

        this.pickup = true;
        this.getColliding().forEach(entity => {
            if (!this.pickup) return;
            this.pickup = false;

            this.scene.kroq.stars += 1;
            UI.instance.starText.text = "x" + this.scene.kroq.stars;            
            this.scene.sound.add("starPickup").setVolume(0.1).play();
            this.delete();
            return;
        })
    }

    visualUpdate() {
        this.x = Math.round(this.rx);
        this.y = Math.round(this.ry + Math.sin(this.t * this.bobSpeed));
    }
}