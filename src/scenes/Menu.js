class Menu extends Phaser.Scene {

    constructor() {
        super('menuScene');

        Menu.instance = this;
    }

    init() {}

    create() {
        // Create camera
        this.camera = new Camera(this, this.cameras.main);

        // Create buttons and set what they do on click
        let startButton = this.add.sprite(0, -9, "button-start").setInteractive();
        let creditsButton = this.add.sprite(0, 9, "button-credits").setInteractive();

        const scene = this;

        startButton.on('pointerdown', function(pointer) {
            scene.scene.start('playScene');
        });

        creditsButton.on('pointerdown', function(pointer) {
            scene.scene.start('creditsScene');
        });
    }

    update(_, dt) {
        this.camera.update();
    }
}