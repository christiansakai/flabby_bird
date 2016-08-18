import Preload from "./states/Preload";
import Menu from "./states/Menu";

class Game extends Phaser.Game {
  constructor({ width, height, engine, domNode }) {
    super(width, height, engine, domNode);

    this.state.add("Preload", Preload, false);
    this.state.add("Menu", Menu, false);
  }

  start() {
    this.state.start("Preload");
  }
}

export default Game;
