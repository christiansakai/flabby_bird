/**
 * Class representing Bird Sprite.
 * @extends Phaser.Sprite
 */
class Bird extends Phaser.Sprite {

  /**
   * Create a Bird Sprite. This sprite is created
   * default with animation running, affected
   * by Physics but not affected by gravity.
   * It has default property alive set to false.
   *
   * @param {object} config sprite configuration
   * @param {Phaser.Game} config.game the current game object
   * @param {number} config.x x-axis coordinate of the sprite in pixels
   * @param {number} config.y y-axis coordinate of the sprite in pixels
   * @param {string} config.asset preloaded asset name
   */
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.setAnchor();
    this.addAnimation();
    this.setPhysics();

    // Set a helper property
    // for flap() method.
    this.alive = false;

    // Add audio and add reference it here so we can play
    // interestingly this doesnt get add to the game World's children
    this.flapSound = this.game.add.audio('flap');
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
   * Add animation to this sprite
   */
  addAnimation() {
    // Default animation is provided
    // automatically if using sprites with 
    // many frames.
    this.animations.add("flap");
    // 12 FPS, loop = true
    this.animations.play("flap", 12, true);
  }

  /**
   * Enable Physics engine to affect
   * this sprite. Also disables
   * gravity by default.
   */
  setPhysics() {
    this.game.physics.arcade.enableBody(this);

    // This sprite will be used
    // as an icon menu, which will
    // stay on its current location
    // (unaffected by gravity)
    this.body.allowGravity = false;
  }

  /**
   * Add sound effect for flap method.
   */
  addSound() {
    // Interestingly, `this.game.add` does not
    // add this automatically as the World's children
    this.flapSound = this.game.add.audio('flap');
  }

  /**
   * Enable gravity to affect
   * this sprite and turn the alive
   * property into true.
   */
  makeAlive() {
    this.body.allowGravity = true;

    // To be used when calculating 
    // flap
    this.alive = true;
  }

  /**
   * Disable gravity and turn alive
   * property into false
   */
  makeDead() {
    this.body.allowGravity = false;
    this.alive = false;
  }

  /**
   * Fly this bird upward by
   * setting the y axis velocity negative
   * and adding a tween to animate
   * this bird. Play sound effects
   * when flapping.
   */
  flap() {
    this.body.velocity.y = -400;
    
    // Tween to animate 
    // this bird point upward -40 degrees.
    // Tween is different than animation. 
    // Tween is Phaser-manipulated animation
    // while animation is created by
    // many frames of the sprite.
    const birdTween = this.game.add.tween(this)
    birdTween.to({ angle: -40 }, 100);
    birdTween.start();

    this.flapSound.play();
  }

  /**
   * Because this class is an
   * extension of Phaser.Sprite, 
   * the update function is called by Phaser
   * just like in a game State.
   */
  update() {
    // Check if the bird is alive (made by
    // starting the game) and its angle
    // is below 90. Rotate the bird towards
    // the ground by 2.5 degrees
    if (this.angle < 90 && this.alive) {
      this.angle += 2.5;
    }
  }

}

export default Bird;
