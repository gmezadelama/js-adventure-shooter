import Character from './Character';

export default class Enemy extends Character {
    constructor(x, y) {
        super({
            x: x,
            y: y,
            height: 50,
            width: 50,
            color: Math.random() * 100 % 2 === 0 ? 'red' : 'yellow'
        }, 'Enemy');
        this.originalY = y;
        this.dx = -0.75;
        this.ySign = 1;
    }

    movement() {
        // TODO: just an example
        this.sprite.x += this.dx;
        if (this.sprite.x < 0) {
            this.sprite.x = 0;
            this.dx *= -1;
            this.y = this.originalY;
            this.ySign *= -1;
            return;
        } else if (this.sprite.x > this.sprite.context.canvas.width - this.sprite.width) {
            this.sprite.x = this.sprite.context.canvas.width - this.sprite.width;
            this.dx *= -1;
            this.y = this.originalY;
            this.ySign *= -1;
            return;
        }
        this.sprite.y += Math.sin(0.15 * this.sprite.x) * 5 * this.ySign;
    }

    update() {
        this.movement();
        super.update();
    }

    render() {
        super.render();
    }
}
