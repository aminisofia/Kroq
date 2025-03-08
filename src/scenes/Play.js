class Play extends Phaser.Scene {

    constructor() {
        super('playScene');

        Play.instance = this;
    }

    init() {
        
    }

    create() {

        this.timeCounter = 0;
        this.updateRate = 1/120;

        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keys.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keys.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.camera = new Camera(this, this.cameras.main);

        this.entities = [];

        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('overworld', 'tilesetImage');
        this.backgroundLayer = map.createLayer('Background', tileset);
        map.createLayer('Decoration', tileset);
        const kroqSpawn = map.findObject('Objects', (object) => object.name === 'kroq-spawn');
        this.kroq = new Kroq(this, kroqSpawn.x, kroqSpawn.y-10);
        this.entities.push(this.kroq);
        const birdSpawns = map.filterObjects('Objects', (object) => object.name === 'bird-spawn');
        for (let birdSpawn of birdSpawns) {
            this.entities.push(new Bird(this, birdSpawn.x, birdSpawn.y-10));
        }
        const starSpawns = map.filterObjects('Objects', (object) => object.name === 'star');
        for (let starSpawn of starSpawns) {
            this.entities.push(new Star(this, starSpawn.x, starSpawn.y));
        }
        this.groundMap = map.createLayer('Ground', tileset);
        map.createLayer('DecoGround', tileset);
        map.createLayer('Water', tileset);

        this.tilemap = map;

        this.camera.setFollow(this.kroq);

        this.scene.launch('uiScene');
        this.scene.bringToTop('uiScene');

    }

    physicsUpdate() {
        this.entities.forEach(entity => entity.physicsUpdate());
    }

    visualUpdate() {
        this.entities.forEach(entity => entity.visualUpdate());
        this.camera.update();
    }

    update(_, dt) {

        if (Phaser.Input.Keyboard.JustDown(this.keys.R)) {
            this.scene.start('playScene');
            return;
        }

        dt /= 1000;
        this.timeCounter += dt;

        while (this.timeCounter >= this.updateRate) {
            this.timeCounter -= this.updateRate;
            this.physicsUpdate()
        }
        this.visualUpdate();
    }
}