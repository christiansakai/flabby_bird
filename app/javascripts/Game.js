import Preload from "./states/Preload";
import Menu from "./states/Menu";
import Play from "./states/Play";

/**
 * Class representing the Game.
 * @extends Phaser.Game
 */
class Game extends Phaser.Game {

  /**
   * Create a game.
   *
   * @param {object} config game configuration
   * @param {number} config.width game width in pixels
   * @param {number} config.height game height in pixels
   * @param {Phaser.Physics} config.engine game physics
   * @param {string} config.domNode DOM id where the game mounts
   */
  constructor({ width, height, engine, domNode }) {
    super(width, height, engine, domNode);

    this.state.add("Preload", Preload, false);
    this.state.add("Menu", Menu, false);
    this.state.add("Play", Play, false);
  }

  /**
   * Start the game by
   * starting Preload state
   */
  start() {
    this.state.start("Preload");
  }

}

export default Game;
