import { init, GameLoop, Sprite, initKeys, keyPressed } from 'kontra';
import { GameManager } from './GameManager';
import Player from './characters/Player';
import Enemy from './characters/Enemy';
import './sass/styles.scss';

const main = () => {
    const { canvas, context } = init();
    initKeys();
    const player = new Player();
    const background = Sprite({
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
        color: 'black'
    });
    const enemy1 = new Enemy(350, 30);
    const enemy2 = new Enemy(350, 350);
    GameManager.gameObjects.push(...[player, enemy1, enemy2]);

    // create main game loop
    const loop = GameLoop({
        update: () => {
            background.update();
            player.update();
            enemy1.update();
            enemy2.update();
        },
        render: () => {
            context.globalAlpha = 0.2;
            background.render();
            context.globalAlpha = 1;
            player.render();
            enemy1.render();
            enemy2.render();
        }
    });

    loop.start();
}

main();