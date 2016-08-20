/**
 * Class representing Scoreboard. 
 * Contains score, best score, and additional
 * fancy animations.
 * @extends Phaser.Group
 */
class Scoreboard extends Phaser.Group {

  /**
   * Create a Scoreboard. This group is created
   * by creating a board, score, best score, and
   * emitter animation.
   * An emitter is an object that
   * emits particle-like Physics
   * objects.
   *
   * @param {config} config group configuration
   * @param {Phaser.Game} config.game the current game object
   */
  constructor({ game }) {
    super(game);

    this.createGameOver();
    this.createBoard();
    this.createScoreText();
    this.createBestScoreText();
    this.createStartButton();

    // Starting position of this group
    this.y = this.game.height;
    this.x = 0;
  }

  /**
   * Create a game over object using "gameover"
   * preloaded asset. Add this object to this group.
   * Sets its anchor at the center.
   * Anchor is a PIXI API.
   */
  createGameOver() {
    const gameover = this.create(this.game.width / 2, 100, "gameover");
    gameover.anchor.setTo(0.5, 0.5);
  }
  
  /**
   * Create a board object using "board"
   * preloaded asset. Add this object to this group.
   * Sets its anchor at the center.
   * Anchor is a PIXI API.
   * Save the board reference into `this.board`.
   */
  createBoard() {
    this.board = this.create(this.game.width / 2, 200, 'board');
    this.board.anchor.setTo(0.5, 0.5);
  }

  /**
   * Create a score text as a Phaser.BitmapText
   * object using "flappyfont" preloaded asset.
   * Add this object to this group.
   * Save this object reference into `this.scoreText`.
   */
  createScoreText() {
    this.scoreText = this.game.add.bitmapText(this.board.width, 
                                              180, 
                                              'flappyfont', 
                                              '', 
                                              18);
    this.add(this.scoreText);
  }

  /** 
   * Create a best score text as a Phaser.BitmapText
   * object using "flappyfont" preloaded asset.
   * Add this object to this group.
   * Save this object reference into `this.bestScoreText`.
   */
  createBestScoreText() {
    this.bestScoreText = this.game.add.bitmapText(this.board.width, 
                                                  230, 
                                                  'flappyfont', 
                                                  '', 
                                                  18);
    this.add(this.bestScoreText);
  }

  /**
   * Create a button that calls
   * the function to go to Menu state using
   * "startButton" preloaded asset.
   * Add this object to this group.
   */
  createStartButton() {
    const startButton = this.game.add.button(this.game.width / 2, 
                                             300, 
                                             'startButton', 
                                             this.goToMenu, 
                                             this);
    startButton.anchor.setTo(0.5,0.5);

    this.add(startButton);
  }

  /**
   * Go to Menu state of the game.
   */
  goToMenu() {
    this.game.state.start("Menu");
  }

  /**
   * Show the entire score board
   * by showing current score, best score
   * medal and emitter particles. Tween
   * this whole Scoreboard.
   *
   * @param {number} score user's score
   */
  showScoreBoard(score) {
    this.showScore(score);
    this.showMedal(score);

    const tween = this.game.add.tween(this);
    tween.to({ y: 0 }, 1000, Phaser.Easing.Bounce.Out, true);
  }

  /**
   * Show score and best score. Using
   * localStorage to store best score.
   * 
   * @param {number} score user's score
   */
  showScore(score) {
    this.scoreText.setText(score.toString());

    let bestScore;

    if (localStorage) {
      bestScore = localStorage.getItem('bestScore');

      if (!bestScore || bestScore < score) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
      }
    } else {
      // Fallback. localStorage isn't available
      bestScore = 'N/A';
    }

    this.bestScoreText.setText(bestScore.toString());
  }

  /**
   * Show medals according to the amount
   * of score. Also emits particle explosions.
   *
   * @param {number} score user's score
   */
  showMedal(score) {
    let medal;

    if (score >= 10 && score < 20) {
      medal = this.game.add.sprite(-65 , 7, 'medals', 1);
      medal.anchor.setTo(0.5, 0.5);
      this.scoreboard.addChild(medal);
    } else if (score >= 20) {
      medal = this.game.add.sprite(-65 , 7, 'medals', 0);
      medal.anchor.setTo(0.5, 0.5);
      this.scoreboard.addChild(medal);
    }

    // A Particle Emitter is a special 
    // object type that can spawn groups 
    // of other objects, called particles. 
    // They can be used to create countless 
    // special effects, including: rain, snow, 
    // blowing leaves, fireflies, fire, smoke, 
    // ground fog, waterfalls, fireworks, etc.

    // Only create emitter if medal exists
    if (medal) {    

      // Create insane 400 amount of particles
      var emitter = this.game.add.emitter(medal.x, medal.y, 400);
    
      emitter.width = medal.width;
      emitter.height = medal.height;

      // After this, this emitter
      // will have 400 children
      emitter.makeParticles('particle');

      emitter.setRotation(-100, 100);
      emitter.setXSpeed(0, 0);
      emitter.setYSpeed(0, 0);
      emitter.minParticleScale = 0.25;
      emitter.maxParticleScale = 0.5;

      // Since emitter is a Phyiscs object
      // it will have gravity applied.
      // We don't want that, so we won't
      // allow gravity here.
      emitter.setAll('body.allowGravity', false);

      // Emit all at once = false
      // 1000 ms before a particle is killed
      // and emits every 1000 ms
      emitter.start(false, 1000, 1000);

      this.scoreboard.addChild(emitter);
    }
  }

}

export default Scoreboard;
