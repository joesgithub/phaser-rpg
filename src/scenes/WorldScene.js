import Phaser from 'phaser';

export default class WorldScene extends Phaser.Scene {
	constructor() {
		super('world');
        // from Phaser.Scene:
        // this.make
        // this.physics
        // this.input
        // this.cameras
        // this.anims

        this.player;
        this.cursors;
        this.spawns;
	}

    create = () => {
        const map = this.make.tilemap({ key: 'map' });

        // tileset image
        const tiles = map.addTilesetImage('spritesheet', 'tiles');
        // add layers (keys taken from tilemap JSON)
        const grass = map.createStaticLayer('Grass', tiles, 0, 0);
        const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        // obstacles are collidable
        obstacles.setCollisionByExclusion([-1]);

        // adding to scene physics makes it collidable
        // starting x and y, spritesheet, and frame
        this.player = this.physics.add.sprite(50, 100, 'player', 6);

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        // now they collide
        this.physics.add.collider(this.player, obstacles);

        this.cursors = this.input.keyboard.createCursorKeys();

        // scene camera bounds and follow
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        // supposed to get rid of tile borders
        // have in config too, but not working
        this.cameras.main.roundPixels = true;

        // player animation
        this.anims.create({
            key: 'side',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
            frameRate: 10,
            repeat: -1
        });

        this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        for (var i = 0; i < 30; i++) {
            const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            // x coords, y coords, width, height
            this.spawns.create(x, y, 20, 20);
        }
        // when first two args overlap, call third
        this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);

        // reset keyinputs
        this.sys.events.on('wake', this.wake, this);
    }

    update = () => {
        // player movement and animation
        this.player.body.setVelocity(0);      

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-80);
            this.player.anims.play('side', true);
            this.player.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(80);
            this.player.anims.play('side', true);
            this.player.flipX = false;
        } else if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-80);
            this.player.anims.play('up', true);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(80);
            this.player.anims.play('down', true);
        } else {
            this.player.anims.stop();
        }
    }

    wake = () => {
        this.cursors.left.reset();
        this.cursors.right.reset();
        this.cursors.up.reset();
        this.cursors.down.reset();
    }

    onMeetEnemy = (player, zone) => {
        // move the zone
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

        // shake the world
        this.cameras.main.shake(300);

        // start battle
        this.scene.switch('battle');
    }
}
