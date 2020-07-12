import { Sprite } from 'kontra';
import { GameManager } from '../GameManager';

const BULLET_SPEED = 5;
const BULLET_RADIUS = 5;

export default class Bullet {
    constructor(x, y, dx, dy, owner, target) {
        this.bullet = Sprite({
            x: x,
            y: y,
            color: 'yellow',
            radius: BULLET_RADIUS,
            dx: dx * BULLET_SPEED,
            dy: dy * BULLET_SPEED,
            render: function() {
                this.context.fillStyle = this.color,
                this.context.beginPath();
                this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                this.context.fill();
            }
        });
        this.owner = owner;
        this.target = target;
        this.isAlive = true;
    }
    update() {
        if (!this.isAlive) return;
        for(let i = 0; i < GameManager.gameObjects.length; i++) {
            if (GameManager.gameObjects[i].tag === this.target && GameManager.gameObjects[i].sprite.collidesWith(this.bullet)) {
                console.log('Bullet collide with enemy', i)
                GameManager.gameObjects[i].die();
                GameManager.removeGameObject(i);
                // this.bullet.ttl = 0;
                this.isAlive = false;
                break;
            }
        }
        if (this.bullet.x > this.bullet.context.canvas.width || this.bullet.x < 0) {
            this.bullet.ttl = 0;
        }
        if (this.bullet.y > this.bullet.context.canvas.height || this.bullet.y < 0) {
            this.bullet.ttl = 0;
        }
        this.bullet.update();
    }
    render() {
        if (!this.isAlive) return;
        this.bullet.render();
    }
 }
