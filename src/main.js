// Game: Kroq - An Aseprite Adventure!
// Name: Milo Kesteloot, Sofia Aminifard
// Date: 03/03/2025
// Time: ?

'use strict'

let config = {
    type: Phaser.AUTO,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Load, Play ],
    base: '/Kroq/'
};

let game = new Phaser.Game(config);

let { width, height } = game.config;