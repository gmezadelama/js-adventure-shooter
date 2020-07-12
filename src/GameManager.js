let gameObjects = [];
const removeGameObject = (i) => {
    gameObjects = gameObjects.filter((go, idx) => i === idx);
}

export const GameManager = {
 gameObjects,
 removeGameObject   
}