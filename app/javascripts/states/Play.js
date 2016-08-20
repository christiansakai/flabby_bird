import Bird from "../prefabs/Bird";
import Ground from "../prefabs/Ground";
import PipePair from "../prefabs/PipePair";
import Scoreboard from "../prefabs/Scoreboard";

class Play extends Phaser.State {
  create() {
    this.createPhysics();
    this.createBackground();
    this.createBird();
    this.createGround();
    this.createControls();
    this.createPipes();
    this.createInstructions();

    // Score for the game duh
    this.score = 0;
    this.scoreText = this.game.add.bitmapText(this.game.width / 2, 10, "flappyfont", this.score.toString(), 24);

    // sound
    this.scoreSound = this.game.add.audio('score');

  }

  createInstructions() {
    this.instructionGroup = this.game.add.group();
    this.instructionGroup.add(this.game.add.sprite(this.game.width / 2, 100,'getReady'));
    this.instructionGroup.add(this.game.add.sprite(this.game.width / 2, 325,'instructions'));
    this.instructionGroup.setAll('anchor.x', 0.5);
    this.instructionGroup.setAll('anchor.y', 0.5);
  }

  createBird() {
    // Create the bird object
    // and save it to this.bird as reference
    this.bird = new Bird({
      game: this.game,
      x: 100,
      y: this.game.height / 2,
      asset: "bird"
    });
    // And add it to the game
    this.game.add.existing(this.bird);
  }

  createGround() {
    // Create the ground object
    // and save it to this.ground as reference
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

  createPhysics() {
    // Add default Physics for the game
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // GLOBAL gravity for the game world
    this.game.physics.arcade.gravity.y = 1200;
  }

  createBackground() {
    // Add a background sprite
    // game.add will automatically add it to World's children
    // this sprite does not fall due to gravity
    // because we do not enable the physics
    // enabled on this sprite
    const background = this.game.add.sprite(0, 0, "background");
  }

  createControls() {
    // Prevents the spacebar event from
    // propagating into the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    // Add keyboard controls
    const spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.addOnce(this.startGame, this);
    // Add event to start the game
    // This key will call this.bird.flap
    // from this.bird
    spacebar.onDown.add(this.bird.flap, this.bird);

    // Add mouse/touch controls
    // add also for starting game
    this.game.input.onDown.addOnce(this.startGame, this);
    this.game.input.onDown.add(this.bird.flap, this.bird);
  }

  startGame() {
    // make the bird fall and make it alive (for rotating)
    this.bird.makeAlive();

    // run pipe evnet loop
    this.runPipeEventLoop();

    // Destroy instructions
    this.instructionGroup.destroy();

  }

  createPipes() {
    // Create a group to handle pipes
    this.pipePairs = this.game.add.group();
  }

  runPipeEventLoop() {
    // Create an event loop
    // and call this.generatePipes every 1.25 secs
    this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this._generatePipes, this);
    // Start the timer
    this.pipeGenerator.timer.start();
  }

  _generatePipes() {
    // Go through pipes group and get the first
    // one that DOES NOT exist in the game world
    // or in other word
    // get the first one that has exist propert set to false
    let pipePair = this.pipePairs.getFirstExists(false);

    if (!pipePair) {
      // if we can't find the first one that DOES NOT
      // exist in the game world. In other word, this pipe.group
      // does not have any existing children
      // create a new PipePair
      // and the parent of that new PipePair is the.pipes group
      pipePair = new PipePair({ 
        game: this.game, 
        parent: this.pipePairs
      });
    }

    // X position is far right edge of the screen
    pipePair.reset(this.game.width + pipePair.width / 2, this.game.rnd.integerInRange(-100, 100));
  }

  update() {
    // On every frame update
    // check collision between this.bird and this.ground
    // and do death with context this
    this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);

    // On every frame update
    // check the collision between every pipePair out there
    // with this bird
    this.pipePairs.forEach((pipePair) => {
      this.checkScore(pipePair);
      this.game.physics.arcade.collide(this.bird, pipePair, this.deathHandler, null, this);
    });
  }

  checkScore(pipePair) {
    // Basically if pipePair exists
    // firstly pipePair was not exists from the constructor
    // if the bird position is greater in x axis (world position)
     if(pipePair.exists && !pipePair.hasScored && pipePair.topPipe.world.x <= this.bird.world.x) {
        pipePair.hasScored = true;
        this.score++;
        this.scoreText.setText(this.score.toString());
        this.scoreSound.play();
    }
  }

  deathHandler() {
    this.bird.alive = false;
        this.pipePairs.callAll('stop');
    this.pipeGenerator.timer.stop();
    this.ground.stopScroll();
    this.scoreboard = new Scoreboard({ game: this.game });
    this.game.add.existing(this.scoreboard);
    this.scoreboard.showScoreBoard(this.score);
    // this.game.state.start("GameOver");
  }

  shutdown() {
    // Automatically called when we move out from this state
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.bird.destroy();
    this.pipePairs.destroy();


        this.scoreboard.destroy();
  }
}

export default Play;
