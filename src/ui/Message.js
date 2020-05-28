import Phaser from 'phaser';

export default class Message extends Phaser.GameObjects.Container {
    constructor (scene, events) {
        super(scene, 160, 30);

        this.scene = scene;
        this.events = events;
        this.hideEvent;
        this.visible;
        this.text;

        this.init();
    }

    init = () => {
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(1, 0xffffff, 0.8);
        graphics.fillStyle(0x031f4c, 0.3);        
        graphics.strokeRect(-90, -15, 180, 30);
        graphics.fillRect(-90, -15, 180, 30);
        this.add(graphics);

        this.text = new Phaser.GameObjects.Text(this.scene, 0, 0, "", { color: '#ffffff', align: 'center', fontSize: 13, wordWrap: { width: 160, useAdvancedWrap: true }});
        this.text.setOrigin(0.5);   
        this.add(this.text);

        this.hideMessage();

        this.events.on("Message", this.showMessage, this);
    }

    showMessage = text => {
        this.text.setText(text);
        this.visible = true;
        if(this.hideEvent) this.hideEvent.remove(false);
        this.hideEvent = this.scene.time.addEvent({ delay: 2000, callback: this.hideMessage, callbackScope: this });
    }

    hideMessage = () => {
        this.hideEvent = null;
        this.visible = false;
    }
}