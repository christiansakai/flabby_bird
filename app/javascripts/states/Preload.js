/**
 * Class representing Preload state.
 * This is where all static assets being loaded.
 * @extends Phaser.State
 */
class Preload extends Phaser.State {

  /**
   * Initialize Preload state.
   * Automatically called by the Game.
   * Sets an event handler that will
   * go to Menu state once
   * assets loading completed.
   */
  init() {
    this.load.onLoadComplete.addOnce(this.goToMenu, this);
  }
  
  /**
   * Go to Menu state.
   */
  goToMenu() {
    this.game.state.start("Menu");
  }

  /**
   * Load all of the static assets (images, sounds, fonts).
   * Automatically called by the Game.
   */
  preload() {
    this.loadSprites();
    this.loadSpritesheets();
    this.loadAudios();
    this.loadFonts();

  }

  /**
   * Load images to be used as Sprites.
   * Sprites are images that have Physics.
   */
  loadSprites() {
    this.load.image("background", "/background.png");
    this.load.image("ground", "/ground.png");
    this.load.image("title", "/title.png");
    this.load.image("startButton", "/start-button.png");
    this.load.image("instructions", "/instructions.png");
    this.load.image("getReady", "/get-ready.png");
    this.load.image('board', '/board.png');
    this.load.image('gameover', '/gameover.png');
    this.load.image("particle", "particle.png");
  }

  /**
   * Load images to be used as Spritesheets.
   * Spritesheets are a collection of frames 
   * of Sprites.
   */
  loadSpritesheets() {
    // Load a bird sprite that has 3 frames,
    // with each frame has width 34 pixels width
    // and 24 pixesl height
    this.load.spritesheet("bird", "/bird.png", 34, 24, 3);
    this.load.spritesheet('pipe', "/pipes.png", 54, 320, 2);  
    this.load.spritesheet('medals', '/medals.png',44, 46, 2);
  }

  /**
   * Load sound files to be used as Audios.
   */
  loadAudios() {
    this.load.audio('score', '/score.wav');
    this.load.audio('flap', '/flap.wav');
    this.load.audio('pipeHit', '/pipe-hit.wav');
    this.load.audio('groundHit', '/ground-hit.wav');
    this.load.audio('score', '/score.wav');
    this.load.audio('ouch', '/ouch.wav');
  }

  /**
   * Load font files to be used as BitmapFonts.
   */
  loadFonts() {
    this.load.bitmapFont('flappyfont', '/fonts/flappyfont/flappyfont.png', '/fonts/flappyfont/flappyfont.fnt');
  }

}

export default Preload;
