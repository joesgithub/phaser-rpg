import Phaser from 'phaser';

export default class MenuItem extends Phaser.GameObjects.Text {
	constructor(scene, x, y, text) {
		super(scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15});
	}

	select = () => {
		this.setColor('#f8ff38');
	}

    deselect = () => {
        this.setColor('#ffffff');
    }
}