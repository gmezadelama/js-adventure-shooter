import { Sprite, keyPressed } from 'kontra';

export default class Character {
    constructor(config, tag) {
        this.sprite = Sprite(config);
        this.tag = tag;
        this.isAlive = true;
    }

    die() {
        this.sprite.ttl = 0;
        this.isAlive = false;
    }

    update() {
        if (!this.isAlive) return;
        this.sprite.update();
    }

    render() {
        if (!this.isAlive) return;
        this.sprite.render();
    }
}