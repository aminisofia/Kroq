class Play extends Phaser.Scene {

    constructor() {
        super('playScene');

        Play.instance = this;
    }

    init() {
        
    }

    create() {

        // Set up variables for consistent timing
        this.timeCounter = 0;
        this.updateRate = 1/120;

        // Set up key inputs
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keys.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keys.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keys.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Create camera
        this.camera = new Camera(this, this.cameras.main);

        // Create all elements
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
        // Update all entities positions
        this.entities.forEach(entity => entity.physicsUpdate());
    }

    visualUpdate() {
        // Put all entities where they should be on screen
        this.entities.forEach(entity => entity.visualUpdate());
        this.camera.update();
    }

    update(_, dt) {

        // Handle scene key inputs
        if (Phaser.Input.Keyboard.JustDown(this.keys.R)) {
            this.scene.start('playScene');
            return;
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.ESC)) {
            this.scene.start('menuScene');
            return;
        }

        // Set up timing for consistent time
        dt /= 1000;
        this.timeCounter += dt;
        let loopSaftey = 30;

        // This while loop loops every frame to make sure that the game runs the same speed for all players
        while (this.timeCounter >= this.updateRate) {
            this.timeCounter -= this.updateRate;
            this.physicsUpdate()

            loopSaftey--;
            if (loopSaftey <= 0) {
                console.warn("The time-keeping loop has exceeded the maximum loop allowance of 30. Time-skipping to present.");
                this.timeCounter %= this.updateRate;
                break;
            }
        }
        this.visualUpdate();
    }
}