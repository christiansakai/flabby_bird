import Bird from "../prefabs/Bird";
import Ground from "../prefabs/Ground";
import PipePair from "../prefabs/PipePair";
import Scoreboard from "../prefabs/Scoreboard";

/**
 * Class representing Play state.
 * This is the actual gameplay.
 * @extends Phaser.State
 */
class Play extends Phaser.State {

  /**
   * Create objects for this state.
   * Automatically called by the game.
   */
  create() {
    this.setPhysics();
    this.createBackground();
    this.createGround();
    this.createBird();
    this.createPipePairsContainer();
    this.createInstructions();
    this.setScore();
    this.setSound();
    this.createControls();
  }

  /**
   * Add default Physics engine
   * as ARCADE. Set the Arcade
   * gravity to 1200
   */
  setPhysics() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;
  }

  /**
   * Create background sprite by adding a sprite
   * from the asset "background", anchored at upper
   * left corner of the screen (0, 0).
   * Automatically add to World's children.
   * Save the reference at `this.background`
   */
  createBackground() {
    // `this.game.add` automatically adds the created object
    // to the World's children
    const background = this.game.add.sprite(0, 0, "background");
  }

  /**
   * Create ground sprite by adding a sprite 
   * from the asset "ground" anchored near 
   * bottom of the screen and scroll it to -x axis.
   */
  createGround() {
    this.ground = new Ground({
      game: this.game,
      x: 0,
      y: 400,
      width: 335,
      height: 112,
      asset: "ground"
    });
    this.game.add.existing(this.ground);
  }

  /**
   * Create bird object. At the start
   * of creation, this bird object
   * is unaffected by gravity and 
   * has property alive = false.
   * Save it to `this.bird` as reference.
   */
  createBird() {
    this.bird = new Bird({
      game: this.game,
      x: 100,
      y: this.game.height / 2,
      asset: "bird"
    });
    this.game.add.existing(this.bird);
  }


  /**
   * Create pipe pairs group
   * container to handle the 
   * creation of pipe pairs.
   */
  createPipePairsContainer() {
    this.pipePairs = this.game.add.group();
  }

  /**
   * Create instructions for
   * playing this game.
   */
  createInstructions() {
    this.instructionGroup = this.game.add.group();

    const getReady = this.game.add.sprite(this.game.width / 2, 
                                          100,
                                          'getReady');
    const instructions = this.game.add.sprite(this.game.width / 2, 
                                              325,
                                              'instructions');

    this.instructionGroup.add(getReady);
    this.instructionGroup.add(instructions);

    this.instructionGroup.setAll('anchor.x', 0.5);
    this.instructionGroup.setAll('anchor.y', 0.5);
  }

  /**
   * Create score for the game
   * and the scoreText to display
   * the game score.
   */
  setScore() {
    this.score = 0;
    this.scoreText = this.game
      .add.bitmapText(this.game.width / 2, 
                      10, 
                      "flappyfont", 
                      this.score.toString(), 
                      24);

  }

  /**
   * Set a sound for scoring the game.
   */
  setSound() {
    this.scoreSound = this.game.add.audio('score');
  }

  /**
   * Set up controls. Spacebar
   * and mouse click to start
   * the game by calling
   * `this.startGame` and to fly the bird
   * upwards by calling `this.bird.flap`.
   */
  createControls() {
    // Prevents the spacebar event from
    // propagating into the browser
    this.game.input
      .keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    // Add keyboard controls
    const spacebar = this.game
      .input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Start game by pressing the SPACEBAR
    spacebar.onDown.addOnce(this.startGame, this);

    // Fly the bird upward by pressing the SPACEBAR
    spacebar.onDown.add(this.bird.flap, this.bird);

    // Add mouse/touch controls
    // Start game by mouse click
    this.game.input.onDown.addOnce(this.startGame, this);
    // Fly the bird upward by mouse lick
    this.game.input.onDown.add(this.bird.flap, this.bird);
  }

  /**
   * Start the game by making the bird
   * alive and affected by gravity, run the
   * pipe creation event loop, and destroy
   * instruction object.
   */
  startGame() {
    this.bird.makeAlive();
    this.runPipeCreationEventLoop();
    this.instructionGroup.destroy();
  }

  /**
   * Run a timer loop to create
   * pipes by calling `this.generatePipes`
   * every 1.25 seconds.
   */
  runPipeCreationEventLoop() {
    this.pipeGenerator = this.game
      .time.events.loop(Phaser.Timer.SECOND * 1.25, 
                        this.generatePipes, 
                        this);
    // Start the timer
    this.pipeGenerator.timer.start();
  }

  /**
   * Efficientyl generate pipes.
   * PipePair is created many times using the loop
   * and will use more resources than necessary.
   * While another PipePair is created, in the
   * background there is another PipePair that
   * is not being processed by Phaser game loop
   * (this PipePair has its property exists set
   * to false). Search for this PipePair, 
   * replace it with new PipePair.
   */
  generatePipes() {
    // Go through PipePairs group and get the first
    // PipePair that has exists property set to false 
    // (false means this object is not processed by Phaser
    // game loops and group loops)
    let pipePair = this.pipePairs.getFirstExists(false);

    if (!pipePair) {
      // If we can't find the PipePair that
      // is not being processed by the Phaser game loop,
      // create a new PipePair with `this.pipePairs`
      // as the container.
      pipePair = new PipePair({ 
        game: this.game, 
        parent: this.pipePairs
      });
    }

    // x-axis position is far right edge of the screen
    pipePair.reset(this.game.width + pipePair.width / 2, 
                   this.game.rnd.integerInRange(-100, 100));
  }

  /**
   * Because this class is an
   * extension of Phaser.State,
   * the update function is called by Phaser
   * automatically.
   */
  update() {
    this.checkBirdGroundCollision();
    this.checkBirdPipeInteraction();
  }

  /**
   * Check collision between
   * `this.bird` and `this.ground`
   * and call `this.deathHandler` for
   * every collision.
   */
  checkBirdGroundCollision() {
    this.game.physics.arcade.collide(this.bird, 
                                     this.ground, 
                                     this.deathHandler, 
                                     null, 
                                     this);
  }

  /**
   * Check interactions between
   * `this.bird` and each PipePair
   * objects and call `this.deathHandler`
   * for every collision.
   * Check score for every pipePair passed.
   */
  checkBirdPipeInteraction() {
    this.pipePairs.forEach((pipePair) => {
      this.checkScore(pipePair);
      this.game.physics.arcade.collide(this.bird, 
                                       pipePair, 
                                       this.deathHandler, 
                                       null, 
                                       this);
    });
  }

  /**
   * Check score on a PipePair.
   * If a Pipe Pair is passed, update
   * the score, the scoreText, and play 
   * the scoreSound audio.
   * @param {PipePair} pipePair the PipePair object to be passed by the bird
   */
  checkScore(pipePair) {
    // Only check if PipePair exists property is true.
    // That is, that the PipePair is being processed
    // by Phaser game loop.
    // And check if the bird has passed the Pipe Pair
    // (coordinate wise, x-axis)
    if (pipePair.exists && 
        !pipePair.hasScored && 
        pipePair.topPipe.world.x <= this.bird.world.x) {
      pipePair.hasScored = true;
      this.score++;
      this.scoreText.setText(this.score.toString());
      this.scoreSound.play();
    }
  }

  /**
   * Call this function
   * to run all the logic
   * related to bird's death.
   */
  deathHandler() {
    // Disable gravity on the bird
    // and make the bird property alive to false
    this.bird.makeDead();

    // Make the ground stop scrolling
    this.ground.stopScrolling();

    // Stop the timer loop
    this.pipeGenerator.timer.stop();

    this.createScoreBoard();
  }

  /**
   * Show Scoreboard in this game.
   */
  createScoreBoard() {
    this.scoreboard = new Scoreboard({ game: this.game });
    this.scoreboard.showScoreBoard(this.score);

    this.game.add.existing(this.scoreboard);
  }

  /**
   * This method is called automatically
   * by the game before the Game transitions 
   * to another state (including restarting 
   * to its current state).
   * Destroys all created assets here.
   */
  shutdown() {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.bird.destroy();
    this.pipePairs.destroy();
    this.scoreboard.destroy();
  }

}

export default Play;
