import Game from "./javascripts/Game";

/** 
 * @function
 * @name startGame
 * Mount the game to a DOM element
 * with id "game" and start the game.
 */
const startGame = () => {
  const game = new Game({
    width: 288, 
    height: 505,
    engine: Phaser.AUTO,
    domNode: "game"
  });

  game.start();
};

document.addEventListener('DOMContentLoaded', startGame);
