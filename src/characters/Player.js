import { keyPressed } from 'kontra';
import Character from './Character';
import Bullet from '../items/Bullet';

const PLAYER_STEP = 2;
const BULLET_TIMEGAP = 250;

export default class Player extends Character {
    constructor() {
        super({
            x: 200,
            y: 200,
            width: 50,
            height: 50,
            color: '#03fc1c'
        }, 'Player');
        this.facing = {
            x: 0,
            y: 0
        }
        this.lastBulletTimeStamp = (new Date()).getTime();
        this.bullets = [];
    }

    update() {
        // check shooting
        if (this.lastBulletTimeStamp + BULLET_TIMEGAP < ((new Date()).getTime())) {
            this.lastBulletTimeStamp = (new Date()).getTime();            
            if (keyPressed('space')) {
                let bulletDx = 0;
                let bulletDy = 0;
                if (keyPressed('left')) {
                    bulletDx = -1;
                } else if (keyPressed('right')) {
                    bulletDx = 1;
                }
                if (keyPressed('up')) {
                    bulletDy = -1;
                } else if (keyPressed('down')) {
                    bulletDy = 1;
                }
                if (bulletDx === 0 && bulletDy === 0) {
                    if (this.facing.x !== 0 || this.facing.y !== 0) {
                        bulletDx = this.facing.x;
                        bulletDy = this.facing.y;
                    } else {
                        bulletDx = 1;
                    }
                }
                let posX = this.sprite.x + this.sprite.width / 2;
                let posY = this.sprite.y + this.sprite.height / 2;
                this.bullets.push(new Bullet(posX, posY, bulletDx, bulletDy, 'Player', 'Enemy'));
            }
        }
        // check movement
        let facing = {
            x: 0,
            y: 0
        };
        if (keyPressed('left')) {
            if (this.sprite.x > 0) {
                this.sprite.x -= PLAYER_STEP;
                facing.x = -1;
            }
        }
        else if (keyPressed('right')) {
            if (this.sprite.x < this.sprite.context.canvas.width - this.sprite.width) {
                this.sprite.x += PLAYER_STEP;
                facing.x = 1;
            }
        }
    
        if (keyPressed('up')) {
            if (this.sprite.y > 0) {
                this.sprite.y -= PLAYER_STEP;
                facing.y = -1;
            }
        }
        else if (keyPressed('down')) {
            if (this.sprite.y < this.sprite.context.canvas.height - this.sprite.height) {
                this.sprite.y += PLAYER_STEP;
                facing.y = 1;
            }
        }
        if (facing.x !== 0 || facing.y !== 0) {
            this.facing = facing;
        }
        
        
        super.update();
        this.bullets.forEach(b => b.update());
    }

    render() {
        super.render();
        this.bullets.forEach(b => b.render());
    }
}