class UI extends Phaser.Scene {
    constructor() {
        super('uiScene');

        UI.instance = this;
    }

    init() {}

    create() {
        // Create all UI elements
        this.hearts = [
            this.makeHeart(0),
            this.makeHeart(1),
            this.makeHeart(2)
        ]
        // Store text element for star counter to modify later
        this.starText = this.makeStar();
    }

    // Puts a specific index heart on screen
    makeHeart(i) {
        let heart = this.add.sprite(0, 0, 'heart');
        let scale = Play.instance.camera.scale;
        heart.scale = scale;
        heart.x = this.cameras.main.width - heart.width*scale - (heart.width+1)*scale*i;
        heart.y = heart.height*scale;
    }

    // Puts the UI star counter text and icon on screen
    makeStar() {
        let star = this.add.sprite(0, 0, 'star');
        let scale = Play.instance.camera.scale;
        star.scale = scale;
        star.x = this.cameras.main.width - 93*scale;
        star.y = (star.height+4)*scale;
        
        let text = this.add.text(star.x+6*scale, star.y-1*scale, 'x0', {
            // fontFamily: 'picoo',
            fontSize: '64px',
            color: '#000000'
        }).setOrigin(0, 0.5).setDepth(2)

        return text;
    }
}