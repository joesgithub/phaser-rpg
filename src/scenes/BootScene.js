import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
	constructor() {
		super('boot');
        // from Phaser.Scene:
        // this.load
        // this.scene
	}

	preload = () => {
		// map images
		this.load.image('tiles', '/assets/map/spritesheet.png');
		// map JSON
		// made with https://www.mapeditor.org/
		this.load.tilemapTiledJSON('map', '/assets/map/map.json');

		// characters
		this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
		this.load.image('dragonblue', 'assets/dragonblue.png');
        this.load.image('dragonorrange', 'assets/dragonorrange.png');
    }

    create = () => {
    	this.scene.start('world');
    }
}
