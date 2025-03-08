// Game: Kroq - An Aseprite Adventure!
// Name: Milo Kesteloot, Sofia Aminifard
// Date: 03/03/2025
// Time: ~ 30 Hours

'use strict'

// General config
let config = {
    type: Phaser.AUTO,
    pixelArt: true,
    // Settings to make game fullscreen
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Load, Menu, UI, Play, Credits ],
    base: '/Kroq/'
};

let game = new Phaser.Game(config);

let { width, height } = game.config;