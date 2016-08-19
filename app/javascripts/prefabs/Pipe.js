class Pipe extends Phaser.Sprite {
  constructor({ game, x, y, asset, frame }) {
    super(game, x, y, asset, frame);

    // Set this sprite's anchor to the center
    // anchor is a Canvas API
    this.anchor.set(0.5, 0.5);

    // Enable Physics to affect this sprite
    this.game.physics.arcade.enableBody(this);

    // Gravity wont affect this sprite
    this.body.allowGravity = false;

    // Can't be moved
    this.body.immovable = true;
  }
}

export default Pipe;
