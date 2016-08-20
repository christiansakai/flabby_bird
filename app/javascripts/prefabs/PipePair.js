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

    // Create a new Pipe, located at 0, 0, with
    // asset index 0 (upsidedown pipe)
    // with asset named "pipe" that we preload
    this.topPipe = new Pipe({ 
      game: this.game, 
      x: 0, 
      y: 0, 
      asset: "pipe", 
      frame: 2
    }); 
    // Add the pipe to this group
    this.add(this.topPipe);

    // Create a new Pipe, located at
    // y = pipe.height + (bird.height + 5)
    // which means the space between top and bottom pipe
    // should be about 5x of height of bird.
    // usind the frame asset index 1 (normal pipe)
    this.bottomPipe = new Pipe({
      game: this.game, 
      x: 0, 
      y: 440, 
      asset: "pipe", 
      frame: 1
    });
    // Add pipe to this group
    this.add(this.bottomPipe);

    // Whether this obstacle has been passed or not
    this.hasScored = false;


    // Make the pipes move left in x axis
    // comment this out and the pipe will stay in one place
    // why 200? because it matches with the Ground.js autoscroll
    this.topPipe.body.velocity.x = -200;  
    this.bottomPipe.body.velocity.x = -200;  
    // Can also be replaced with this
    // this.setAll('body.velocity.x', -200);
  }

  reset(x, y) {
    // Sprite has its own reset automatically
    // but not group
    // so we define the reset here

    // Reset topPipe relative to the group
    this.topPipe.reset(0, 0);

    // Reset bottomPipe relative to the group
    this.bottomPipe.reset(0, 440);

    // Reset this whole group location
    this.x = x;
    this.y = y;

    // reset the velocity again
    this.setAll("body.velocity.x", -200);

    // Whether this obstacle has been passed or not
    this.hasScored = false;

    // Set exists true
    this.exists = true;
  }

  checkWorldBounds() {
    // If the topPipe is still inside World
    // if not, set this group exists to false
    // so we can use it in Play.js _generatePipes
    if (!this.topPipe.inWorld) {
      this.exists = false;
    }
  }

  update() {
    // For Phaser.Group, update automatically runs
    this.checkWorldBounds();
  }
}

export default PipePair;
