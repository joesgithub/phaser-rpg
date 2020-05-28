import Phaser from 'phaser';
import Menu from '../ui/Menu';
import Message from '../ui/Message';

export default class UIScene extends Phaser.Scene {
	constructor() {
		super('ui');
        // from Phaser.Scene:
        // this.add
        // this.input

        this.graphics;
        this.menus;
        this.heroesMenu;
		this.actionsMenu;
		this.enemiesMenu;
        this.currentMenu;
        this.battleScene;
        this.message;
	}

	preload() {
    }

    create() {
    	// add graphic group to scene
    	// set graphic styles
    	this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);  

        // add graphic boxes
        this.graphics.strokeRect(2, 150, 90, 100);
        this.graphics.fillRect(2, 150, 90, 100);

        this.graphics.strokeRect(95, 150, 90, 100);
        this.graphics.fillRect(95, 150, 90, 100);

        this.graphics.strokeRect(188, 150, 130, 100);
        this.graphics.fillRect(188, 150, 130, 100);

        // add container to scene
        this.menus = this.add.container();

        // create menus
        // can initialize with items like actionsMenu
        this.heroesMenu = new Menu(this, 195, 153);
        this.actionsMenu = new Menu(this, 100, 153, ['Attack']);
        this.enemiesMenu = new Menu(this, 8, 153);

        this.battleScene = this.scene.get('battle');

        // can remap all items whenever
        this.remapMenu(this.heroesMenu, this.battleScene.heroes);
        this.remapMenu(this.enemiesMenu, this.battleScene.enemies);

        this.actionsMenu.confirm = () => this.events.emit('SelectEnemies');
        this.enemiesMenu.confirm = () => this.events.emit('Enemy', this.enemiesMenu.menuItemIndex);

        // add menus to the container
        this.menus.add(this.heroesMenu);
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);

        this.currentMenu = this.actionsMenu;

        // add messages
        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);

        // interaction
        this.input.keyboard.on('keydown', this.onKeyInput);

        // events
        this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);
        this.events.on('SelectEnemies', this.onSelectEnemies, this);
        this.events.on('Enemy', this.onEnemy, this);

        // both scenes ready before first turn
        this.battleScene.nextTurn();
    }

	remapMenu = (menu, units) => {
        const names = units.map(({ type }) => type);
        menu.remap(names);
    }

    onKeyInput = event => {
        if (this.currentMenu) {
            if(event.code === "ArrowUp") {
                this.currentMenu.moveSelectionUp();
            } else if(event.code === "ArrowDown") {
                this.currentMenu.moveSelectionDown();
            } else if(event.code === "ArrowRight" || event.code === "Shift") {
 
            } else if(event.code === "Enter") {
                this.currentMenu.confirm();
            } 
        }
    }

    onPlayerSelect = id => {
        this.heroesMenu.select(id);
        this.currentMenu = this.actionsMenu;
        this.actionsMenu.select(0);
    }

    onSelectEnemies = () => {
    	this.currentMenu = this.enemiesMenu;
        this.enemiesMenu.select(0);
    }

    onEnemy = index => {
        this.heroesMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection('attack', index);
    }
}
