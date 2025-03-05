class UI extends Phaser.Scene {
    constructor() {
        super('uiScene');
    }

    init() {
        
    }

    create() {
        this.makeHeart(0);
        this.makeHeart(1);
        this.makeHeart(2);
    }

    makeHeart(i) {
        let heart = this.add.sprite(0, 0, 'heart');
        console.log(Play.instance)
        let scale = Play.instance.camera.scale;
        heart.scale = scale;
        heart.x = this.cameras.main.width - heart.width*scale - (heart.width+1)*scale*i;
        heart.y = heart.height*scale;
    }
}