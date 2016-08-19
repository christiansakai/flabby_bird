class Preload extends Phaser.State {
  preload() {
    // Add one-time event handler
    // to onLoadComplete Signal
    this.load.onLoadComplete.addOnce(this.goToMenu, this);

    // Load images
    this.load.image("background", "/background.png");
    this.load.image("ground", "/ground.png");
    this.load.image("title", "/title.png");
    this.load.image("startButton", "/start-button.png");

    this.load.image("instructions", "/instructions.png");
    this.load.image("getReady", "/get-ready.png");

    // Load spritesheet
    // sprites are images that have physics
    // spritesheet is a collection of sprite frames
    // per frame in this file is 34 x 24 pixels
    // total 3 frames
    this.load.spritesheet("bird", "/bird.png", 34, 24, 3);
    this.load.spritesheet('pipe', "/pipes.png", 54, 320, 2);  

    this.load.bitmapFont('flappyfont', '/fonts/flappyfont/flappyfont.png', '/fonts/flappyfont/flappyfont.fnt');

    this.load.audio('score', '/score.wav');
    this.load.audio('flap', '/flap.wav');
    this.load.audio('pipeHit', '/pipe-hit.wav');
    this.load.audio('groundHit', '/ground-hit.wav');
    this.load.image("particle", "particle.png");

    this.load.spritesheet('medals', '/medals.png',44, 46, 2);
    
    this.load.image('scoreboard', '/scoreboard.png');
    this.load.image('gameover', '/gameover.png');
    this.load.audio('score', '/score.wav');
    this.load.audio('ouch', '/ouch.wav');


  }


  goToMenu() {
    this.game.state.start("Play");
  }

}

export default Preload;
