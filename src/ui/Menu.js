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
        this.selected = false;

        items.forEach(item => this.addMenuItem(item));
	}

	addMenuItem = unit => {
		const menuItem = new MenuItem(this.scene, 0, this.menuItems.length * 20, unit);
		// add item internally
        this.menuItems.push(menuItem);
        // add item to scene
        this.add(menuItem);
        return menuItem;
	}

	moveSelectionUp = () => {
		const decrement = () => {
	        this.menuItemIndex--;
	        if (this.menuItemIndex < 0) {
	        	this.menuItemIndex = this.menuItems.length - 1;
	        }

	        if (!this.menuItems[this.menuItemIndex].active) decrement();
	    }

		this.menuItems[this.menuItemIndex].deselect();

		decrement();

        this.menuItems[this.menuItemIndex].select();
	}

	moveSelectionDown = () => {
		const increment = () => {
	        this.menuItemIndex++;
	        if (this.menuItemIndex >= this.menuItems.length) {
	        	this.menuItemIndex = 0;
	        }

	        if (!this.menuItems[this.menuItemIndex].active) increment();
	    }

		this.menuItems[this.menuItemIndex].deselect();

		increment();

        this.menuItems[this.menuItemIndex].select();
	}

	select = (index = 0) => {
        this.menuItems[this.menuItemIndex].deselect();
        
        this.menuItemIndex = index;
        while(!this.menuItems[this.menuItemIndex].active) {
            this.menuItemIndex++;
            if(this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
            if(this.menuItemIndex == index) return;
        }

        this.menuItems[this.menuItemIndex].select();
        this.selected = true;
	}

	deselect = () => {
		this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
        this.selected = false;
	}

	confirm = () => {
		
	}

	clear = () => {
        this.menuItems.forEach(item => item.destroy());
        this.menuItems.length = 0;
        this.menuItemIndex = 0;
    }

    remap = units => {
        this.clear();        
        units.forEach(unit => unit.setMenuItem(this.addMenuItem(unit.type)));
        this.menuItemIndex = 0;
    }
}