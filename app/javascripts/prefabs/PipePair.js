import Pipe from "./Pipe";

/**
 * Class representing a pair of Pipes.
 * A pair of Pipes is a group of normal
 * Pipe with an upside down Pipe. 
 * @extends Phaser.Group
 */
class PipePair extends Phaser.Group {

  /**
   * Create a Pair of Pipe. This group
   * is created by creating
   * a normal pipe (bottom pipe) and an
   * upside down pipe (top pipe).
   *
   * @param {object} config group configuration
   * @param {Phaser.Game} config.game the current game object
   * @param {Phaser.Group} config.parent the parent that suppose to contain this group
   */
  constructor({ game, parent }) {
    super(game, parent);

    this.createTopPipe();
    this.createBottomPipe();

    // A helper property
    // to indicate whether this pair of pipes
    // has been passed or not.
    this.hasScored = false;
  }

  /**
   * Create a new Pipe located
   * on top of the location (0, 0)
   * (relative to the parent) with
   * preloaded asset "pipe" 
   * using its index 0 (upside down pipe).
   * Save this reference into
   * `this.topPipe`
   */
  createTopPipe() {
    this.topPipe = new Pipe({ 
      game: this.game, 
      x: 0, 
      y: 0, 
      asset: "pipe", 
      frame: 2
    }); 
    // Make the pipe moves in negative x-axis
    // as fast as the ground scroll speed
    this.topPipe.body.velocity.x = -200;
    // Add the pipe to this group
    this.add(this.topPipe);
  }

  /**
   * Create a new Pipe, located at
   * y = pipe.height + (bird.height + 5)
   * which means that the spae between
   * top and bottom pipe should be about
   * 5 x the height of the bird.
   * Use preloaded asset "pipe" with its
   * index 1 (normal pipe).
   * Save this reference to
   * `this.bottomPipe`
   */
  createBottomPipe() {
    this.bottomPipe = new Pipe({
      game: this.game, 
      x: 0, 
      y: 440, 
      asset: "pipe", 
      frame: 1
    });
    // Make the pipe moves in negative x-axis
    // as fast as the ground scroll speed
    this.bottomPipe.body.velocity.x = -200;
    // Add pipe to this group
    this.add(this.bottomPipe);
  }

  /**
   * Reset this whole group.
   * Unlike Phaser.Sprite, Phaser.Group
   * does not automatically have its own reset.
   * Therefore we define it here.
   */
  reset(x, y) {
    // Reset topPipe and bottomPipe
    // relative to the group
    this.topPipe.reset(0, 0);
    this.bottomPipe.reset(0, 440);

    // Reset this whole group location
    this.x = x;
    this.y = y;

    // Reset all pipe's x-axis velocity
    this.setAll("body.velocity.x", -200);

    // Whether this obstacle has been passed or not
    this.hasScored = false;

    // Set exists true
    // to counter the effect of
    // `this.checkWorldBounds`
    this.exists = true;
  }

  /**
   * Check whether this group
   * is still inside the World bound or not.
   */
  checkWorldBounds() {
    // Only check the topPipe because
    // the bottomPipe has the same x
    // coordinate.
    if (!this.topPipe.inWorld) {
      // Will be used for optimization in Play.js
      this.exists = false;
    }
  }

  /**
   * Because this class 
   * is an extension of Phaser.Group.
   * Its "update" method is called 
   * automatically by the game.
   */
  update() {
    this.checkWorldBounds();
  }
}

export default PipePair;
