class Scoreboard extends Phaser.Group {
  constructor({ game }) {
    super(game);

    // this.create from group is to add sprite and add it on top of this group
    const gameover = this.create(this.game.width / 2, 100, 'gameover');
    gameover.anchor.setTo(0.5, 0.5);

    // same 
    this.scoreboard = this.create(this.game.width / 2, 200, 'scoreboard');
    this.scoreboard.anchor.setTo(0.5, 0.5);

    // same
    this.scoreText = this.game.add.bitmapText(this.scoreboard.width, 180, 'flappyfont', '', 18);
    this.add(this.scoreText);

    // same
    this.bestScoreText = this.game.add.bitmapText(this.scoreboard.width, 230, 'flappyfont', '', 18);
    this.add(this.bestScoreText);

    // same 

    // add our start button with a callback
    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5,0.5);

    this.add(this.startButton);

    this.y = this.game.height;
    this.x = 0;
  }

  startClick() {
    this.game.state.start("Menu");
  }

  showScore(score) {
      // Step 1
    this.scoreText.setText(score.toString());

    let bestScore;
    if(!!localStorage) {
      // Step 2
      bestScore = localStorage.getItem('bestScore');

      // Step 3
      if(!bestScore || bestScore < score) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
      }
    } else {
      // Fallback. LocalStorage isn't available
      bestScore = 'N/A';
    }

    // Step 4
    this.bestScoreText.setText(bestScore.toString());

    // Step 5 & 6
    let medal;
    if(score >= 10 && score < 20)
    {
      medal = this.game.add.sprite(-65 , 7, 'medals', 1);
      medal.anchor.setTo(0.5, 0.5);
      this.scoreboard.addChild(medal);
    } else if(score >= 20) {
      medal = this.game.add.sprite(-65 , 7, 'medals', 0);
      medal.anchor.setTo(0.5, 0.5);
      this.scoreboard.addChild(medal);
    }

    // Step 7
    // // Emitter = add expolsions
    // A particle emitter can be used for one-time explosions or for continuous effects like rain and fire. All it really does is launch Particle objects out at set intervals, and fixes their positions and velocities accordingly.
    // A Particle Emitter is a special object type that can spawn groups of other objects, called particles. They can be used to create countless special effects, including: rain, snow, blowing leaves, fireflies, fire, smoke, ground fog, waterfalls, fireworks, etc.


    if (medal) {    

      // create insane 400 amount of particles
      var emitter = this.game.add.emitter(medal.x, medal.y, 400);
    
      this.scoreboard.addChild(emitter);
      emitter.width = medal.width;
      emitter.height = medal.height;

      // after this will have 400 children
      emitter.makeParticles('particle');

      emitter.setRotation(-100, 100);
      emitter.setXSpeed(0,0);
      emitter.setYSpeed(0,0);
      emitter.minParticleScale = 0.25;
      emitter.maxParticleScale = 0.5;

      // since emitter is a phyiscs object it will have gravity applied
      // dont allow gravity here
      emitter.setAll('body.allowGravity', false);

      // emit all at once = false
      // how long before a parile is killed
      // frequency 1000 how often a parficle is emitted
      emitter.start(false, 1000, 1000);

    }

    // tween this whole thing
    // into visible position
    this.game.add.tween(this).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
  }
}

export default Scoreboard;
