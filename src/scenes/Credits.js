class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        this.cameras.main.scrollX = -this.cameras.main.width / 2;
        this.cameras.main.scrollY = -this.cameras.main.height / 2;

        this.tintGraphics = this.add.graphics();

        this.add.text(0, 0, 'CREDITS\n\nMilo Kesteloot, Sofia Aminifard\nSound: Pixabay\n\nESC to return', {
            fontFamily: 'picoo',
            fontSize: '64px',
            color: '#000000'
        }).setOrigin(0.5, 0.5).setDepth(2)

        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.ESCKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    }

    update(_, dt) {
    
        if (Phaser.Input.Keyboard.JustDown(this.keys.ESCKey)) {
            this.scene.start('menuScene');
        }

        this.tintGraphics.clear();
        this.tintGraphics.fillStyle(0X51A9B5);
        this.tintGraphics.fillRect(-this.sys.game.canvas.width/2, -this.sys.game.canvas.height/2, this.sys.game.canvas.width, this.sys.game.canvas.height);
    }
}
