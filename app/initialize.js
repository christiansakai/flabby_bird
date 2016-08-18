import Game from "./javascripts/Game";

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game({
    width: 288, 
    height: 505,
    engine: Phaser.AUTO,
    domNode: "app"
  });

  game.start();
});
