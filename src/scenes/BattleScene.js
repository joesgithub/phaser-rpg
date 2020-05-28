import Phaser from 'phaser';
import PlayerCharacter from '../ui/PlayerCharacter';
import Enemy from '../ui/Enemy';

export default class BattleScene extends Phaser.Scene {
	constructor() {
		super('battle');
        // from Phaser.Scene:
        // this.scene
        // this.cameras
        // this.events
        // this.time
        // this.sys

        this.heroes;
        this.enemies;
        this.units;
        this.index;
	}

    create = () => {
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    	this.sys.events.on('wake', this.startBattle, this);
    	this.startBattle();
    }

    receivePlayerSelection = (action, target) => {
    	console.log('action', action);
        if(action === 'attack') {            
            this.units[this.index].attack(this.enemies[target]);              
        }
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });        
    }

    nextTurn = () => {
    	if (this.checkEndBattle()) {           
            this.endBattle();
            return;
        }

    	const nextUnit = () => {
			this.index++;

			// if there are no more units, we start again from the first one
			if (this.index >= this.units.length) {
				this.index = 0;
			}

			if (!this.units[this.index].living) nextUnit();
    	}

    	nextUnit();

        // if its player hero
        if(this.units[this.index] instanceof PlayerCharacter) {                
            this.events.emit('PlayerSelect', this.index);
        } else { // else if its enemy unit
        	const livingHeroes = this.heroes.filter(({ living }) => living);
            // pick random hero
            const r = Math.floor(Math.random() * livingHeroes.length);
            // call the enemy's attack function 
            this.units[this.index].attack(livingHeroes[r]);  
            // add timer for the next turn, so will have smooth gameplay
            this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        }
    }

    startBattle = () => {
    	// heroes
    	const warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
    	this.add.existing(warrior);

        const mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);
        this.add.existing(mage);            
        
        // enemies
        const dragonBlue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 3);
        this.add.existing(dragonBlue);
        
        const dragonOrange = new Enemy(this, 50, 100, 'dragonorrange', null,'Dragon2', 50, 3);
        this.add.existing(dragonOrange);

        this.heroes = [ warrior, mage ];
        this.enemies = [ dragonBlue, dragonOrange ];
        this.units = [ ...this.heroes, ...this.enemies ];

        // starting unit
    	this.index = -1; 

    	this.scene.launch('ui');      
    }

    checkEndBattle = () => {
        // if all enemies are dead we have victory
        const victory = this.enemies.every(({ living }) => !living);

        // if all heroes are dead we have game over
        const gameOver = this.heroes.every(({ living }) => !living);

        return victory || gameOver;
    }

    endBattle = () => {       
        // clear state, remove sprites
        this.heroes.length = 0;
        this.enemies.length = 0;

		this.units.forEach(unit => unit.destroy());
        this.units.length = 0;

        this.exitBattle();
    }

    exitBattle = () => {
    	this.scene.sleep('ui');
    	this.scene.switch('world');
    }
}
