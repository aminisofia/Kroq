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

        // Load assets
        this.load.image('button-start', 'assets/sprites/startButton.png');
        this.load.image('button-credits', 'assets/sprites/creditsButton.png');

        // this.load.path = 'assets/sprites/';
        this.load.image('kroq', 'assets/sprites/baseKroq.png');
        this.load.image('bird', 'assets/sprites/bird.png');
        this.load.image('star', 'assets/sprites/star.png');
        this.load.image('heart', 'assets/sprites/heart.png');
        this.load.image('x', 'assets/sprites/x.png');

        this.load.image('p1', 'assets/sprites/smallParticle.png');
        this.load.image('p2', 'assets/sprites/mediumParticle.png');
        this.load.image('p3', 'assets/sprites/largeParticle.png');
        this.load.image('p1g', 'assets/sprites/smallParticleGold.png');
        this.load.image('p2g', 'assets/sprites/mediumParticleGold.png');

        this.load.image('tilesetImage', 'assets/sprites/platform.png')
        // this.load.path = 'assets/tilemap/';
        this.load.tilemapTiledJSON('tilemapJSON', 'assets/tilemap/overworld.json')

        this.load.audio('starPickup', 'assets/sfx/starPickup.mp3');
        this.load.audio('kroqJump', 'assets/sfx/jump.mp3');
        this.load.audio('birdFlap', 'assets/sfx/birdFlap.mp3');

        // This loads the font because otherwise it doesn't show correctly
        this.add.text(10000, 0, '.', {
            fontFamily: 'pressstart',
            fontSize: '1px',
            color: '#000000'
        });
    }

    create() {
        this.scene.start('menuScene');
    }
}