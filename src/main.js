import Phaser from 'phaser';

import BootScene from './scenes/BootScene';
import WorldScene from './scenes/WorldScene';
import BattleScene from './scenes/BattleScene';
import UIScene from './scenes/UIScene';

const config = {
	type: Phaser.AUTO,
	parent: 'game',
	width: 320,
	height: 240,
	zoom: 2, // scale
	pixelArt: true, // no blur on scale
	render: {
		roundPixels: true,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			// debug: true,
		},
	},
	scene: [
		BootScene,
		WorldScene,
		BattleScene,
		UIScene,
	],
};

export default new Phaser.Game(config);
