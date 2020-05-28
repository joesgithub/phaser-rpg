import Phaser from 'phaser';
import MenuItem from './MenuItem';

export default class Menu extends Phaser.GameObjects.Container {
	constructor(scene, x, y, items = []) {
		super(scene, x, y);

		this.menuItems = [];
        this.menuItemIndex = 0;
        this.x = x;
        this.y = y;
        this.scene = scene;

        items.forEach(item => this.addMenuItem(item));
	}

	addMenuItem = unit => {
		const menuItem = new MenuItem(this.scene, 0, this.menuItems.length * 20, unit);
		// add item internally
        this.menuItems.push(menuItem);
        // add item to scene
        this.add(menuItem);    
	}

	moveSelectionUp = () => {
		this.menuItems[this.menuItemIndex].deselect();

        this.menuItemIndex--;

        if (this.menuItemIndex < 0) {
        	this.menuItemIndex = this.menuItems.length - 1;
        }

        this.menuItems[this.menuItemIndex].select();
	}

	moveSelectionDown = () => {
		this.menuItems[this.menuItemIndex].deselect();
		
        this.menuItemIndex++;

        if (this.menuItemIndex >= this.menuItems.length) {
        	this.menuItemIndex = 0;
        }

        this.menuItems[this.menuItemIndex].select();
	}

	select = (index = 0) => {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        this.menuItems[this.menuItemIndex].select();
	}

	deselect = () => {
		this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
	}

	confirm = () => {
		
	}

	clear = () => {
        this.menuItems.forEach(item => item.destroy());
        this.menuItems.length = 0;
        this.menuItemIndex = 0;
    }

    remap = items => {
        this.clear();        
        items.forEach(item => this.addMenuItem(item));
    }
}