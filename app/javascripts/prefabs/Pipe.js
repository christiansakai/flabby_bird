/**
 * Class representing a Pipe
 * @extends Phaser.Sprite
 */
class Pipe extends Phaser.Sprite {

  /**
   * Create a Pipe sprite. This sprite 
   * is created with Physics enabled but
   * unafffected by gravity and immovable.
   *
   * @param {object} config sprite configuration
   * @param {Phaser.Game} config.game the current game object
   * @param {number} x x-axis coordinate of the sprite in pixels
   * @param {number} y y-axis coordinate of the sprite in pixels
   * @param {string} asset preloaded asset name
   * @param {number} frame frame index of the preloaded asset
   */
  constructor({ game, x, y, asset, frame }) {
    super(game, x, y, asset, frame);

    this.setAnchor();
    this.setPhysics();
  }

  /**
   * Set anchor for this Sprite
   * at the center.
   * Anchor is a PIXI API.
   */
  setAnchor() {
    this.anchor.setTo(0.5, 0.5);
  }

  /**
   * enable physics to affect this
   * object (for collision detection)
   * but disable the gravity and set this
   * object immovable
   */
  setPhysics() {
    // Please refer to Ground.js
    // for more explanation
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
  }

}

export default Pipe;
