/**
 * Class representing Ground Sprite.
 * @extends Phaser.TileSprite
 */
class Ground extends Phaser.TileSprite {

  /**
   * Create a Ground Sprite. This sprite is
   * created with Physics enabled (to enable
   * collision detection) but unaffected by
   * gravity and is immovable. Automatically
   * scrolled in negative x-axis (a capability
   * of Phaser.TileSprite object)
   *
   * @param {object} config sprite configuration
   * @param {Phaser.Game} config.game the current game object
   * @param {number} x x-axis coordinate of the sprite in pixels
   * @param {number} y y-axis coordinate of the sprite in pixels
   * @param {number} width width of the sprite in pixels
   * @param {number} height height of the sprite  in pixels
   * @param {string} asset preloaded asset name
   */
  constructor({ game, x, y, width, height, asset }) {
    super(game, x, y, width, height, asset);

    this.setPhysics();
        
    // Scroll the ground in negative x-axis direction
    this.autoScroll(-200, 0);
  }

  /**
   * Enable Physics to affect this
   * object (for collision detection)
   * but disable the gravity and set this
   * object immovable
   */
  setPhysics() {
    // For collision detection
    this.game.physics.arcade.enableBody(this);

    // To prevent the ground from falling because
    // of gravity
    this.body.allowGravity = false;

    // When the bird and ground collides,
    // Physics engine will calculate and
    // apply Physics simulation. The normal
    // effect is, that after a collision 
    // happened, two objects should be moving
    // at the same speed. This (normally)
    // will cause the ground to moe alongside
    // with the bird (which we don't want).
    // Therefore we set immovable = true.
    this.body.immovable = true;
  }

}

export default Ground;
