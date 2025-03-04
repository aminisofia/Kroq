class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
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

        this.camera = new Camera(this.cameras.main);

        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('overworld', 'tilesetImage');

        map.createLayer('Decoration', tileset);
        const kroqSpawn = map.findObject('Objects', (object) => object.name === 'kroq-spawn');
        this.kroq = new Kroq(this, kroqSpawn.x, kroqSpawn.y-10);
        this.groundMap = map.createLayer('Ground', tileset);
        map.createLayer('DecoGround', tileset);
        map.createLayer('Water', tileset);

        this.tilemap = map;

        this.camera.setFollow(this.kroq);

    }

    physicsUpdate() {
        this.kroq.physicsUpdate();
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

        this.camera.update();
    }
}