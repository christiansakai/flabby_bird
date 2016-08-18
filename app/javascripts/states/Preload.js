class Preload extends Phaser.State {
  preload() {
    // Add one-time event handler
    // to onLoadComplete Signal
    this.load.onLoadComplete.addOnce(this.goToMenu, this);

    // Load images
    this.load.image("background", "/background.png");
    this.load.image("ground", "/ground.png");
    this.load.image("title", "/title.png");
    this.load.image("startButton", "/start-button.png");

    // Load spritesheet
    // sprites are images that have physics
    // spritesheet is a collection of sprite frames
    // per frame in this file is 34 x 24 pixels
    // total 3 frames
    this.load.spritesheet("bird", "/bird.png", 34, 24, 3);
  }

  goToMenu() {
    this.game.state.start("Menu");
  }

}

export default Preload;
