class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        let wid = this.cameras.main.width;
        let hei = this.cameras.main.height;

        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xFFFFFF, 1);
            loadingBar.fillRect(0, hei/2, wid * value, 5);
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // this.load.path = 'assets/sprites/';
        this.load.image('kroq', './assets/sprites/baseKroq.png');

        this.load.image('tilesetImage', './assets/sprites/platform.png')
        // this.load.path = 'assets/tilemap/';
        this.load.tilemapTiledJSON('tilemapJSON', './assets/tilemap/overworld.json')
    }

    create() {
        this.scene.start('playScene');
    }
}